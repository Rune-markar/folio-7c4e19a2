const appState = {
  database: null,
  view: "dashboard",
  layout: "cards",
  search: "",
  atlasEra: "2018",
  atlasCountry: "",
  atlasCurrency: "",
  filters: { region: "", country: "", currency: "", period: "", stateStatus: "", rarity: "", type: "", location: "", duplicates: false }
};

const viewMeta = {
  dashboard: ["HISTORICAL ATLAS", "紙幣の歴史地図"],
  collection: ["CATALOG", "収蔵台帳"],
  trades: ["TRADE LEDGER", "仕入れと売却"],
  storage: ["PHYSICAL STORAGE", "現物の保管"],
  settings: ["ARCHIVE CONTROL", "保存とNAS"]
};

const palette = ["#d9c798", "#b9c7b1", "#d6aaa2", "#bfc4cf", "#ccb88f", "#a9c3bd", "#d3bdca"];
const historicalAtlas = [
  { era: "2018", label: "2018", period: "現代", mapYear: 2018, featureNames: ["Venezuela"], country: "ベネズエラ", officialName: "ベネズエラ・ボリバル共和国", currency: "ボリバル・ソベラノ（2018年8月導入）", flag: "/flags/venezuela-2006.svg", flagAlt: "2006年以降のベネズエラ国旗", flagPeriod: "2006–現在", short: "ベネズエラ", detail: "通貨改革が行われ、ボリバル・ソベラノが登場した時代。" },
  { era: "1994", label: "1994", period: "南米の安定化", mapYear: 1994, featureNames: ["Chile"], country: "チリ", officialName: "チリ共和国", currency: "チリ・ペソ", flag: "/flags/chile.svg", flagAlt: "1994年当時のチリ国旗", flagPeriod: "1817–現在", short: "チリ", detail: "民主化後のチリで、ペソが日常の取引を支えていた時代。" },
  { era: "1993", label: "1993", period: "再編の時代", mapYear: 1993, featureNames: ["Yugoslavia"], country: "ユーゴスラビア連邦共和国", currency: "ユーゴスラビア・ディナール", flag: "/flags/yugoslavia-1992.svg", flagAlt: "1992年から2003年のユーゴスラビア連邦共和国旗", flagPeriod: "1992–2003", short: "ユーゴスラビア", detail: "国家の再編と急激なインフレーションが紙幣に刻まれた時代。" },
  { era: "1987", label: "1987", period: "インティ時代", mapYear: 1987, featureNames: ["Peru"], country: "ペルー", officialName: "ペルー共和国", currency: "ペルー・インティ", flag: "/flags/peru.svg", flagAlt: "1987年当時のペルー国旗", flagPeriod: "1950–現在", short: "ペルー", detail: "インフレーションが進行するなか、インティ紙幣が流通していた時代。" },
  { era: "1986", label: "1986", period: "冷戦後期", mapYear: 1986, featureNames: ["Austria"], country: "オーストリア共和国", currency: "オーストリア・シリング", flag: "/flags/austria.svg", flagAlt: "オーストリア国旗", flagPeriod: "1945–現在", short: "オーストリア", detail: "シリングが流通していた、欧州統合前のオーストリア。" },
  { era: "1986", label: "1986", period: "冷戦後期", mapYear: 1986, featureNames: ["Finland"], country: "フィンランド共和国", currency: "フィンランド・マルッカ", flag: "/flags/finland.svg", flagAlt: "フィンランド国旗", flagPeriod: "1918–現在", short: "フィンランド", detail: "マルッカ紙幣が北欧の日常を支えていた時代。" },
  { era: "1985", label: "1985", period: "通貨改革", mapYear: 1985, featureNames: ["Argentina"], country: "アルゼンチン", officialName: "アルゼンチン共和国", currency: "アウストラル（収蔵資料にペソも含む）", flag: "/flags/argentina.svg", flagAlt: "1985年当時のアルゼンチン国旗", flagPeriod: "1944–現在", short: "アルゼンチン", detail: "慢性的なインフレーションへの対策として、アウストラルが導入された年。" },
  { era: "1983", label: "1983", period: "共和国の転換期", mapYear: 1983, featureNames: ["Turkey (Ottoman Empire)"], country: "トルコ共和国", currency: "トルコ・リラ", flag: "/flags/turkey.svg", flagAlt: "1983年当時のトルコ国旗", flagPeriod: "1936–現在", short: "トルコ", detail: "高インフレへ向かう時期のトルコで、リラ紙幣が流通していた時代。" },
  { era: "1966", label: "1966", period: "第五共和政", mapYear: 1966, featureNames: ["France"], country: "フランス共和国", officialName: "フランス共和国（第五共和政）", nativeName: "République française", currency: "フランス・フラン（収蔵資料に新フラン表記を含む）", pickerCurrency: "フラン／新フラン", flag: "/flags/france-1946.svg", flagAlt: "1966年当時のフランス国旗", flagPeriod: "1794–現在", short: "フランス", detail: "1958年憲法による第五共和政下で通貨制度の安定が進み、旧額面との区別から「新フラン」の呼称もなお見られた時代。" },
  { era: "1965", label: "1965", period: "第五共和政", mapYear: 1965, featureNames: ["France"], country: "フランス共和国", officialName: "フランス共和国（第五共和政）", nativeName: "République française", currency: "新フラン", flag: "/flags/france-1946.svg", flagAlt: "1965年当時のフランス国旗", flagPeriod: "1794–現在", short: "フランス", detail: "1958年憲法による第五共和政下、1960年の通貨改革で100旧フランを1新フランとした後の通貨。" },
  { era: "1947", label: "1947", period: "戦後のザール", mapYear: 1947, mapLegend: "1947年境界資料・ザール位置資料", featureNames: ["Saar Protectorate"], country: "ザール保護領", currency: "ザールマルク", flag: "/flags/saar-1947.svg", flagAlt: "1947年から1956年のザール保護領旗", flagPeriod: "1947–1956", short: "ザール", detail: "フランス管理下でドイツ通貨圏から切り離され、1947年6月に短命なザールマルクが導入された過渡期。位置表示には現在のザールラント境界を参照しています。" },
  { era: "1946", label: "1946", period: "戦後復興", mapYear: 1946, featureNames: ["Hungary"], country: "ハンガリー", officialName: "ハンガリー共和国", currency: "ペンゲー → フォリント（1946年8月1日）", flag: "/flags/hungary-1946.svg", flagAlt: "1946年から1949年のハンガリー共和国旗", flagPeriod: "1946–1949", short: "ハンガリー", detail: "史上屈指のハイパーインフレーションを経て、フォリントへ転換した年。" },
  { era: "1946", label: "1946", period: "第四共和政成立", mapYear: 1946, featureNames: ["France"], country: "フランス共和国", officialName: "フランス共和国（臨時政府 → 第四共和政）", nativeName: "République française", currency: "フランス・フラン", flag: "/flags/france-1946.svg", flagAlt: "1946年当時のフランス国旗", flagPeriod: "1946年仕様", short: "フランス", detail: "1946年はフランス共和国臨時政府から、10月27日の憲法施行による第四共和政へ移行した年。復興期の社会をフラン紙幣が支えました。" },
  { era: "1943", label: "1943", period: "占領下のフランス", mapYear: 1943, mapOverline: "1943 · OCCUPIED FRANCE", mapLegend: "1943年7月1日・フランス外郭（支配域ではありません）", mapBoundaryLabel: "フランス本土の外郭", mapControl: "全土占領下：大部分はドイツ軍、南東部・コルシカはイタリア軍", mapLabel: "ヴィシー政府所在地", markerCoordinates: [3.4242, 46.126], territoryMode: "outline-only", featureNames: ["France"], country: "フランス共和国", officialName: "フランス国（ヴィシー政権）", nativeName: "État français", currency: "フランス・フラン", flag: "/flags/france-1946.svg", flagAlt: "1943年当時に用いられたフランス三色旗", flagPeriod: "1794–現在", short: "フランス", detail: "1943年7月1日にはフランス本土全域が枢軸軍の占領下にあり、ヴィシー政府に独立した実効支配域はありませんでした。地図の金色線はフランスの外郭であり、ヴィシー政権の領土を示すものではありません。" },
  { era: "1940", label: "1924–1948", period: "ライヒスマルク", eraPeriod: "戦時ドイツ", mapYear: 1940, mapLegend: "1940年境界資料（通貨期 1924–1948）", featureNames: ["Germany (Prussia)"], country: "ナチス・ドイツ", officialName: "ドイツ国（ナチス政権）", nativeName: "Deutsches Reich", currency: "ライヒスマルク（Reichsmark）", currencyFamily: "germany", currencyKey: "germany-reichsmark", currencyOrder: 4, regimeLabel: "ヴァイマル共和国 → ナチス・ドイツ", flag: "/flags/germany-1935.svg", flagAlt: "1935年から1945年のドイツ国旗", flagPeriod: "1935–1945", short: "ナチス・ドイツ", detail: "1924年に導入されたライヒスマルクは、ヴァイマル共和国からナチス・ドイツを経て1948年まで使われました。政治体制では分割せず、ひとつの通貨期として表示しています。" },
  { era: "1923", label: "1923–1924", period: "レンテンマルク", mapYear: 1923, featureNames: ["Germany (Prussia)"], country: "ヴァイマル共和国", officialName: "ドイツ国（ヴァイマル共和国）", nativeName: "Weimarer Republik", currency: "レンテンマルク（Rentenmark）", currencyFamily: "germany", currencyKey: "germany-rentenmark", currencyOrder: 3, regimeLabel: "ヴァイマル共和国", flag: "/flags/weimar-1919.svg", flagAlt: "1919年から1933年のヴァイマル共和国旗", flagPeriod: "1919–1933", short: "ヴァイマル共和国", detail: "1923年11月、通貨安定のためレンテンマルクが導入されました。ライヒスマルク導入後も補助的に長く残りますが、ここでは新しい通貨単位が始まった転換点としてまとめています。" },
  { era: "1923", label: "1914–1923", period: "パピエルマルク", mapYear: 1923, featureNames: ["Germany (Prussia)"], country: "ヴァイマル共和国", officialName: "ドイツ国（ヴァイマル共和国）", nativeName: "Weimarer Republik", currency: "パピエルマルク（Papiermark）", pickerCurrency: "パピエルマルク／レンテンマルク", currencyFamily: "germany", currencyKey: "germany-papiermark", currencyOrder: 2, regimeLabel: "ドイツ帝国 → ヴァイマル共和国", flag: "/flags/weimar-1919.svg", flagAlt: "1919年から1933年のヴァイマル共和国旗", flagPeriod: "1919–1933", short: "ヴァイマル共和国", detail: "金兌換停止後のマルクは、後にパピエルマルクと呼ばれました。帝政末期からヴァイマル共和国のハイパーインフレーションまでを、同じ通貨単位の時期としてまとめています。" },
  { era: "1923", label: "1923", period: "紙幣の激動期", mapYear: 1914, mapLegend: "1914年境界資料（帝国存続時）", featureNames: ["Austria-Hungary"], country: "オーストリア＝ハンガリー帝国", currency: "旧オーストリア＝ハンガリー・クローネ（後継国で移行中）", flag: "/flags/austria-hungary-1869.svg", flagAlt: "1869年から1918年のオーストリア＝ハンガリー民船旗", flagPeriod: "1869–1918 民船旗", short: "オーストリア＝ハンガリー帝国", detail: "帝国崩壊後も旧クローネ紙幣が残った時代。地図は比較のため、帝国存続時の1914年版図を表示しています。" },
  { era: "1920", label: "1920", period: "共和国初期", mapYear: 1920, featureNames: ["Brazil"], country: "ブラジル", officialName: "ブラジル合衆国", currency: "ミルレイス", flag: "/flags/brazil-1889.svg", flagAlt: "1889年から1960年のブラジル国旗", flagPeriod: "1889–1960", short: "ブラジル", detail: "ブラジル第一共和政期に、ミルレイス紙幣が流通していた時代。" },
  { era: "1914", label: "1871–1914", period: "金マルク", mapYear: 1914, featureNames: ["Germany (Prussia)"], country: "ドイツ帝国", nativeName: "Deutsches Reich", currency: "金マルク（Goldmark）", currencyFamily: "germany", currencyKey: "germany-goldmark", currencyOrder: 1, regimeLabel: "ドイツ帝国", flag: "/flags/german-empire-1867.svg", flagAlt: "1867年から1918年のドイツ帝国旗", flagPeriod: "1867–1918", short: "ドイツ帝国", detail: "1871年の統一後に整えられた金本位制のマルク。第一次世界大戦で金兌換が停止されるまでを、ひとつの通貨期として表示しています。" },
  { era: "1948", label: "1948–2001", period: "ドイツ・マルク", eraPeriod: "戦後の通貨改革", mapYear: 1946, mapLegend: "1946年境界資料（1948年通貨改革）", featureNames: ["German Federal Republic"], country: "ドイツ連邦共和国", nativeName: "Bundesrepublik Deutschland", currency: "ドイツ・マルク（Deutsche Mark）", currencyFamily: "germany", currencyKey: "germany-deutsche-mark", currencyOrder: 5, regimeLabel: "西ドイツ → 統一ドイツ", flag: "/flags/weimar-1919.svg", flagAlt: "ドイツ連邦共和国旗", flagPeriod: "1949–現在", short: "西ドイツ", detail: "1948年の西側占領地域の通貨改革で導入され、1949年以後は西ドイツ、1990年以後は統一ドイツの通貨となりました。" },
  { era: "1948", label: "1948–1990", period: "東ドイツ・マルク", eraPeriod: "戦後の通貨改革", mapYear: 1946, mapLegend: "1946年境界資料（東側占領地域）", featureNames: ["German Democratic Republic"], country: "ドイツ民主共和国", nativeName: "Deutsche Demokratische Republik", currency: "東ドイツ・マルク（Mark der DDR）", currencyFamily: "germany", currencyKey: "germany-ddr-mark", currencyOrder: 6, regimeLabel: "東ドイツ", flag: "/flags/east-germany.svg", flagAlt: "ドイツ民主共和国旗", flagPeriod: "1959–1990", short: "東ドイツ", detail: "東側占領地域の通貨改革に始まり、ドイツ民主共和国で1990年の通貨統合まで使われたマルクです。" },
  { era: "2002", label: "2002–", period: "ユーロ", mapYear: 2018, mapLegend: "2018年境界資料（2002年現金流通開始）", featureNames: ["German Federal Republic"], country: "ドイツ連邦共和国（ユーロ）", nativeName: "Bundesrepublik Deutschland", currency: "ユーロ（Euro）", currencyFamily: "germany", currencyKey: "germany-euro", currencyOrder: 7, regimeLabel: "統一ドイツ", flag: "/flags/weimar-1919.svg", flagAlt: "ドイツ連邦共和国旗", flagPeriod: "1949–現在", short: "ドイツ", detail: "1999年に会計通貨として導入され、2002年からユーロ紙幣・硬貨の流通が始まりました。" },
  { era: "1914", label: "1914", period: "大戦の始まり", mapYear: 1914, featureNames: ["Denmark"], country: "デンマーク", officialName: "デンマーク王国", currency: "デンマーク・クローネ", flag: "/flags/denmark.svg", flagAlt: "1914年当時のデンマーク国旗", flagPeriod: "1914年仕様", short: "デンマーク", detail: "北欧の王国でクローネ紙幣が使われていた時代。" }
];
const atlasTimelineEras = new Set(["1914", "1920", "1923", "1940", "1943", "1946", "1947", "1965", "1966", "1983", "1985", "1986", "1987", "1993", "1994", "2018"]);
const historicalMapCache = new Map();
let historicalMapRequest = 0;
const staticArchive = true;
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function yen(value) {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: Number(value) % 1 ? 2 : 0 }).format(Number(value) || 0);
}

