import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const data = JSON.parse(read("data/collection.json"));
const app = read("app.js");
const mediaSource = read("media/SOURCE.md");
const flagSprite = read("flags/country-flags.svg");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

function expressionAfter(marker, nextMarker) {
  const start = app.indexOf(marker);
  check(start >= 0, `${marker} が見つかりません`);
  if (start < 0) return "[]";
  const valueStart = start + marker.length;
  const end = app.indexOf(nextMarker, valueStart);
  check(end >= 0, `${marker} の終端が見つかりません`);
  return app.slice(valueStart, end).trim().replace(/;$/, "");
}

const atlas = vm.runInNewContext(`(${expressionAfter("const historicalAtlas = ", "const atlasCollectionScopes")})`);
const scopes = vm.runInNewContext(`(${expressionAfter("const atlasCollectionScopes = ", "const atlasRegionOverrides")})`);
const imageRightsReviewIds = vm.runInNewContext(`(${expressionAfter("const imageRightsReviewIds = ", "const historicalAtlas")})`);
const timelineEras = vm.runInNewContext(`(${expressionAfter("const atlasTimelineEras = ", "const historicalMapCache")})`);
const flagSymbols = vm.runInNewContext(`(${expressionAfter("const atlasFlagSymbolByCountry = ", "function atlasFlagMarkup")})`);
const itemIds = new Set(data.items.map((item) => item.id));

check(itemIds.size === data.items.length, "収蔵品IDが重複しています");
check(data.collectionIndex.length === data.sourceSnapshot.countryCount, "collectionIndex件数とsourceSnapshot.countryCountが一致しません");

const canonicalRegions = new Map(data.collectionIndex.map((entry) => [entry.country, entry.region]));
for (const item of data.items) {
  if (Object.hasOwn(item, "catalogNumber")) check(String(item.catalogNumber || "").trim(), `${item.id}: catalogNumberが空です`);
  check(item.catalogNumber !== "202211130", `${item.id}: 廃止した旧管理値202211130が残っています`);
  if (canonicalRegions.has(item.country)) check(item.region === canonicalRegions.get(item.country), `${item.id}: collectionIndexの地域と不一致です`);
  const story = String(item.story || "");
  const markers = ["肖像・人物：", "発行背景：", "当時の社会情勢：", "特殊な点：", "採用モチーフは"];
  let previous = -1;
  for (const marker of markers) {
    const index = story.indexOf(marker);
    check(index > previous, `${item.id}: storyの必須区分または順序が不正です (${marker})`);
    previous = index;
  }
  for (const side of ["front", "back"]) {
    const relative = item.images?.[side];
    if (relative) check(fs.existsSync(path.join(root, relative)), `${item.id}: ${side}画像が存在しません`);
  }
  if (item.images?.front && item.images?.back) check(item.images.front !== item.images.back, `${item.id}: 表裏画像が同じです`);
  if (item.images?.front || item.images?.back) check(mediaSource.includes(item.id), `${item.id}: media/SOURCE.mdに出典行がありません`);
}

for (const line of mediaSource.split(/\r?\n/)) {
  if (!/(確認できなかった|再確認|来歴未確定)/.test(line)) continue;
  for (const item of data.items) {
    if (line.includes(item.id)) check(imageRightsReviewIds.has(item.id), `${item.id}: 権利未確認画像が再確認集合にありません`);
  }
}
for (const id of imageRightsReviewIds) check(itemIds.has(id), `${id}: 権利再確認集合に存在しないIDがあります`);

const scopeKey = (entry) => entry.currencyKey || `${entry.country}\u0000${entry.era}\u0000${entry.currency}`;
const scopedIds = new Set();
for (const entry of atlas) {
  check(timelineEras.has(entry.era), `${entry.country} ${entry.era}: 年代軸の許可リストにありません`);
  const key = scopeKey(entry);
  check(scopes.has(key), `${entry.country} ${entry.era}: atlasCollectionScopesがありません`);
  for (const id of scopes.get(key) || []) {
    check(itemIds.has(id), `${key}: 存在しない収蔵品ID ${id} を参照しています`);
    check(!scopedIds.has(id), `${id}: 複数の地図期へ重複登録されています`);
    scopedIds.add(id);
  }
  const mapFile = path.join(root, `maps/world_${entry.mapYear}.geojson`);
  check(fs.existsSync(mapFile), `${entry.country} ${entry.era}: 地図ファイルがありません`);
  if (fs.existsSync(mapFile)) {
    const names = new Set(JSON.parse(fs.readFileSync(mapFile, "utf8")).features.map((feature) => feature.properties?.NAME));
    for (const name of entry.featureNames || []) check(names.has(name), `${entry.country} ${entry.era}: CShapes NAME ${name} がありません`);
  }
  if (String(entry.era) !== String(entry.mapYear)) check(Boolean(entry.mapLegend), `${entry.country} ${entry.era}: mapYearとの差の凡例がありません`);
}
for (const item of data.items) check(scopedIds.has(item.id), `${item.id}: どの歴史地図期にも収蔵スコープ登録されていません`);

for (const entry of atlas) {
  check(entry.flag || flagSymbols.has(entry.country), `${entry.country} ${entry.era}: 国旗表示が不足しています`);
  if (entry.flag) check(fs.existsSync(path.join(root, entry.flag.replace(/^\//, ""))), `${entry.country} ${entry.era}: 国旗ファイルがありません`);
  if (!entry.flag && flagSymbols.has(entry.country)) check(flagSprite.includes(`id="flag-${flagSymbols.get(entry.country)}"`), `${entry.country} ${entry.era}: 長方形国旗シンボルがありません`);
}

const families = new Map();
for (const entry of atlas.filter((entry) => entry.currencyFamily)) {
  const family = families.get(entry.currencyFamily) || [];
  family.push(entry);
  families.set(entry.currencyFamily, family);
}
for (const [family, entries] of families) {
  const keys = new Set(entries.map((entry) => entry.currencyKey));
  check(keys.size === entries.length && !keys.has(undefined), `${family}: currencyKeyが欠落または重複しています`);
  const orders = entries.map((entry) => entry.currencyOrder).sort((a, b) => a - b);
  check(orders.every((order, index) => order === index + 1), `${family}: currencyOrderが1始まりの連番ではありません`);
}

if (failures.length) {
  console.error(`AUDIT FAILED (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`AUDIT OK: ${data.items.length} items, ${atlas.length} atlas entries, ${imageRightsReviewIds.size} image sets under rights review`);
