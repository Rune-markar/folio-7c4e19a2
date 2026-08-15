import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [app, html, styles, readme] = await Promise.all([
  readFile(new URL("../app.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../styles.css", import.meta.url), "utf8"),
  readFile(new URL("../README.md", import.meta.url), "utf8")
]);

assert.match(
  app,
  /\$\("#mapCountryName"\)\.textContent\s*=\s*atlasPickerCountryName\(entry\)/,
  "選択後の地図見出しは従来の括弧前の国名だけを表示する"
);
assert.doesNotMatch(
  app,
  /\$\("#mapCountryName"\)\.textContent\s*=\s*atlasCountryCurrencyName\(entry\)/,
  "選択後の地図見出しに通貨名を重複表示しない"
);

for (const action of ["zoom-out", "reset", "zoom-in"]) {
  assert.match(html, new RegExp(`data-map-action="${action}"`), `地図操作 ${action} を用意する`);
}
assert.match(app, /addEventListener\("pointerdown"/, "ポインター操作で地図移動を開始できる");
assert.match(app, /addEventListener\("pointermove"/, "ポインター操作で地図を移動できる");
assert.match(app, /addEventListener\("wheel"/, "ホイールで地図を拡大縮小できる");
assert.match(app, /mapPointers\.size\s*===\s*2/, "2本指のピンチ操作を処理する");
assert.match(styles, /\.world-map\s*\{[^}]*touch-action:\s*none/s, "スマホの地図ジェスチャーをブラウザへ渡さない");
assert.match(readme, /1本指.*ピンチ.*拡大.*縮小/s, "地図操作をREADMEに記録する");

console.log("ATLAS INTERACTIONS OK");