function hashColor(value) {
  let hash = 0;
  for (const character of String(value)) hash = ((hash << 5) - hash + character.charCodeAt(0)) | 0;
  return palette[Math.abs(hash) % palette.length];
}

function formatDate(value) {
  if (!value) return "日付未設定";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

async function api(path, options = {}) {
  if (staticArchive && path !== "/api/database") throw new Error("公開版は閲覧専用です。");
  const response = await fetch(staticArchive ? "data/collection.json" : path, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "通信に失敗しました。");
  return payload;
}

function showToast(message, error = false) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.toggle("is-error", error);
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

async function refresh() {
  appState.database = await api("/api/database");
  renderAll();
}

function collectionStats() {
  const items = appState.database.items;
  const totalPieces = items.reduce((sum, item) => sum + item.collectionQty + item.duplicateQty, 0);
  const duplicates = items.reduce((sum, item) => sum + item.duplicateQty, 0);
  const cataloguedCountries = new Set(items.map((item) => item.country)).size;
  const countries = appState.database.collectionIndex?.length || cataloguedCountries;
  const acquisition = appState.database.lots.filter((lot) => lot.kind === "banknotes").reduce((sum, lot) => sum + Number(lot.cost || 0), 0);
  const estimate = items.reduce((sum, item) => sum + item.estimatedValue * (item.collectionQty + item.duplicateQty), 0);
  return { types: items.length, totalPieces, duplicates, countries, cataloguedCountries, acquisition, estimate };
}

function switchView(view) {
  appState.view = view;
  $$(".view").forEach((element) => element.classList.toggle("is-active", element.dataset.view === view));
  $$(".nav-item").forEach((element) => {
    const active = element.dataset.viewTarget === view;
    element.classList.toggle("is-active", active);
    if (active) element.setAttribute("aria-current", "page"); else element.removeAttribute("aria-current");
  });
  $("#viewEyebrow").textContent = viewMeta[view][0];
  $("#viewTitle").textContent = viewMeta[view][1];
  if (view === "collection") renderCollection();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function selectedAtlasEntry() {
  if (appState.atlasCurrency) {
    const currencyEntry = historicalAtlas.find((entry) => entry.currencyKey === appState.atlasCurrency);
    if (currencyEntry) return currencyEntry;
  }
  return historicalAtlas.find((entry) => entry.era === appState.atlasEra && entry.country === appState.atlasCountry);
}

function atlasCountryName(entry) {
  return entry?.officialName || entry?.country || "";
}

function renderCurrencyChronology(entry) {
  const chronology = $("#currencyChronology");
  const list = $("#currencyChronologyList");
  if (!entry?.currencyFamily) {
    chronology.hidden = true;
    list.replaceChildren();
    return;
  }
  const entries = historicalAtlas
    .filter((item) => item.currencyFamily === entry.currencyFamily)
    .sort((a, b) => a.currencyOrder - b.currencyOrder);
  chronology.hidden = false;
  list.innerHTML = entries.map((item) => {
    const active = item.currencyKey === entry.currencyKey;
    return `<button type="button" role="option" aria-selected="${active}" class="currency-era${active ? " is-active" : ""}" data-atlas-currency="${escapeHtml(item.currencyKey)}">
      <i aria-hidden="true"></i><span class="currency-era-years">${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.period)}</strong><small>${escapeHtml(item.regimeLabel)}</small>
    </button>`;
  }).join("");
  requestAnimationFrame(() => {
    const active = $(".currency-era.is-active", list);
    if (active) active.scrollIntoView({ block: "nearest" });
  });
}

function renderDashboard() {
  const stats = collectionStats();
  $("#heroSpecimenCount").textContent = String(stats.types).padStart(2, "0");
  const eras = Array.from(new Map(historicalAtlas
    .filter((entry) => atlasTimelineEras.has(entry.era))
    .map((entry) => [entry.era, entry])).values()).sort((a, b) => Number(a.era) - Number(b.era));
  const selectedEraIndex = eras.findIndex((entry) => entry.era === appState.atlasEra);
  const eraList = $("#eraList");
  eraList.innerHTML = `<div class="era-timeline" style="--era-count:${eras.length}"><div class="era-track" aria-hidden="true"><span style="width:${eras.length > 1 ? selectedEraIndex / (eras.length - 1) * 100 : 0}%"></span></div>${eras.map((entry, index) => `<button type="button" role="option" aria-selected="${entry.era === appState.atlasEra}" class="era-button${entry.era === appState.atlasEra ? " is-active" : ""}" data-atlas-era="${entry.era}" style="--era-index:${index}"><i aria-hidden="true"></i><strong>${entry.era}</strong><span>${entry.eraPeriod || entry.period}</span></button>`).join("")}</div>`;
  requestAnimationFrame(() => {
    const activeEra = $(".era-button.is-active", eraList);
    if (!activeEra) return;
    eraList.scrollTo({ left: activeEra.offsetLeft - (eraList.clientWidth - activeEra.offsetWidth) / 2, behavior: "smooth" });
  });
  const countries = Array.from(new Map(historicalAtlas
    .filter((entry) => entry.era === appState.atlasEra)
    .map((entry) => [entry.country, entry])).values());
  $("#countrySymbols").innerHTML = countries.map((entry) => {
    const count = appState.database.items.filter((item) => item.country === entry.country).length;
    const wideName = atlasCountryName(entry).length > 12;
    return `<button type="button" role="option" aria-selected="${entry.country === appState.atlasCountry}" class="country-symbol${wideName ? " has-wide-name" : ""}${entry.country === appState.atlasCountry ? " is-active" : ""}" data-atlas-country="${escapeHtml(entry.country)}"><span class="country-flag"><img src="${entry.flag.replace(/^\//, "")}" alt="${escapeHtml(entry.flagAlt)}"></span><span><strong>${escapeHtml(atlasCountryName(entry))}</strong><small>${escapeHtml(entry.pickerCurrency || entry.currency)}</small><small>${escapeHtml(entry.flagPeriod)} · ${count}件収蔵</small></span></button>`;
  }).join("");
  renderAtlasMap();
}

function equalEarthPoint(coordinate) {
  const lambda = coordinate[0] * Math.PI / 180;
  const phi = Math.max(-89.99, Math.min(89.99, coordinate[1])) * Math.PI / 180;
  const a1 = 1.340264, a2 = -0.081106, a3 = 0.000893, a4 = 0.003796, m = Math.sqrt(3) / 2;
  const l = Math.asin(m * Math.sin(phi));
  const l2 = l * l;
  const l6 = l2 * l2 * l2;
  const x = lambda * Math.cos(l) / (m * (a1 + 3 * a2 * l2 + l6 * (7 * a3 + 9 * a4 * l2)));
  const y = l * (a1 + a2 * l2 + l6 * (a3 + a4 * l2));
  return [500 + x * 164, 240 - y * 164];
}

function polygonPath(rings) {
  return rings.map((ring) => ring.map((coordinate, index) => {
    const [x, y] = equalEarthPoint(coordinate);
    return `${index ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join("") + "Z").join("");
}

function geometryPath(geometry) {
  if (!geometry) return "";
  if (geometry.type === "Polygon") return polygonPath(geometry.coordinates);
  if (geometry.type === "MultiPolygon") return geometry.coordinates.map(polygonPath).join("");
  if (geometry.type === "GeometryCollection") return geometry.geometries.map(geometryPath).join("");
  return "";
}

function projectedBounds(features) {
  const bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  const visit = (value) => {
    if (!Array.isArray(value)) return;
    if (typeof value[0] === "number" && typeof value[1] === "number") {
      const [x, y] = equalEarthPoint(value);
      bounds.minX = Math.min(bounds.minX, x); bounds.maxX = Math.max(bounds.maxX, x);
      bounds.minY = Math.min(bounds.minY, y); bounds.maxY = Math.max(bounds.maxY, y);
      return;
    }
    value.forEach(visit);
  };
  features.forEach((feature) => visit(feature.geometry?.coordinates));
  return bounds;
}

function projectedPolygonView(features) {
  let largest = null;
  const polygons = [];
  const collect = (geometry) => {
    if (!geometry) return;
    if (geometry.type === "Polygon") polygons.push(geometry.coordinates);
    if (geometry.type === "MultiPolygon") polygons.push(...geometry.coordinates);
    if (geometry.type === "GeometryCollection") geometry.geometries.forEach(collect);
  };
  features.forEach((feature) => collect(feature.geometry));
  for (const polygon of polygons) {
    const points = polygon[0]?.map(equalEarthPoint) || [];
    if (points.length < 3) continue;
    let twiceArea = 0;
    let centroidX = 0;
    let centroidY = 0;
    const bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    for (let index = 0; index < points.length; index += 1) {
      const current = points[index];
      const next = points[(index + 1) % points.length];
      const cross = current[0] * next[1] - next[0] * current[1];
      twiceArea += cross;
      centroidX += (current[0] + next[0]) * cross;
      centroidY += (current[1] + next[1]) * cross;
      bounds.minX = Math.min(bounds.minX, current[0]); bounds.maxX = Math.max(bounds.maxX, current[0]);
      bounds.minY = Math.min(bounds.minY, current[1]); bounds.maxY = Math.max(bounds.maxY, current[1]);
    }
    const area = Math.abs(twiceArea) / 2;
    if (!largest || area > largest.area) {
      const divisor = 3 * twiceArea;
      largest = {
        area,
        bounds,
        x: Math.abs(divisor) > 0.000001 ? centroidX / divisor : (bounds.minX + bounds.maxX) / 2,
        y: Math.abs(divisor) > 0.000001 ? centroidY / divisor : (bounds.minY + bounds.maxY) / 2
      };
    }
  }
  if (largest) return largest;
  const bounds = projectedBounds(features);
  return { area: 0, bounds, x: (bounds.minX + bounds.maxX) / 2, y: (bounds.minY + bounds.maxY) / 2 };
}

async function loadHistoricalMap(year) {
  if (!historicalMapCache.has(year)) {
    historicalMapCache.set(year, fetch(`maps/world_${year}.geojson`).then((response) => {
      if (!response.ok) throw new Error(`地図データ ${year} を読み込めません。`);
      return response.json();
    }));
  }
  return historicalMapCache.get(year);
}

async function renderAtlasMap() {
  const entry = selectedAtlasEntry();
  const eraEntry = historicalAtlas.find((item) => item.era === appState.atlasEra);
  const mapYear = entry?.mapYear ?? eraEntry.mapYear;
  const requestId = ++historicalMapRequest;
  $("#historicalLabel").classList.remove("is-visible");
  $("#mapLabel").textContent = "";
  if (!entry) {
    $("#mapOverline").textContent = "BORDERLESS WORLD";
    $("#mapCountryName").textContent = "国を選択してください";
    $("#mapCountryNative").hidden = true;
    $("#mapCountryNative").textContent = "";
    $("#mapCountryDetail").textContent = "地図にはまだ国境がありません。上の年代と国を選ぶと、当時の姿が現れます。";
    $("#viewCountryCollection").hidden = true;
    $("#mapFacts").hidden = true;
    $("#mapControlFact").hidden = true;
    $("#mapBoundaryLabel").textContent = "選択国の国境";
    $("#mapLegend").classList.remove("is-outline-only");
    $("#mapEraLegend").textContent = "海岸線のみ表示";
    renderCurrencyChronology(null);
  } else {
    $("#mapOverline").textContent = entry.mapOverline || `${entry.label} · HISTORICAL BORDER`;
    $("#mapCountryName").textContent = atlasCountryName(entry);
    $("#mapCountryNative").textContent = entry.nativeName || "";
    $("#mapCountryNative").hidden = !entry.nativeName;
    $("#mapCountryDetail").textContent = entry.detail;
    $("#mapCurrency").textContent = entry.currency;
    $("#mapControl").textContent = entry.mapControl || "";
    $("#mapControlFact").hidden = !entry.mapControl;
    $("#mapFacts").hidden = false;
    $("#viewCountryCollection").hidden = false;
    $("#mapEraLegend").textContent = entry.mapLegend || `${entry.mapYear}年境界資料`;
    $("#mapBoundaryLabel").textContent = entry.mapBoundaryLabel || "選択国の国境";
    $("#mapLegend").classList.toggle("is-outline-only", entry.territoryMode === "outline-only");
    renderCurrencyChronology(entry);
  }
  $("#mapDataStatus").textContent = `${mapYear}年資料を読込中`;
  try {
    const [data, coastlineData] = await Promise.all([loadHistoricalMap(mapYear), loadHistoricalMap(2018)]);
    if (requestId !== historicalMapRequest) return;
    const selected = entry ? data.features.filter((feature) => entry.featureNames.includes(feature.properties?.NAME)) : [];
    const group = $("#historicalMapData");
    group.replaceChildren(...coastlineData.features.map((feature) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", geometryPath(feature.geometry));
      path.setAttribute("fill-rule", "evenodd");
      path.setAttribute("class", "map-territory");
      return path;
    }));
    $("#historicalBorderData").replaceChildren(...selected.map((feature) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const precision = Number(feature.properties?.BORDERPRECISION || 3);
      path.setAttribute("d", geometryPath(feature.geometry));
      path.setAttribute("fill-rule", "evenodd");
      path.setAttribute("class", `map-selected-border precision-${precision}${entry?.territoryMode ? ` ${entry.territoryMode}` : ""}`);
      return path;
    }));
    let cameraTransform = "translate(0px, 0px) scale(1)";
    if (entry && selected.length) {
      const focus = projectedPolygonView(selected);
      const { bounds, x, y } = focus;
      const width = bounds.maxX - bounds.minX;
      const height = bounds.maxY - bounds.minY;
      const span = Math.max(width, height);
      const scale = Math.max(1.4, Math.min(9, 180 / Math.max(span, 1)));
      const displayedMinorSpan = Math.min(width, height) * scale;
      const markerScreenRadius = Math.max(2.5, Math.min(4, displayedMinorSpan * 0.055));
      const markerRadius = markerScreenRadius / scale;
      const labelOffset = 12 / scale;
      cameraTransform = `translate(${(500 - x * scale).toFixed(2)}px, ${(240 - y * scale).toFixed(2)}px) scale(${scale.toFixed(3)})`;
      $("#mapGlow feGaussianBlur").setAttribute("stdDeviation", (7 / scale).toFixed(3));
      const markerPoint = entry.markerCoordinates ? equalEarthPoint(entry.markerCoordinates) : [x, y];
      $("#mapMarker").setAttribute("cx", markerPoint[0]);
      $("#mapMarker").setAttribute("cy", markerPoint[1]);
      $("#mapMarker").setAttribute("r", markerRadius.toFixed(3));
      $("#mapMarker").style.strokeWidth = `${(1.5 / scale).toFixed(3)}px`;
      $("#mapLabel").setAttribute("x", bounds.maxX + labelOffset);
      $("#mapLabel").setAttribute("y", y);
      $("#mapLabel").style.fontSize = `${(18 / scale).toFixed(3)}px`;
      $("#mapLabel").style.strokeWidth = `${(4.5 / scale).toFixed(3)}px`;
      $("#mapLabel").style.dominantBaseline = "middle";
      $("#mapLabel").textContent = entry.mapLabel || atlasCountryName(entry);
      $("#historicalLabel").classList.add("is-visible");
    }
    $("#mapCamera").style.transform = cameraTransform;
    $("#mapDataStatus").textContent = entry && !selected.length ? "対象境界を特定できません" : `${mapYear}年 · ${data.features.length}地域`;
    $("#mapDescription").textContent = entry ? (entry.territoryMode === "outline-only" ? `${mapYear}年の世界境界。フランスの外郭のみを表示し、ヴィシー政府の実効支配域としては塗っていません。` : `${mapYear}年の世界境界。${atlasCountryName(entry)}を強調表示しています。`) : `${mapYear}年資料の正確な海岸線。国境は非表示です。`;
  } catch (error) {
    if (requestId !== historicalMapRequest) return;
    $("#mapDataStatus").textContent = "地図の読込に失敗";
    showToast(error.message, true);
  }
}

function filteredItems() {
  const query = appState.search.trim().normalize("NFKC").toLocaleLowerCase("ja");
  return appState.database.items.filter((item) => {
    const haystack = [item.country, item.region, item.currency, item.denomination, item.year, item.series, item.title, item.story, item.catalogNumber].join(" ").normalize("NFKC").toLocaleLowerCase("ja");
    if (query && !haystack.includes(query)) return false;
    if (appState.filters.region && item.region !== appState.filters.region) return false;
    if (appState.filters.country && item.country !== appState.filters.country) return false;
    if (appState.filters.currency && item.currency !== appState.filters.currency) return false;
    if (appState.filters.stateStatus && item.stateStatus !== appState.filters.stateStatus) return false;
    const issueYears = Array.from(String(item.year || "").matchAll(/\d{4}/g), (match) => Number(match[0]));
    const issueStart = issueYears.length ? Math.min(...issueYears) : null;
    const issueEnd = issueYears.length ? Math.max(...issueYears) : null;
    const overlaps = (start, end) => issueStart !== null && issueStart <= end && issueEnd >= start;
    if (appState.filters.period === "before-1920" && !overlaps(0, 1919)) return false;
    if (appState.filters.period === "1920-1949" && !overlaps(1920, 1949)) return false;
    if (appState.filters.period === "1950-1979" && !overlaps(1950, 1979)) return false;
    if (appState.filters.period === "1980-1999" && !overlaps(1980, 1999)) return false;
    if (appState.filters.period === "after-2000" && !overlaps(2000, 9999)) return false;
    if (appState.filters.period === "unknown" && issueStart !== null) return false;
    const rarity = Number(item.rarityScore) || 0;
    if (appState.filters.rarity === "50-plus" && rarity < 50) return false;
    if (appState.filters.rarity === "40-49" && (rarity < 40 || rarity >= 50)) return false;
    if (appState.filters.rarity === "under-40" && rarity >= 40) return false;
    if (appState.filters.type && item.type !== appState.filters.type) return false;
    if (appState.filters.location === "placed" && (!item.location?.binder || item.location.binder === "未配置")) return false;
    if (appState.filters.location === "unplaced" && item.location?.binder && item.location.binder !== "未配置") return false;
    if (appState.filters.duplicates && item.duplicateQty < 1) return false;
    return true;
  });
}

function noteCard(item) {
  const image = item.images?.front ? `<img src="${escapeHtml(item.images.front)}" alt="${escapeHtml(item.country)} ${escapeHtml(item.title)}の表面">` : "";
  const location = item.location?.binder && item.location.binder !== "未配置" ? `${item.location.binder}${item.location.page ? ` / ${item.location.page}` : ""}` : "未配置";
  const interaction = staticArchive ? "" : ` role="button" tabindex="0" aria-label="${escapeHtml(item.country)} ${escapeHtml(item.title)}を編集"`;
  return `<article class="note-card"${interaction} data-note-id="${escapeHtml(item.id)}">
    <div class="note-visual" style="--note-bg:${hashColor(item.country)}">${image}<span class="note-country-code">${escapeHtml(item.country.slice(0, 12))}</span><span class="note-denom">${escapeHtml(item.denomination)}</span></div>
    <div class="note-body"><div class="note-meta"><span class="country-label">${escapeHtml(item.country)}</span><span class="rarity-label">希少度 ${item.rarityScore}/100</span></div>
      <h4>${escapeHtml(item.title || `${item.denomination} ${item.currency}`)}</h4><p>${escapeHtml(item.year || "年代不明")} · ${escapeHtml(item.series || item.currency)}</p>
      <div class="note-footer"><span class="qty-pill">本蔵 ${item.collectionQty}枚${item.duplicateQty ? ` <b class="duplicate-pill">＋ダブり ${item.duplicateQty}</b>` : ""}</span><span>${escapeHtml(location)}</span></div>
    </div></article>`;
}

function renderCollection() {
  const source = appState.database.sourceSnapshot || {};
  const ribbon = $("#sourceRibbon");
  if (source.countryCount) {
    ribbon.hidden = false;
    ribbon.innerHTML = `<span><b>Notion同期スナップショット</b> ${escapeHtml(source.importedAt || "")}</span><span>${source.countryCount}か国・地域の索引 · 詳細${source.detailedNotionCount || 0}件 · 一覧表${source.sheetCount || 0}件</span>`;
  } else {
    ribbon.hidden = true;
  }
  const fillFilter = (selector, values, selected) => {
    const select = $(selector);
    select.innerHTML = `<option value="">すべて</option>${values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
    select.value = selected;
  };
  const itemsByLabel = (key) => Array.from(new Set(appState.database.items.map((item) => item[key]).filter(Boolean))).sort((a, b) => a.localeCompare(b, "ja"));
  fillFilter("#regionFilter", itemsByLabel("region"), appState.filters.region);
  fillFilter("#countryFilter", itemsByLabel("country"), appState.filters.country);
  fillFilter("#currencyFilter", itemsByLabel("currency"), appState.filters.currency);
  $("#periodFilter").value = appState.filters.period;
  $("#stateStatusFilter").value = appState.filters.stateStatus;
  $("#rarityFilter").value = appState.filters.rarity;
  $("#typeFilter").value = appState.filters.type;
  $("#locationFilter").value = appState.filters.location;
  $("#duplicateFilter").checked = appState.filters.duplicates;
  const items = filteredItems();
  $("#collectionSummary").innerHTML = `<span><strong>${items.length}</strong>件を表示</span><span>全${appState.database.items.length}件 · 検索と絞り込みは同時に使えます</span>`;
  const grid = $("#collectionGrid");
  grid.classList.toggle("is-table", appState.layout === "table");
  grid.innerHTML = items.length ? items.map(noteCard).join("") : `<div class="empty-state"><strong>条件に合う紙幣がありません</strong><p>検索語または絞り込みを解除してください。</p></div>`;
}

function renderTrades() {
  const lots = appState.database.lots;
  const acquisition = lots.filter((lot) => lot.kind === "banknotes").reduce((sum, lot) => sum + Number(lot.cost || 0), 0);
  const supplies = lots.filter((lot) => lot.kind === "supply").reduce((sum, lot) => sum + Number(lot.cost || 0), 0);
  const saleNet = appState.database.trades.filter((trade) => trade.type === "sale").reduce((sum, trade) => sum + trade.amount - trade.fees, 0);
  const duplicateValue = appState.database.items.reduce((sum, item) => sum + item.estimatedValue * item.duplicateQty, 0);
  const metrics = [["紙幣の仕入れ", yen(acquisition)], ["保存用品", yen(supplies)], ["売却入金（手数料控除）", yen(saleNet)], ["ダブり推定額", yen(duplicateValue)]];
  $("#tradeMetrics").innerHTML = metrics.map(([label, value]) => `<div class="trade-stat"><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#lotTableBody").innerHTML = [...lots].sort((a, b) => String(b.date).localeCompare(String(a.date))).map((lot) => `<tr><td>${formatDate(lot.date)}</td><td>${escapeHtml(lot.name)}</td><td>${lot.quantity} ${escapeHtml(lot.unit)}</td><td>${yen(lot.cost)}</td><td>${lot.unitCost ? yen(lot.unitCost) : "—"}</td></tr>`).join("");
  const sales = appState.database.trades.filter((trade) => trade.type === "sale");
  $("#saleHistory").innerHTML = sales.length ? `<div class="sale-list">${sales.map((sale) => `<div class="sale-row"><div><strong>${escapeHtml(sale.itemTitle)}</strong><span>${formatDate(sale.date)} · ${sale.quantity}枚${sale.note ? ` · ${escapeHtml(sale.note)}` : ""}</span></div><b>${yen(sale.amount - sale.fees)}</b></div>`).join("")}</div>` : `<div class="empty-mini">売却履歴はまだありません。<br>ダブり枚数を登録すると売却台帳を使えます。</div>`;
}

function renderStorage() {
  const items = appState.database.items;
  const placed = items.filter((item) => item.location?.binder && item.location.binder !== "未配置");
  const percentage = items.length ? Math.round((placed.length / items.length) * 100) : 0;
  const gauge = $("#storageGauge");
  gauge.style.setProperty("--coverage", `${percentage * 3.6}deg`);
  $("#storageGauge span").textContent = `${percentage}%`;
  $("#storageCoverageTitle").textContent = `${placed.length} / ${items.length}件の位置を登録済み`;
  $("#storageCoverageText").textContent = items.length === placed.length ? "すべての収蔵品を現物から探せます。" : `あと${items.length - placed.length}件にバインダー、ページ、ポケットを設定してください。`;
  const groups = new Map();
  for (const item of items) {
    const binder = item.location?.binder || "未配置";
    if (!groups.has(binder)) groups.set(binder, []);
    groups.get(binder).push(item);
  }
  $("#storageGrid").innerHTML = Array.from(groups.entries()).sort((a, b) => (a[0] === "未配置" ? 1 : b[0] === "未配置" ? -1 : a[0].localeCompare(b[0], "ja"))).map(([binder, entries]) => {
    const countries = Array.from(new Set(entries.map((item) => item.country)));
    return `<article class="binder-card"><div class="binder-head"><span class="binder-icon"></span><span class="binder-count">${entries.length}</span></div><h4>${escapeHtml(binder)}</h4><p>${countries.slice(0, 4).map(escapeHtml).join("、")}${countries.length > 4 ? `ほか${countries.length - 4}発行体` : ""}</p><div class="binder-samples">${countries.slice(0, 5).map((country) => `<span title="${escapeHtml(country)}">${escapeHtml(country.slice(0, 1))}</span>`).join("")}</div></article>`;
  }).join("");
}

function renderSettings() {
  const source = appState.database.sourceSnapshot || {};
  $("#mediaPath").textContent = appState.database.runtime?.mediaDirectory || "BANKNOTE_MEDIA_DIR";
  $("#sourceNote").textContent = source.note || "初期資料の情報はありません。";
  $("#notionSource").href = source.notionRoot || "#";
  $("#sheetSource").href = source.googleSheet || "#";
}

function renderAll() {
  renderDashboard();
  renderCollection();
  renderTrades();
  renderStorage();
  renderSettings();
}

function formElement(name) {
  return $("#noteForm").elements.namedItem(name);
}

function openNote(item = null) {
  const form = $("#noteForm");
  const imagePreview = $("#noteImagePreview");
  const imageEmpty = $("#noteImageEmpty");
  form.reset();
  formElement("collectionQty").value = 1;
  formElement("duplicateQty").value = 0;
  formElement("rarityState").value = 1;
  formElement("rarityAge").value = 1;
  formElement("rarityCondition").value = 1;
  formElement("rarityMarket").value = 1;
  formElement("rarityVolume").value = 1;
  $("#deleteNoteButton").hidden = !item;
  $("#noteDialogTitle").textContent = item ? `${item.country} · ${item.title}` : "紙幣を登録";
  const previews = item ? [["表面", item.images?.front], ["裏面", item.images?.back]].filter(([, url]) => url) : [];
  imagePreview.hidden = previews.length === 0;
  imageEmpty.hidden = previews.length > 0;
  imagePreview.innerHTML = previews.map(([label, url]) => `<figure><img src="${escapeHtml(url)}" alt="${escapeHtml(item.country)} ${escapeHtml(item.title)}の${label}"><figcaption>${label}</figcaption></figure>`).join("");
  if (item) {
    const simple = ["id", "type", "region", "country", "currency", "denomination", "year", "series", "title", "catalogNumber", "collectionQty", "duplicateQty", "condition", "stateStatus", "acquisitionDate", "acquisitionCost", "estimatedValue", "marketNote", "story", "motifsFront", "motifsBack", "referenceUrl", "sourceUrl"];
    for (const name of simple) if (formElement(name)) formElement(name).value = item[name] ?? "";
    formElement("binder").value = item.location?.binder === "未配置" ? "" : item.location?.binder || "";
    formElement("page").value = item.location?.page || "";
    formElement("pocket").value = item.location?.pocket || "";
    formElement("rarityState").value = item.rarityFactors?.state || 1;
    formElement("rarityAge").value = item.rarityFactors?.age || 1;
    formElement("rarityCondition").value = item.rarityFactors?.condition || 1;
    formElement("rarityMarket").value = item.rarityFactors?.marketEvidence || 1;
    formElement("rarityVolume").value = item.rarityFactors?.issueVolume || 1;
  }
  $("#noteDialog").showModal();
}

async function uploadAsset(itemId, file, side) {
  if (!file) return;
  const params = new URLSearchParams({ filename: file.name, itemId, side });
  await api(`/api/assets?${params}`, { method: "POST", headers: { "content-type": file.type || "application/octet-stream" }, body: file });
}

async function saveNote(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const values = Object.fromEntries(new FormData(form).entries());
  const id = values.id;
  const payload = {
    type: values.type,
    region: values.region || "その他",
    country: values.country,
    currency: values.currency,
    denomination: values.denomination,
    year: values.year,
    series: values.series,
    title: values.title || `${values.denomination} ${values.currency}`,
    catalogNumber: values.catalogNumber,
    collectionQty: Number(values.collectionQty) || 0,
    duplicateQty: Number(values.duplicateQty) || 0,
    condition: values.condition,
    stateStatus: values.stateStatus,
    acquisitionDate: values.acquisitionDate,
    acquisitionCost: Number(values.acquisitionCost) || 0,
    estimatedValue: Number(values.estimatedValue) || 0,
    marketNote: values.marketNote,
    story: values.story,
    motifs: `表：${values.motifsFront || "未記録"}／裏：${values.motifsBack || "未記録"}`,
    motifsFront: values.motifsFront,
    motifsBack: values.motifsBack,
    referenceUrl: values.referenceUrl,
    sourceUrl: values.sourceUrl,
    location: { binder: values.binder || "未配置", page: values.page, pocket: values.pocket },
    rarityFactors: { state: Number(values.rarityState), age: Number(values.rarityAge), condition: Number(values.rarityCondition), marketEvidence: Number(values.rarityMarket), issueVolume: Number(values.rarityVolume) }
  };
  try {
    const saved = await api(id ? `/api/items/${encodeURIComponent(id)}` : "/api/items", { method: id ? "PUT" : "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    await uploadAsset(saved.id, formElement("frontFile").files[0], "front");
    await uploadAsset(saved.id, formElement("backFile").files[0], "back");
    $("#noteDialog").close();
    await refresh();
    switchView("collection");
    showToast(id ? "紙幣情報を更新しました。" : "紙幣を収蔵台帳へ登録しました。");
  } catch (error) {
    showToast(error.message, true);
  }
}

function openSale() {
  const duplicates = appState.database.items.filter((item) => item.duplicateQty > 0);
  if (!duplicates.length) return showToast("先に紙幣の編集画面でダブり枚数を登録してください。", true);
  $("#saleItemSelect").innerHTML = duplicates.map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.country)} ${escapeHtml(item.title)}（${item.duplicateQty}枚）</option>`).join("");
  $("#saleForm").reset();
  $("#saleForm").elements.date.value = new Date().toISOString().slice(0, 10);
  $("#saleForm").elements.quantity.value = 1;
  $("#saleForm").elements.fees.value = 0;
  $("#saleDialog").showModal();
}

async function saveSale(event) {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget).entries());
  try {
    await api("/api/trades", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...values, type: "sale" }) });
    $("#saleDialog").close();
    await refresh();
    showToast("売却を記録し、ダブり在庫を減らしました。");
  } catch (error) {
    showToast(error.message, true);
  }
}

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") { row.push(field); field = ""; }
    else if (character === "\n") { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += character;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function csvToItems(text) {
  const rows = parseCsv(text);
  const headerIndex = rows.findIndex((row) => row.some((cell) => ["発行国", "国", "Country"].includes(cell.trim())));
  if (headerIndex < 0) throw new Error("見出し行（発行国）が見つかりません。");
  const headers = rows[headerIndex].map((cell) => cell.trim());
  const column = (...names) => names.map((name) => headers.indexOf(name)).find((index) => index >= 0) ?? -1;
  const at = (row, index) => index >= 0 ? String(row[index] || "").trim() : "";
  const indices = {
    date: column("入手日", "取得日"), country: column("発行国", "国", "Country"), title: column("通称", "名称"), year: column("製造年", "発行年"), denomination: column("額面"), currency: column("単位", "通貨"), code: column("保有識別番号", "識別番号"), cost: column("仕入値", "取得原価"), story: column("解説", "概要"), reference: column("参考文献", "資料URL")
  };
  return rows.slice(headerIndex + 1).map((row, offset) => {
    const country = at(row, indices.country);
    if (!country) return null;
    const currency = at(row, indices.currency);
    const denomination = at(row, indices.denomination);
    const code = at(row, indices.code);
    return {
      id: code ? `csv-${code}-${offset}` : `csv-${Date.now()}-${offset}`,
      type: "banknote",
      country,
      region: "その他",
      currency,
      denomination,
      year: at(row, indices.year),
      title: at(row, indices.title) || `${denomination || "額面不明"} ${currency}`,
      story: at(row, indices.story),
      acquisitionDate: at(row, indices.date).replaceAll("/", "-"),
      acquisitionCost: Number(at(row, indices.cost).replace(/[^0-9.-]/g, "")) || 0,
      catalogNumber: code,
      referenceUrl: at(row, indices.reference),
      collectionQty: 1,
      duplicateQty: 0,
      condition: "未評価",
      location: { binder: "未配置", page: "", pocket: "" },
      tags: ["CSV移行"]
    };
  }).filter(Boolean);
}

async function importFile(file, kind) {
  if (!file) return;
  try {
    const text = await file.text();
    const payload = kind === "json" ? JSON.parse(text) : { items: csvToItems(text) };
    const result = await api("/api/import", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    await refresh();
    showToast(`${result.counts.items}件の紙幣を統合しました。`);
  } catch (error) {
    showToast(`取り込み失敗: ${error.message}`, true);
  }
}

function attachEvents() {
  document.addEventListener("click", (event) => {
    const viewTarget = event.target.closest("[data-view-target]");
    if (viewTarget) switchView(viewTarget.dataset.viewTarget);
    const eraTarget = event.target.closest("[data-atlas-era]");
    if (eraTarget) {
      appState.atlasEra = eraTarget.dataset.atlasEra;
      appState.atlasCountry = "";
      appState.atlasCurrency = "";
      renderDashboard();
    }
    const countryTarget = event.target.closest("[data-atlas-country]");
    if (countryTarget) {
      appState.atlasCountry = countryTarget.dataset.atlasCountry;
      appState.atlasCurrency = historicalAtlas.slice().reverse().find((entry) => entry.era === appState.atlasEra && entry.country === appState.atlasCountry)?.currencyKey || "";
      renderDashboard();
    }
    const currencyTarget = event.target.closest("[data-atlas-currency]");
    if (currencyTarget) {
      const entry = historicalAtlas.find((item) => item.currencyKey === currencyTarget.dataset.atlasCurrency);
      if (!entry) return;
      appState.atlasCurrency = entry.currencyKey;
      renderDashboard();
    }
    const noteTarget = event.target.closest("[data-note-id]");
    if (noteTarget && !staticArchive) openNote(appState.database.items.find((item) => item.id === noteTarget.dataset.noteId));
    const close = event.target.closest("[data-close-dialog]");
    if (close) $(`#${close.dataset.closeDialog}`).close();
  });
  document.addEventListener("keydown", (event) => {
    const noteTarget = event.target.closest?.("[data-note-id]");
    if (noteTarget && !staticArchive && ["Enter", " "].includes(event.key)) { event.preventDefault(); openNote(appState.database.items.find((item) => item.id === noteTarget.dataset.noteId)); }
  });
  $("#addNoteButton").addEventListener("click", () => openNote());
  $("#viewCountryCollection").addEventListener("click", () => {
    const entry = selectedAtlasEntry();
    if (!entry) return;
    appState.search = entry.country;
    appState.filters = { region: "", country: "", currency: "", period: "", stateStatus: "", rarity: "", type: "", location: "", duplicates: false };
    $("#globalSearch").value = appState.search;
    switchView("collection");
  });
  $("#addSaleButton").addEventListener("click", openSale);
  $("#noteForm").addEventListener("submit", saveNote);
  $("#saleForm").addEventListener("submit", saveSale);
  $("#deleteNoteButton").addEventListener("click", async () => {
    const id = formElement("id").value;
    if (!id || !window.confirm("この紙幣を台帳から削除します。自動バックアップには直前の状態が残ります。")) return;
    try { await api(`/api/items/${encodeURIComponent(id)}`, { method: "DELETE" }); $("#noteDialog").close(); await refresh(); showToast("紙幣を削除しました。"); } catch (error) { showToast(error.message, true); }
  });
  $("#globalSearch").addEventListener("input", (event) => { appState.search = event.target.value; if (appState.search && appState.view !== "collection") switchView("collection"); else renderCollection(); });
  $("#regionFilter").addEventListener("change", (event) => { appState.filters.region = event.target.value; renderCollection(); });
  $("#countryFilter").addEventListener("change", (event) => { appState.filters.country = event.target.value; renderCollection(); });
  $("#currencyFilter").addEventListener("change", (event) => { appState.filters.currency = event.target.value; renderCollection(); });
  $("#periodFilter").addEventListener("change", (event) => { appState.filters.period = event.target.value; renderCollection(); });
  $("#stateStatusFilter").addEventListener("change", (event) => { appState.filters.stateStatus = event.target.value; renderCollection(); });
  $("#rarityFilter").addEventListener("change", (event) => { appState.filters.rarity = event.target.value; renderCollection(); });
  $("#typeFilter").addEventListener("change", (event) => { appState.filters.type = event.target.value; renderCollection(); });
  $("#locationFilter").addEventListener("change", (event) => { appState.filters.location = event.target.value; renderCollection(); });
  $("#duplicateFilter").addEventListener("change", (event) => { appState.filters.duplicates = event.target.checked; renderCollection(); });
  $("#clearFilters").addEventListener("click", () => {
    appState.search = ""; appState.filters = { region: "", country: "", currency: "", period: "", stateStatus: "", rarity: "", type: "", location: "", duplicates: false };
    $("#globalSearch").value = ""; $("#duplicateFilter").checked = false; renderCollection();
  });
  $$("[data-layout]").forEach((button) => button.addEventListener("click", () => { appState.layout = button.dataset.layout; $$("[data-layout]").forEach((item) => item.classList.toggle("is-active", item === button)); renderCollection(); }));
  $("#jsonImport").addEventListener("change", (event) => importFile(event.target.files[0], "json"));
  $("#csvImport").addEventListener("change", (event) => importFile(event.target.files[0], "csv"));
}

async function init() {
  attachEvents();
  try {
    await refresh();
    $("#loadingState").hidden = true;
    $("#appViews").hidden = false;
    $("#statusDot").classList.add("is-online");
    $("#statusText").textContent = staticArchive ? "公開スナップショット" : "NAS台帳に接続";
  } catch (error) {
    $("#loadingState").innerHTML = `<div class="loading-seal">!</div><p>${escapeHtml(error.message)}</p>`;
    $("#statusDot").classList.add("is-offline");
    $("#statusText").textContent = "接続できません";
  }
}

init();
