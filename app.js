const appState = {
  database: null,
  view: "dashboard",
  layout: "cards",
  search: "",
  atlasEra: "2018",
  atlasRegion: "",
  atlasCountry: "",
  atlasCurrency: "",
  collectionScopeIds: null,
  filters: { macroRegion: "", region: "", country: "", currency: "", period: "", stateStatus: "", rarity: "", type: "", location: "", duplicates: false }
};

const emptyCollectionFilters = () => ({ macroRegion: "", region: "", country: "", currency: "", period: "", stateStatus: "", rarity: "", type: "", location: "", duplicates: false });
const macroRegionOrder = ["アジア", "ヨーロッパ", "北アメリカ", "南アメリカ", "ロシア", "アフリカ", "オセアニア", "その他"];
const macroRegionByRegion = new Map([
  ["東アジア", "アジア"], ["東南アジア", "アジア"], ["中央アジア", "アジア"], ["中東アジア", "アジア"],
  ["北ヨーロッパ", "ヨーロッパ"], ["西ヨーロッパ", "ヨーロッパ"], ["中央ヨーロッパ", "ヨーロッパ"], ["東ヨーロッパ", "ヨーロッパ"], ["イベリア半島", "ヨーロッパ"], ["バルカン半島", "ヨーロッパ"],
  ["北アメリカ", "北アメリカ"], ["中央アメリカ", "北アメリカ"], ["南アメリカ", "南アメリカ"],
  ["ロシア構成国", "ロシア"], ["アフリカ", "アフリカ"], ["オセアニア", "オセアニア"]
]);

function macroRegionForItem(item) {
  return macroRegionByRegion.get(item?.region) || "その他";
}

const viewMeta = {
  dashboard: ["HISTORICAL ATLAS", "紙幣の歴史地図"],
  collection: ["CATALOG", "収蔵台帳"],
  trades: ["TRADE LEDGER", "仕入れと売却"],
  storage: ["PHYSICAL STORAGE", "現物の保管"],
  settings: ["ARCHIVE CONTROL", "保存とNAS"]
};

const palette = ["#d9c798", "#b9c7b1", "#d6aaa2", "#bfc4cf", "#ccb88f", "#a9c3bd", "#d3bdca"];
const withheldImageIds = new Set([
  "ve-2-2018", "ve-5-2018", "ve-20-2014", "ve-50-2018", "ve-2000-2016",
  "ar-1-1985", "ar-5-1985", "ar-10-1985", "ar-10-1992", "cl-1000-1994", "pe-500-1987",
  "de-50-1906", "de-10000-1922", "de-100000-1923", "de-2000000-1923", "de-10000000-1923", "de-100000000-1923", "de-500000000-1923", "de-1000000000-1923", "de-1-1940",
  "at-1000-1922", "at-50-1986", "sheet-tr-100-1983", "sheet-tr-500", "sheet-hu-1946", "sheet-fi-10-1986", "sheet-fr-10-1966", "sheet-fr-5-1965", "sheet-yu-1993", "sheet-fr-5-1966", "sheet-fr-5-1943", "sheet-saar-5-1947",
  "pe-10-1985", "pe-50-1986", "ar-10-1983-peso-argentino", "hu-10000b-1946", "de-2-1914", "de-50-1920", "de-1000-1922", "de-20000-1923", "de-20000000-1923", "de-50000000-1923", "sheet-dk-20-1972", "sheet-dk-10-1936",
  "br-5-1964", "br-10-1974", "br-100-1989", "my-5-occupation", "jp-1-1885", "jp-5sen-1944", "jp-10sen-1944", "jp-50sen-1938", "cn-50sen-1939", "de-5000000-1923", "at-50-1919", "by-50-2000", "by-100-2000", "by-500-2000", "yu-10-1981", "yu-20-1981", "yu-50-1981", "mn-10-1981", "mn-20-1981", "mn-50-1981", "hk-5-1975", "kp-50-2018-commemorative", "kp-5000-2017-kim-jong-suk", "kp-5000-2019-china-relations", "cn-5-military-1938", "jp-50sen-1944", "cn-frbc-5fen-1938"
]);
const historicalAtlas = [
  { era: "2018", label: "2018–2021", period: "ボリバル・ソベラノ", mapYear: 2018, featureNames: ["Venezuela"], country: "ベネズエラ", officialName: "ベネズエラ・ボリバル共和国", currency: "ボリバル・ソベラノ（2018年8月導入）", currencyFamily: "venezuela", currencyKey: "venezuela-sovereign-bolivar", currencyOrder: 2, flag: "/flags/venezuela-2006.svg", flagAlt: "2006年以降のベネズエラ国旗", flagPeriod: "2006–現在", short: "ベネズエラ", detail: "通貨改革が行われ、ボリバル・ソベラノが登場した時代。" },
  { era: "2014", label: "2008–2018", period: "ボリバル・フエルテ", mapYear: 2018, mapLegend: "2018年境界資料（収蔵紙幣は2014–2018年）", featureNames: ["Venezuela"], country: "ベネズエラ", officialName: "ベネズエラ・ボリバル共和国", currency: "ボリバル・フエルテ（旧ボリバル）", currencyFamily: "venezuela", currencyKey: "venezuela-strong-bolivar", currencyOrder: 1, flag: "/flags/venezuela-2006.svg", flagAlt: "2006年以降のベネズエラ国旗", flagPeriod: "2006–現在", short: "ベネズエラ", detail: "2008年のデノミネーションで導入され、2018年のボリバル・ソベラノへの切替えまで使われた通貨期。" },
  { era: "1994", label: "1994", period: "南米の安定化", mapYear: 1994, featureNames: ["Chile"], country: "チリ", officialName: "チリ共和国", currency: "チリ・ペソ", flag: "/flags/chile.svg", flagAlt: "1994年当時のチリ国旗", flagPeriod: "1817–現在", short: "チリ", detail: "民主化後のチリで、ペソが日常の取引を支えていた時代。" },
  { era: "1993", label: "1992–2003", period: "連邦共和国ディナール", mapYear: 1993, featureNames: ["Yugoslavia"], country: "ユーゴスラビア連邦共和国", currency: "ユーゴスラビア・ディナール", currencyFamily: "yugoslavia", currencyKey: "yugoslavia-federal-dinar", currencyOrder: 2, regimeLabel: "ユーゴスラビア連邦共和国", flag: "/flags/yugoslavia-1992.svg", flagAlt: "1992年から2003年のユーゴスラビア連邦共和国旗", flagPeriod: "1992–2003", short: "ユーゴスラビア", detail: "社会主義連邦の解体後、セルビアとモンテネグロで構成された連邦共和国のディナール。国家再編と急激なインフレーションが紙幣に刻まれた時代。" },
  { era: "1987", label: "1987", period: "インティ時代", mapYear: 1987, featureNames: ["Peru"], country: "ペルー", officialName: "ペルー共和国", currency: "ペルー・インティ", flag: "/flags/peru.svg", flagAlt: "1987年当時のペルー国旗", flagPeriod: "1950–現在", short: "ペルー", detail: "インフレーションが進行するなか、インティ紙幣が流通していた時代。" },
  { era: "1989", label: "1989–1990", period: "クルザード・ノヴォ", mapYear: 1993, mapLegend: "1993年境界資料（収蔵紙幣は1989年）", featureNames: ["Brazil"], country: "ブラジル", officialName: "ブラジル連邦共和国", currency: "クルザード・ノヴォ", currencyFamily: "brazil", currencyKey: "brazil-new-cruzado", currencyOrder: 4, flag: "/flags/brazil-1968.svg", flagAlt: "1968年から1992年の23星ブラジル国旗", flagPeriod: "1968–1992", short: "ブラジル", detail: "高インフレーション下の1989年に導入され、1990年のクルゼイロ復活まで使われた短命な通貨期。" },
  { era: "1986", label: "1925–1938・1945–1998", period: "オーストリア・シリング", mapYear: 1986, featureNames: ["Austria"], country: "オーストリア共和国", currency: "オーストリア・シリング", currencyFamily: "austria", currencyKey: "austria-schilling", currencyOrder: 3, flag: "/flags/austria.svg", flagAlt: "オーストリア共和国国旗", flagPeriod: "1945–現在", short: "オーストリア", detail: "シリングが流通していた、欧州統合前のオーストリア。" },
  { era: "1986", label: "1986", period: "冷戦後期", mapYear: 1986, featureNames: ["Finland"], country: "フィンランド共和国", currency: "フィンランド・マルッカ", flag: "/flags/finland.svg", flagAlt: "フィンランド国旗", flagPeriod: "1918–現在", short: "フィンランド", detail: "マルッカ紙幣が北欧の日常を支えていた時代。" },
  { era: "1974", label: "1970–1986", period: "第2クルゼイロ", mapYear: 1985, mapLegend: "1985年境界資料（収蔵紙幣は1974年）", featureNames: ["Brazil"], country: "ブラジル", officialName: "ブラジル連邦共和国", currency: "クルゼイロ（1970–1986）", currencyFamily: "brazil", currencyKey: "brazil-cruzeiro-1970", currencyOrder: 3, flag: "/flags/brazil-1968.svg", flagAlt: "1968年から1992年の23星ブラジル国旗", flagPeriod: "1968–1992", short: "ブラジル", detail: "クルゼイロ・ノヴォから名称を戻したクルゼイロが、1986年のクルザード導入まで流通した時代。" },
  { era: "1970", label: "1970–1983", period: "ペソ・レイ", mapYear: 1985, mapLegend: "1985年境界資料（収蔵紙幣は1970年代）", featureNames: ["Argentina"], country: "アルゼンチン", officialName: "アルゼンチン共和国", currency: "ペソ・レイ18.188（Peso ley 18.188）", currencyFamily: "argentina", currencyKey: "argentina-peso-ley", currencyOrder: 1, regimeLabel: "アルゼンチン共和国", flag: "/flags/argentina.svg", flagAlt: "1970年代当時のアルゼンチン国旗", flagPeriod: "1944–現在", short: "アルゼンチン", detail: "1970年に旧ペソから切り替えられ、1983年まで流通したペソ・レイ18.188の時代。" },
  { era: "1983", label: "1983–1985", period: "ペソ・アルヘンティーノ", mapYear: 1983, featureNames: ["Argentina"], country: "アルゼンチン", officialName: "アルゼンチン共和国", currency: "ペソ・アルヘンティーノ（Peso argentino）", currencyFamily: "argentina", currencyKey: "argentina-peso-argentino", currencyOrder: 2, regimeLabel: "アルゼンチン共和国", flag: "/flags/argentina.svg", flagAlt: "1983年当時のアルゼンチン国旗", flagPeriod: "1944–現在", short: "アルゼンチン", detail: "1983年にペソ・レイから切り替えられ、1985年のアウストラル導入まで使われた通貨期。" },
  { era: "1985", label: "1985–1991", period: "アウストラル", eraPeriod: "通貨改革", mapYear: 1985, featureNames: ["Argentina"], country: "アルゼンチン", officialName: "アルゼンチン共和国", currency: "アウストラル（Austral）", currencyFamily: "argentina", currencyKey: "argentina-austral", currencyOrder: 3, regimeLabel: "アルゼンチン共和国", flag: "/flags/argentina.svg", flagAlt: "1985年当時のアルゼンチン国旗", flagPeriod: "1944–現在", short: "アルゼンチン", detail: "慢性的なインフレーションへの対策として、1985年にアウストラルが導入された時代。" },
  { era: "1992", label: "1992–2001", period: "兌換ペソ", mapYear: 1993, mapLegend: "1993年境界資料（1992年発行紙幣）", featureNames: ["Argentina"], country: "アルゼンチン", officialName: "アルゼンチン共和国", currency: "兌換ペソ（Peso convertible）", currencyFamily: "argentina", currencyKey: "argentina-convertible-peso", currencyOrder: 4, regimeLabel: "アルゼンチン共和国", flag: "/flags/argentina.svg", flagAlt: "1992年当時のアルゼンチン国旗", flagPeriod: "1944–現在", short: "アルゼンチン", detail: "1992年に導入され、米ドルとの固定相場を制度の柱とした兌換ペソの時代。" },
  { era: "1964", label: "1942–1967", period: "第1クルゼイロ", mapYear: 1965, mapLegend: "1965年境界資料（収蔵紙幣は1964年）", featureNames: ["Brazil"], country: "ブラジル", officialName: "ブラジル合衆国", currency: "クルゼイロ（1942–1967）", currencyFamily: "brazil", currencyKey: "brazil-cruzeiro-1942", currencyOrder: 2, flag: "/flags/brazil-1960.svg", flagAlt: "1960年から1968年の22星ブラジル国旗", flagPeriod: "1960–1968", short: "ブラジル", detail: "ミルレイスに代わって導入された最初のクルゼイロが流通した時代。" },
  { era: "1983", label: "1983–1989", period: "第7次発行グループ", mapYear: 1983, featureNames: ["Turkey (Ottoman Empire)"], country: "トルコ共和国", currency: "トルコ・リラ（E7）", currencyFamily: "turkey", currencyKey: "turkey-e7-lira", currencyOrder: 2, flag: "/flags/turkey.svg", flagAlt: "1983年当時のトルコ国旗", flagPeriod: "1936–現在", short: "トルコ", detail: "高インフレへ向かう時期に第7次発行グループのリラ紙幣が流通した時代。" },
  { era: "1974", label: "1971–1984", period: "第6次発行グループ500リラ", mapYear: 1966, mapLegend: "1966年境界資料（収蔵紙幣は1971–1974年発行）", featureNames: ["Turkey (Ottoman Empire)"], country: "トルコ共和国", currency: "トルコ・リラ（E6）", currencyFamily: "turkey", currencyKey: "turkey-e6-lira", currencyOrder: 1, flag: "/flags/turkey.svg", flagAlt: "1971–1974年当時のトルコ国旗", flagPeriod: "1936–現在", short: "トルコ", detail: "アタテュルクとイスタンブール大学正門を描く第6次発行グループ500リラ券の時代。" },
  { era: "1966", label: "1966", period: "フラン／新フラン", mapYear: 1966, featureNames: ["France"], country: "フランス共和国", officialName: "フランス共和国（第五共和政）", nativeName: "République française", currency: "フランス・フラン（収蔵資料に新フラン表記を含む）", pickerCurrency: "フラン／新フラン", currencyFamily: "france", currencyKey: "france-franc-1966", currencyOrder: 4, regimeLabel: "第五共和政", flag: "/flags/france-1946.svg", flagAlt: "1966年当時のフランス国旗", flagPeriod: "1794–現在", short: "フランス", detail: "1958年憲法による第五共和政下で通貨制度の安定が進み、旧額面との区別から「新フラン」の呼称もなお見られた時代。" },
  { era: "1965", label: "1965", period: "新フラン", mapYear: 1965, featureNames: ["France"], country: "フランス共和国", officialName: "フランス共和国（第五共和政）", nativeName: "République française", currency: "新フラン", currencyFamily: "france", currencyKey: "france-new-franc-1965", currencyOrder: 3, regimeLabel: "第五共和政", flag: "/flags/france-1946.svg", flagAlt: "1965年当時のフランス国旗", flagPeriod: "1794–現在", short: "フランス", detail: "1958年憲法による第五共和政下、1960年の通貨改革で100旧フランを1新フランとした後の通貨。" },
  { era: "1947", label: "1947", period: "戦後のザール", mapYear: 1947, mapLegend: "1947年境界資料・ザール位置資料", featureNames: ["Saar Protectorate"], country: "ザール保護領", currency: "ザールマルク", flag: "/flags/saar-1947.svg", flagAlt: "1947年から1956年のザール保護領旗", flagPeriod: "1947–1956", short: "ザール", detail: "フランス管理下でドイツ通貨圏から切り離され、1947年6月に短命なザールマルクが導入された過渡期。位置表示には現在のザールラント境界を参照しています。" },
  { era: "1946", label: "1946", period: "戦後復興", mapYear: 1946, featureNames: ["Hungary"], country: "ハンガリー", officialName: "ハンガリー共和国", currency: "ペンゲー → フォリント（1946年8月1日）", flag: "/flags/hungary-1946.svg", flagAlt: "1946年から1949年のハンガリー共和国旗", flagPeriod: "1946–1949", short: "ハンガリー", detail: "史上屈指のハイパーインフレーションを経て、フォリントへ転換した年。" },
  { era: "1946", label: "1946", period: "戦後フラン", mapYear: 1946, featureNames: ["France"], country: "フランス共和国", officialName: "フランス共和国（臨時政府 → 第四共和政）", nativeName: "République française", currency: "フランス・フラン", currencyFamily: "france", currencyKey: "france-franc-1946", currencyOrder: 2, regimeLabel: "臨時政府 → 第四共和政", flag: "/flags/france-1946.svg", flagAlt: "1946年当時のフランス国旗", flagPeriod: "1946年仕様", short: "フランス", detail: "1946年はフランス共和国臨時政府から、10月27日の憲法施行による第四共和政へ移行した年。復興期の社会をフラン紙幣が支えました。" },
  { era: "1943", label: "1943", period: "占領期フラン", mapYear: 1943, mapOverline: "1943 · OCCUPIED FRANCE", mapLegend: "1943年7月1日・フランス外郭（支配域ではありません）", mapBoundaryLabel: "フランス本土の外郭", mapControl: "全土占領下：大部分はドイツ軍、南東部・コルシカはイタリア軍", mapLabel: "ヴィシー政府所在地", markerCoordinates: [3.4242, 46.126], territoryMode: "outline-only", featureNames: ["France"], country: "フランス共和国", officialName: "フランス国（ヴィシー政権）", nativeName: "État français", currency: "フランス・フラン", currencyFamily: "france", currencyKey: "france-franc-1943", currencyOrder: 1, regimeLabel: "ヴィシー政権", flag: "/flags/france-1946.svg", flagAlt: "1943年当時に用いられたフランス三色旗", flagPeriod: "1794–現在", short: "フランス", detail: "1943年7月1日にはフランス本土全域が枢軸軍の占領下にあり、ヴィシー政府に独立した実効支配域はありませんでした。地図の金色線はフランスの外郭であり、ヴィシー政権の領土を示すものではありません。" },
  { era: "1940", label: "1924–1948", period: "ライヒスマルク", eraPeriod: "戦時ドイツ", mapYear: 1940, mapLegend: "1940年境界資料（通貨期 1924–1948）", featureNames: ["Germany (Prussia)"], country: "ナチス・ドイツ", officialName: "ドイツ国（ナチス政権）", nativeName: "Deutsches Reich", currency: "ライヒスマルク（Reichsmark）", currencyFamily: "germany", currencyKey: "germany-reichsmark", currencyOrder: 4, regimeLabel: "ヴァイマル共和国 → ナチス・ドイツ", flag: "/flags/germany-1935.svg", flagAlt: "1935年から1945年のドイツ国旗", flagPeriod: "1935–1945", short: "ナチス・ドイツ", detail: "1924年に導入されたライヒスマルクは、ヴァイマル共和国からナチス・ドイツを経て1948年まで使われました。政治体制では分割せず、ひとつの通貨期として表示しています。" },
  { era: "1940", label: "1939–1944", period: "Reichskreditkassenschein", eraPeriod: "占領地決済", mapYear: 1940, featureNames: ["Germany (Prussia)"], country: "ナチス・ドイツ", officialName: "ドイツ国（Reichskreditkassen発行）", nativeName: "Deutsches Reich", currency: "ライヒスクレジットカッセン券", currencyFamily: "germany", currencyKey: "germany-reichskreditkassenschein", currencyOrder: 5, regimeLabel: "ナチス・ドイツ／占領地用発行", flag: "/flags/germany-1935.svg", flagAlt: "1935年から1945年のドイツ国旗", flagPeriod: "1935–1945", short: "ナチス・ドイツ", detail: "Reichskreditkassenが占領地で現地通貨と併用するため発行した紙幣。ドイツ国内の一般銀行券とは分けて表示します。" },
  { era: "1923", label: "1923–1924", period: "レンテンマルク", mapYear: 1923, featureNames: ["Germany (Prussia)"], country: "ヴァイマル共和国", officialName: "ドイツ国（ヴァイマル共和国）", nativeName: "Weimarer Republik", currency: "レンテンマルク（Rentenmark）", currencyFamily: "germany", currencyKey: "germany-rentenmark", currencyOrder: 3, regimeLabel: "ヴァイマル共和国", flag: "/flags/weimar-1919.svg", flagAlt: "1919年から1933年のヴァイマル共和国旗", flagPeriod: "1919–1933", short: "ヴァイマル共和国", detail: "1923年11月、通貨安定のためレンテンマルクが導入されました。ライヒスマルク導入後も補助的に長く残りますが、ここでは新しい通貨単位が始まった転換点としてまとめています。" },
  { era: "1923", label: "1914–1923", period: "パピエルマルク", mapYear: 1923, featureNames: ["Germany (Prussia)"], country: "ヴァイマル共和国", officialName: "ドイツ国（ヴァイマル共和国）", nativeName: "Weimarer Republik", currency: "パピエルマルク（Papiermark）", pickerCurrency: "パピエルマルク／レンテンマルク", currencyFamily: "germany", currencyKey: "germany-papiermark", currencyOrder: 2, regimeLabel: "ドイツ帝国 → ヴァイマル共和国", flag: "/flags/weimar-1919.svg", flagAlt: "1919年から1933年のヴァイマル共和国旗", flagPeriod: "1919–1933", short: "ヴァイマル共和国", detail: "金兌換停止後のマルクは、後にパピエルマルクと呼ばれました。帝政末期からヴァイマル共和国のハイパーインフレーションまでを、同じ通貨単位の時期としてまとめています。" },
  { era: "1923", label: "1918–1924", period: "帝国クローネの後継国流通", mapYear: 1914, mapLegend: "1914年境界資料（帝国存続時）", featureNames: ["Austria-Hungary"], country: "オーストリア＝ハンガリー帝国", currency: "旧オーストリア＝ハンガリー・クローネ（後継国で移行中）", currencyFamily: "austria", currencyKey: "austria-hungary-krone", currencyOrder: 1, flag: "/flags/austria-hungary-1869.svg", flagAlt: "1869年から1918年のオーストリア＝ハンガリー民船旗", flagPeriod: "1869–1918 民船旗", short: "オーストリア＝ハンガリー帝国", detail: "帝国崩壊後も旧クローネ紙幣が後継国で流通した時代。地図は比較のため、帝国存続時の1914年版図を表示しています。" },
  { era: "1920", label: "1889–1942", period: "ミルレイス", mapYear: 1920, featureNames: ["Brazil"], country: "ブラジル", officialName: "ブラジル合衆国", currency: "ミルレイス", currencyFamily: "brazil", currencyKey: "brazil-milreis", currencyOrder: 1, flag: "/flags/brazil-1889.svg", flagAlt: "1889年から1960年の21星ブラジル国旗", flagPeriod: "1889–1960", short: "ブラジル", detail: "ブラジル第一共和政期を含め、クルゼイロ導入までミルレイス紙幣が流通した時代。" },
  { era: "1919", label: "1919–1925", period: "オーストリア・クローネ", mapYear: 1920, mapLegend: "1920年境界資料（収蔵紙幣は1919年再検印）", featureNames: ["Austria"], country: "オーストリア共和国", officialName: "ドイツ＝オーストリア共和国 → オーストリア共和国", currency: "オーストリア・クローネ", currencyFamily: "austria", currencyKey: "austria-republic-krone", currencyOrder: 2, flag: "/flags/austria.svg", flagAlt: "1918年以降のオーストリア国旗", flagPeriod: "1918–現在", short: "オーストリア", detail: "帝国紙幣へ『DEUTSCHÖSTERREICH』を再検印し、共和国のクローネとして流通させた移行期。" },
  { era: "1914", label: "1871–1914", period: "金マルク", mapYear: 1914, featureNames: ["Germany (Prussia)"], country: "ドイツ帝国", nativeName: "Deutsches Reich", currency: "金マルク（Goldmark）", currencyFamily: "germany", currencyKey: "germany-goldmark", currencyOrder: 1, regimeLabel: "ドイツ帝国", flag: "/flags/german-empire-1867.svg", flagAlt: "1867年から1918年のドイツ帝国旗", flagPeriod: "1867–1918", short: "ドイツ帝国", detail: "1871年の統一後に整えられた金本位制のマルク。第一次世界大戦で金兌換が停止されるまでを、ひとつの通貨期として表示しています。" },
  { era: "1948", label: "1948–2001", period: "ドイツ・マルク", eraPeriod: "戦後の通貨改革", mapYear: 1946, mapLegend: "1946年境界資料（1948年通貨改革）", featureNames: ["German Federal Republic"], country: "ドイツ連邦共和国", nativeName: "Bundesrepublik Deutschland", currency: "ドイツ・マルク（Deutsche Mark）", currencyFamily: "germany", currencyKey: "germany-deutsche-mark", currencyOrder: 6, regimeLabel: "西ドイツ → 統一ドイツ", flag: "/flags/weimar-1919.svg", flagAlt: "ドイツ連邦共和国旗", flagPeriod: "1949–現在", short: "西ドイツ", detail: "1948年の西側占領地域の通貨改革で導入され、1949年以後は西ドイツ、1990年以後は統一ドイツの通貨となりました。" },
  { era: "1948", label: "1948–1990", period: "東ドイツ・マルク", eraPeriod: "戦後の通貨改革", mapYear: 1946, mapLegend: "1946年境界資料（東側占領地域）", featureNames: ["German Democratic Republic"], country: "ドイツ民主共和国", nativeName: "Deutsche Demokratische Republik", currency: "東ドイツ・マルク（Mark der DDR）", currencyFamily: "germany", currencyKey: "germany-ddr-mark", currencyOrder: 7, regimeLabel: "東ドイツ", flag: "/flags/east-germany.svg", flagAlt: "ドイツ民主共和国旗", flagPeriod: "1959–1990", short: "東ドイツ", detail: "東側占領地域の通貨改革に始まり、ドイツ民主共和国で1990年の通貨統合まで使われたマルクです。" },
  { era: "2002", label: "2002–", period: "ユーロ", mapYear: 2018, mapLegend: "2018年境界資料（2002年現金流通開始）", featureNames: ["German Federal Republic"], country: "ドイツ連邦共和国（ユーロ）", nativeName: "Bundesrepublik Deutschland", currency: "ユーロ（Euro）", currencyFamily: "germany", currencyKey: "germany-euro", currencyOrder: 8, regimeLabel: "統一ドイツ", flag: "/flags/weimar-1919.svg", flagAlt: "ドイツ連邦共和国旗", flagPeriod: "1949–現在", short: "ドイツ", detail: "1999年に会計通貨として導入され、2002年からユーロ紙幣・硬貨の流通が始まりました。" },
  { era: "1914", label: "1914", period: "大戦の始まり", mapYear: 1914, featureNames: ["Denmark"], country: "デンマーク", officialName: "デンマーク王国", currency: "デンマーク・クローネ（1914年比較期）", currencyFamily: "denmark", currencyKey: "denmark-krone-1914", currencyOrder: 1, flag: "/flags/denmark.svg", flagAlt: "1914年当時のデンマーク国旗", flagPeriod: "1914年仕様", short: "デンマーク", detail: "北欧の王国でクローネ紙幣が使われていた比較用の時代。" },
  { era: "1936", label: "1936", period: "1936年法10クローネ", mapYear: 1940, mapLegend: "1940年境界資料（収蔵紙幣は1936年）", featureNames: ["Denmark"], country: "デンマーク", officialName: "デンマーク王国", currency: "デンマーク・クローネ（1936年券）", currencyFamily: "denmark", currencyKey: "denmark-krone-1936", currencyOrder: 2, flag: "/flags/denmark.svg", flagAlt: "1936年当時のデンマーク国旗", flagPeriod: "19世紀–現在", short: "デンマーク", detail: "金兌換文言を残した1936年法の10クローネ券が発行された時代。" },
  { era: "1972", label: "1972系列（1980年流通開始）", period: "20クローネ肖像・動物系列", mapYear: 1966, mapLegend: "1966年境界資料（1972年系列・1980年流通開始）", featureNames: ["Denmark"], country: "デンマーク", officialName: "デンマーク王国", currency: "デンマーク・クローネ（1972年系列）", currencyFamily: "denmark", currencyKey: "denmark-krone-1972", currencyOrder: 3, flag: "/flags/denmark.svg", flagAlt: "1972年当時のデンマーク国旗", flagPeriod: "19世紀–現在", short: "デンマーク", detail: "歴史的肖像と身近な動物を組み合わせた1972年系列の20クローネ券。収蔵券は1980年から流通した。" },
  { era: "1943", label: "1942–1945", period: "日本軍占領地ペソ", eraPeriod: "アジア太平洋戦争", mapYear: 1943, mapLegend: "1943年境界資料（占領・実効支配域ではありません）", mapBoundaryLabel: "フィリピンの外郭", mapControl: "日本軍占領下。1943年10月に第二共和国が成立", territoryMode: "outline-only", featureNames: ["Philippines"], country: "フィリピン", officialName: "日本軍占領下フィリピン", currency: "日本軍占領地ペソ", currencyFamily: "philippines", currencyKey: "philippines-japanese-occupation-peso", currencyOrder: 1, regimeLabel: "日本軍政 → 第二共和国", flagPeriod: "1942–1945", short: "フィリピン", detail: "日本軍が発行した軍票の時期。フィリピンの地理的・紙幣史的な系統として戦後の共和国へ接続しますが、金色線は占領軍の実効支配域ではなくフィリピンの外郭です。" },
  { era: "2018", label: "1946–現在", period: "共和国のフィリピン・ペソ", mapYear: 2018, mapLegend: "2018年境界資料（1946年独立後の系統）", featureNames: ["Philippines"], country: "フィリピン", officialName: "フィリピン共和国", currency: "フィリピン・ペソ", currencyFamily: "philippines", currencyKey: "philippines-republic-peso", currencyOrder: 2, regimeLabel: "フィリピン共和国", flagPeriod: "1946–現在", short: "フィリピン", detail: "日本占領期の軍票とは発行主体も通貨制度も異なりますが、同じ地域の紙幣史を比較する後続期として表示します。" },
  { era: "1885", label: "1885", period: "明治初期の日本銀行兌換銀券", mapYear: 1914, mapLegend: "1914年境界資料（収蔵紙幣は1885年）", featureNames: ["Japan"], country: "大日本帝国", currency: "円", currencyFamily: "japan", currencyKey: "japan-meiji-yen", currencyOrder: 1, regimeLabel: "大日本帝国・明治期", flag: "/flags/japan-1870.svg", flagAlt: "1870年布告仕様の日章旗", flagPeriod: "1870–1999", short: "明治日本", detail: "日本銀行が開業後初めて発行した兌換銀券の時期。利用できる最古の境界資料との差を注記して表示します。" },
  { era: "1943", label: "1938–1945", period: "戦時期の円", eraPeriod: "アジア太平洋戦争", mapYear: 1943, featureNames: ["Japan"], country: "大日本帝国", currency: "円", currencyFamily: "japan", currencyKey: "japan-wartime-yen", currencyOrder: 2, regimeLabel: "大日本帝国・戦時期", flag: "/flags/japan-1870.svg", flagAlt: "1870年布告仕様の日章旗", flagPeriod: "1870–1999", short: "戦時日本", detail: "日中戦争から敗戦前後に発行・流通した日本銀行券と政府紙幣の時期。占領地軍票はこの国内通貨系譜へ混ぜず、使用地域側の系譜で扱います。" },
  { era: "2018", label: "1946–2024年改刷前", period: "戦後・現代の円", mapYear: 2018, featureNames: ["Japan"], country: "日本", officialName: "日本国", currency: "円", currencyFamily: "japan", currencyKey: "japan-modern-yen", currencyOrder: 3, regimeLabel: "戦後日本", flag: "/flags/japan.svg", flagAlt: "日本国旗", flagPeriod: "1999–現在", short: "日本", detail: "戦後の日本で継続する円の通貨期。2024年7月3日のF号券発行を次の改刷期として分け、帝国期との制度的連続と国家体制の断絶も比較します。" },
  { era: "2024", label: "2024–現在", period: "F号券（新日本銀行券）", mapYear: 2018, mapLegend: "2018年境界資料（2024年改刷）", featureNames: ["Japan"], country: "日本", officialName: "日本国", currency: "円（F号券）", currencyFamily: "japan", currencyKey: "japan-f-series", currencyOrder: 4, regimeLabel: "現代日本・2024年改刷", flag: "/flags/japan.svg", flagAlt: "日本国旗", flagPeriod: "1999–現在", short: "日本", detail: "2024年7月3日に一万円・五千円・千円のF号券が発行された改刷期。渋沢栄一、津田梅子、北里柴三郎の肖像と3Dホログラムなど新しい偽造防止技術を採用しています。" },
  { era: "1936", label: "1935–1948", period: "南京国民政府の法幣", mapYear: 1940, mapLegend: "1940年境界資料（収蔵紙幣は1936年）", featureNames: ["China"], country: "中華民国", officialName: "中華民国（南京国民政府）", currency: "法幣（中華民国元）", currencyFamily: "republic-of-china", currencyKey: "roc-fabi", currencyOrder: 1, regimeLabel: "南京国民政府", flagPeriod: "1928–現在", short: "中華民国", detail: "1935年の幣制改革で主要銀行券を法定通貨へ統合した後の通貨期。収蔵品は中央銀行が1936年に発行した10元法幣です。" },
  { era: "1938", label: "1938–1940", period: "中国聯合準備銀行券", eraPeriod: "日中戦争下の中国", mapYear: 1940, mapLegend: "1940年境界資料（収蔵紙幣は1938年）", mapBoundaryLabel: "中華民国の外郭（支配域ではありません）", mapDescription: "1940年の世界境界。中華民国の外郭を表示し、維新政府の実効支配域としては塗っていません。", mapControl: "日本の影響下にあった中華民国維新政府の発券。中国全域を同政権の支配域としては表示しない", territoryMode: "outline-only", featureNames: ["China"], country: "中華民国", officialName: "中華民国維新政府", currency: "元（中国聯合準備銀行券）", currencyFamily: "republic-of-china", currencyKey: "roc-federal-reserve-bank-yuan", currencyOrder: 2, regimeLabel: "中華民国維新政府", short: "維新政府", detail: "日本の影響下で南京に置かれた維新政府の中国聯合準備銀行券。南京国民政府の法幣とは発行主体が異なり、地図の金色線は同政権の実効支配域ではなく中華民国の外郭です。" },
  { era: "1938", label: "1937–1944", period: "日本軍用円", eraPeriod: "日中戦争下の中国", mapYear: 1940, mapLegend: "1940年境界資料（収蔵紙幣は1937～1944年）", mapBoundaryLabel: "中華民国の外郭（占領域ではありません）", mapControl: "日本軍占領地域向け軍票。中国全域を日本の支配域としては表示しない", territoryMode: "outline-only", featureNames: ["China"], country: "中華民国", currency: "日本軍用円", currencyFamily: "republic-of-china", currencyKey: "roc-japanese-military-yen", currencyOrder: 3, regimeLabel: "日中戦争期の中華民国", flagPeriod: "1928–現在", short: "中華民国", detail: "日本軍占領地域向けの軍票。地図は当時の中華民国外郭であり、日本軍の占領・実効支配域を示すものではありません。" },
  { era: "1941", label: "1932–1945", period: "満洲国圓", mapYear: 1940, mapLegend: "1940年境界資料・満洲国概略境界（収蔵紙幣は1941年）", mapBoundaryLabel: "満洲国の概略境界", mapDescription: "1940年の世界境界に、満洲国の概略境界を独立した領域として重ねています。境界線は歴史地図の代替ではなく概略表示です。", mapControl: "日本の強い支配下に置かれた満洲国。概略境界を中華民国とは別の選択領域として表示", mapLabel: "満洲国（概略）", markerCoordinates: [125.3235, 43.8171], boundaryKey: "manchukuo", featureNames: [], country: "満洲国", officialName: "満洲国", currency: "満洲国圓", currencyFamily: "manchukuo", currencyKey: "manchukuo-yuan", currencyOrder: 1, regimeLabel: "満洲国", flag: "/flags/manchukuo-1932.svg", flagAlt: "1932年から1945年の満洲国旗", flagPeriod: "1932–1945", short: "満洲国", detail: "満洲中央銀行が発行した満洲国圓。日本円圏に組み込まれた戦時・植民地的通貨制度です。地図では満洲国の概略境界を中華民国の外郭から独立して選択できます。" },
  { era: "2018", label: "1949–現在", period: "台湾の新台湾ドル", mapYear: 2018, featureNames: ["Taiwan"], country: "中華民国", officialName: "中華民国（台湾）", currency: "新台湾ドル", currencyFamily: "republic-of-china", currencyKey: "roc-new-taiwan-dollar", currencyOrder: 4, regimeLabel: "台湾の中華民国政府", flagPeriod: "1928–現在", short: "台湾", detail: "日中戦争期の大陸で使われた軍票とは別制度です。中華民国をめぐる紙幣史の後続期として表示するもので、主権・法的地位への見解を示す分類ではありません。" },
  { era: "1943", label: "1942–1945", period: "日本軍占領地ルピー", eraPeriod: "アジア太平洋戦争", mapYear: 1943, mapLegend: "1943年境界資料（占領・実効支配域ではありません）", mapBoundaryLabel: "ビルマの外郭", territoryMode: "outline-only", featureNames: ["Myanmar (Burma)"], country: "ミャンマー", officialName: "日本軍占領下ビルマ", currency: "日本軍占領地ルピー", currencyFamily: "myanmar", currencyKey: "myanmar-japanese-occupation-rupee", currencyOrder: 1, regimeLabel: "日本軍政 → ビルマ国", flagPeriod: "1942–1945", short: "ミャンマー", detail: "日本軍占領地ルピーが流通したビルマの戦時期。現在のミャンマーへ続く地域の紙幣史として扱い、外郭を占領軍の実効支配域とはみなしません。" },
  { era: "2018", label: "1948–現在", period: "独立後のチャット", mapYear: 2018, featureNames: ["Myanmar (Burma)"], country: "ミャンマー", officialName: "ミャンマー連邦共和国", currency: "チャット", currencyFamily: "myanmar", currencyKey: "myanmar-kyat", currencyOrder: 2, regimeLabel: "独立後のビルマ／ミャンマー", flagPeriod: "1948–現在", short: "ミャンマー", detail: "占領地軍票とは別制度の独立後通貨。地域の紙幣史を比較する後続期として系譜に含めます。" },
  { era: "1943", label: "1942–1945", period: "日本軍占領地ドル", eraPeriod: "アジア太平洋戦争", mapYear: 1943, mapLegend: "1943年境界資料（マラヤ諸地域の外郭）", mapBoundaryLabel: "マラヤ諸地域の外郭", territoryMode: "outline-only", featureNames: ["Federated Malay States", "Unfederated Malay States"], country: "マレーシア", officialName: "日本軍占領下マラヤ", currency: "日本軍占領地ドル", currencyFamily: "malaysia", currencyKey: "malaya-japanese-occupation-dollar", currencyOrder: 1, regimeLabel: "日本軍政下マラヤ", flagPeriod: "1942–1945", short: "マラヤ", detail: "軍票の通用圏は現在のマレーシアだけでなくシンガポールや北ボルネオ等を含みました。地図は資料にあるマラヤ諸地域の外郭であり、通用圏全体や実効支配域の厳密な復元ではありません。" },
  { era: "2018", label: "1967–現在", period: "マレーシア・リンギット", mapYear: 2018, featureNames: ["Malaysia"], country: "マレーシア", officialName: "マレーシア", currency: "リンギット", currencyFamily: "malaysia", currencyKey: "malaysia-ringgit", currencyOrder: 2, regimeLabel: "マレーシア", flagPeriod: "1963–現在", short: "マレーシア", detail: "占領地ドルの通用圏と現在の国境は一致しません。重なる地域の紙幣史をたどる後続期として表示します。" },
  { era: "1951", label: "1951", period: "人民共和国初期の第2レフ", mapYear: 1947, mapLegend: "1947年境界資料（収蔵紙幣は1951年）", featureNames: ["Bulgaria"], country: "ブルガリア", officialName: "ブルガリア人民共和国", currency: "第2レフ", flagPeriod: "1946–1967", short: "ブルガリア", detail: "社会主義体制初期の通貨改革後に発行された第2レフ紙幣の時期。" },
  { era: "1981", label: "1981", period: "社会主義ユーゴスラビア・ディナール", mapYear: 1983, mapLegend: "1983年境界資料（収蔵紙幣は1981年）", featureNames: ["Yugoslavia"], country: "ユーゴスラビア社会主義連邦共和国", currency: "ユーゴスラビア・ディナール", currencyFamily: "yugoslavia", currencyKey: "yugoslavia-sfr-dinar", currencyOrder: 1, regimeLabel: "社会主義連邦共和国", flag: "/flags/yugoslavia-1946.svg", flagAlt: "1946年から1992年のユーゴスラビア社会主義連邦共和国旗", flagPeriod: "1946–1992", short: "ユーゴスラビア", detail: "六共和国からなる社会主義連邦のディナール。1990年代の国家再編と通貨混乱へ続く前段として表示します。" },
  { era: "1988", label: "1988", period: "人民共和国末期の第3ズウォティ", mapYear: 1987, mapLegend: "1987年境界資料（収蔵紙幣は1988年）", featureNames: ["Poland"], country: "ポーランド", officialName: "ポーランド人民共和国", currency: "第3ズウォティ", flagPeriod: "1980–1990", short: "ポーランド", detail: "社会主義体制末期に流通した旧ズウォティ紙幣の時期。" },
  { era: "1991", label: "1991", period: "旧レウ末期", mapYear: 1993, mapLegend: "1993年境界資料（収蔵紙幣は1991年）", featureNames: ["Rumania"], country: "ルーマニア", officialName: "ルーマニア", currency: "旧レウ", currencyFamily: "romania", currencyKey: "romania-old-leu", currencyOrder: 1, regimeLabel: "体制転換後のルーマニア", flagPeriod: "1989–現在", short: "ルーマニア", detail: "社会主義政権崩壊後、デノミネーション前の旧レウが流通した時期。" },
  { era: "2005", label: "2005–現在", period: "新レウ", mapYear: 2018, mapLegend: "2018年境界資料（2005年デノミネーション）", featureNames: ["Rumania"], country: "ルーマニア", officialName: "ルーマニア", currency: "新レウ", currencyFamily: "romania", currencyKey: "romania-new-leu", currencyOrder: 2, regimeLabel: "現代ルーマニア", flagPeriod: "1989–現在", short: "ルーマニア", detail: "2005年に1万旧レウを1新レウとしたデノミネーション後の通貨期。" },
  { era: "1992", label: "1992", period: "独立後のクーポン／フリヴニャ", mapYear: 1993, mapLegend: "1993年境界資料（収蔵紙幣は1992年）", featureNames: ["Ukraine"], country: "ウクライナ", officialName: "ウクライナ", currency: "フリヴニャ（1992年銘）", flagPeriod: "1992–現在", short: "ウクライナ", detail: "ソ連解体後、独自通貨制度を整えていった独立初期の紙幣。" },
  { era: "1992", label: "1992–1999", period: "旧ベラルーシ・ルーブル", mapYear: 1993, mapLegend: "1993年境界資料（1992年発行）", featureNames: ["Belarus (Byelorussia)"], country: "ベラルーシ", officialName: "ベラルーシ共和国", currency: "旧ベラルーシ・ルーブル", currencyFamily: "belarus", currencyKey: "belarus-first-ruble", currencyOrder: 1, regimeLabel: "独立初期のベラルーシ", flagPeriod: "1991–1995", short: "ベラルーシ", detail: "ソ連解体後に導入された最初のベラルーシ・ルーブル紙幣の時期。" },
  { era: "2000", label: "2000–2016", period: "第2ベラルーシ・ルーブル", mapYear: 2018, mapLegend: "2018年境界資料（2000年デノミネーション）", featureNames: ["Belarus (Byelorussia)"], country: "ベラルーシ", officialName: "ベラルーシ共和国", currency: "第2ベラルーシ・ルーブル", currencyFamily: "belarus", currencyKey: "belarus-second-ruble", currencyOrder: 2, regimeLabel: "ベラルーシ共和国", flagPeriod: "1995–2012", short: "ベラルーシ", detail: "2000年のデノミネーションで導入され、2016年の再デノミネーションまで使われた通貨期。" },
  { era: "1981", label: "1981–1992", period: "社会主義期トゥグルグ", mapYear: 1983, mapLegend: "1983年境界資料（収蔵紙幣は1981年）", featureNames: ["Mongolia"], country: "モンゴル", officialName: "モンゴル人民共和国", currency: "トゥグルグ", currencyFamily: "mongolia", currencyKey: "mongolia-socialist-tugrik", currencyOrder: 1, regimeLabel: "モンゴル人民共和国", flagPeriod: "1945–1992", short: "モンゴル", detail: "社会主義体制下でスフバートルと国家図像を用いたトゥグルグ紙幣の時期。" },
  { era: "1993", label: "1993–現在", period: "民主化後トゥグルグ", mapYear: 1993, featureNames: ["Mongolia"], country: "モンゴル", officialName: "モンゴル国", currency: "トゥグルグ", currencyFamily: "mongolia", currencyKey: "mongolia-democratic-tugrik", currencyOrder: 2, regimeLabel: "モンゴル国", flagPeriod: "1992–現在", short: "モンゴル", detail: "1992年憲法後、新国章と伝統文化を反映した紙幣系列。通貨名は継続しつつ国家体制の転換を示します。" },
  { era: "1975", label: "1975–1992", period: "英領香港ドル", mapYear: 1983, mapLegend: "1983年境界資料・香港位置表示", mapBoundaryLabel: "香港の位置（境界未収録）", featureNames: [], focusCoordinates: [114.17, 22.32], country: "香港", officialName: "英領香港", currency: "香港ドル", currencyFamily: "hong-kong", currencyKey: "hong-kong-colonial-dollar", currencyOrder: 1, regimeLabel: "イギリス統治下香港", flagPeriod: "1959–1997", short: "香港", detail: "複数の発券銀行が香港ドルを発行したイギリス統治期。基礎地図に香港の個別境界がないため位置のみを示します。" },
  { era: "2018", label: "1997–現在", period: "香港特別行政区の香港ドル", mapYear: 2018, mapLegend: "2018年境界資料・香港位置表示", mapBoundaryLabel: "香港の位置（境界未収録）", featureNames: [], focusCoordinates: [114.17, 22.32], country: "香港", officialName: "香港特別行政区", currency: "香港ドル", currencyFamily: "hong-kong", currencyKey: "hong-kong-sar-dollar", currencyOrder: 2, regimeLabel: "香港特別行政区", flagPeriod: "1997–現在", short: "香港", detail: "主権移管後も香港ドルと複数発券銀行の制度が続く時期。英領期との制度的連続を紙幣史の系譜として表示します。" },
  { era: "2018", label: "2009–現在", period: "第3ウォン", mapYear: 2018, featureNames: ["Korea, People's Republic of"], country: "朝鮮民主主義人民共和国", currency: "第3ウォン", flagPeriod: "1948–現在", short: "北朝鮮", detail: "2009年のデノミネーション後の通貨期。収蔵品には2017～2019年の記念加刷券を含みます。" },
  { era: "2010", label: "1993–現在", period: "モルドバ・レウ", mapYear: 2018, mapLegend: "2018年境界資料（収蔵紙幣は2010年）", featureNames: ["Moldova"], country: "モルドバ", officialName: "モルドバ共和国", currency: "モルドバ・レウ", flagPeriod: "1990–現在", short: "モルドバ", detail: "独立後に導入されたモルドバ・レウの通貨期。" },
  { era: "2010", label: "1966–現在", period: "ケニア・シリング", mapYear: 2018, mapLegend: "2018年境界資料（収蔵紙幣は2010年）", featureNames: ["Kenya"], country: "ケニア", officialName: "ケニア共和国", currency: "ケニア・シリング", flag: "/flags/kenya.svg", flagAlt: "ケニア共和国国旗", flagPeriod: "1963–現在", short: "ケニア", detail: "独立後のケニアで、1966年に導入されたケニア・シリングが流通する通貨期。収蔵品は2010年銘です。" },
  { era: "2010", label: "1931–現在", period: "ホンジュラス・レンピラ", mapYear: 2018, mapLegend: "2018年境界資料（収蔵紙幣は2010年）", featureNames: ["Honduras"], country: "ホンジュラス", officialName: "ホンジュラス共和国", currency: "レンピラ", flagPeriod: "1949–現在", short: "ホンジュラス", detail: "1931年に導入されたレンピラの通貨期。収蔵品は2010年5月6日付の1レンピラ券です。" },
  { era: "1961", label: "1961–1991", period: "ソビエト・ルーブル", mapYear: 1965, mapLegend: "1965年境界資料（収蔵紙幣は1961年）", featureNames: ["Russia (Soviet Union)"], country: "ソビエト連邦", officialName: "ソビエト社会主義共和国連邦", currency: "ソビエト・ルーブル", flag: "/flags/soviet-union.svg", flagAlt: "ソビエト連邦国旗", flagPeriod: "1955–1991", short: "ソ連", detail: "1961年通貨改革後のルーブル券。1・3・5ルーブルを同じ通貨期にまとめています。" },
  { era: "1994", label: "1994", period: "沿ドニエストル・ルーブル", mapYear: 1993, mapLegend: "1993年境界資料・ティラスポリ位置表示（収蔵紙幣は1994年）", mapBoundaryLabel: "モルドバ外郭・沿ドニエストル位置", territoryMode: "outline-only", featureNames: ["Moldova"], markerCoordinates: [29.638, 46.84], country: "沿ドニエストル", officialName: "沿ドニエストル・モルドバ共和国（未承認）", currency: "沿ドニエストル・ルーブル", flag: "/flags/transnistria.svg", flagAlt: "沿ドニエストルの旗", flagPeriod: "2000–現在", short: "沿ドニエストル", detail: "国際的承認を受けない沿ドニエストル当局が発行する地域通貨。地図はモルドバ外郭とティラスポリの位置を示します。" },
  { era: "1991", label: "1991", period: "ソマリア・シリング", mapYear: 1993, mapLegend: "1993年境界資料（収蔵紙幣は1991年）", featureNames: ["Somalia"], country: "ソマリア", officialName: "ソマリア民主共和国末期", currency: "ソマリア・シリング", flagPeriod: "1954–現在", short: "ソマリア", detail: "中央政府崩壊と内戦開始の転換期にあたる1991年銘の50シリング券。" },
  { era: "2011", label: "2011", period: "ブルンジ・フラン", mapYear: 2018, mapLegend: "2018年境界資料（収蔵紙幣は2011年）", featureNames: ["Burundi"], country: "ブルンジ", officialName: "ブルンジ共和国", currency: "ブルンジ・フラン", flagPeriod: "1982–現在", short: "ブルンジ", detail: "ブルンジ共和国銀行が発行した2011年11月1日付の100フラン券。" },
  { era: "2012", label: "2012", period: "アンゴラ・クワンザ", mapYear: 2018, mapLegend: "2018年境界資料（収蔵紙幣は2012年）", featureNames: ["Angola"], country: "アンゴラ", officialName: "アンゴラ共和国", currency: "クワンザ", flagPeriod: "1975–現在", short: "アンゴラ", detail: "アンゴラ国立銀行の2012年シリーズ。5・10クワンザを収蔵しています。" },
  { era: "1990", label: "1990–1997", period: "ギニアビサウ・ペソ", mapYear: 1993, mapLegend: "1993年境界資料（収蔵紙幣は1990年）", featureNames: ["Guinea-Bissau"], country: "ギニアビサウ", officialName: "ギニアビサウ共和国", currency: "ペソ", flagPeriod: "1973–現在", short: "ギニアビサウ", detail: "西アフリカCFAフラン採用前の旧通貨ペソ。50・100ペソを収蔵しています。" },
  { era: "1997", label: "1997–現在", period: "エリトリア・ナクファ", mapYear: 1993, mapLegend: "1993年境界資料（収蔵紙幣は1997年）", featureNames: ["Eritrea"], country: "エリトリア", officialName: "エリトリア国", currency: "ナクファ", flagPeriod: "1995–現在", short: "エリトリア", detail: "独立後の1997年に導入されたナクファ。収蔵品は導入時の10ナクファ券です。" },
  { era: "1994", label: "1994–1999", period: "ルーブル／ディラム移行期", mapYear: 1993, mapLegend: "1993年境界資料（収蔵紙幣は1994・1999年）", featureNames: ["Tajikistan"], country: "タジキスタン", officialName: "タジキスタン共和国", currency: "タジク・ルーブル／ディラム", flagPeriod: "1992–現在", short: "タジキスタン", detail: "独立後のタジク・ルーブルと、ソモニ制度へ移る1999年銘ディラムをまとめた通貨移行期。" },
  { era: "2017", label: "2017", period: "記念1マナト", mapYear: 2018, mapLegend: "2018年境界資料（収蔵紙幣は2017年）", featureNames: ["Turkmenistan"], country: "トルクメニスタン", officialName: "トルクメニスタン", currency: "マナト", flagPeriod: "2001–現在", short: "トルクメニスタン", detail: "2017年アジア室内・武道競技大会を記念した1マナト券。" },
  { era: "1986", label: "1986", period: "Birds of Canada", mapYear: 1986, featureNames: ["Canada"], country: "カナダ", officialName: "カナダ", currency: "カナダ・ドル", flagPeriod: "1965–現在", short: "カナダ", detail: "Birds of Canadaシリーズの1986年銘5ドル券。" }
];

const atlasCollectionScopes = new Map([
  ["venezuela-sovereign-bolivar", ["ve-2-2018", "ve-5-2018"]],
  ["venezuela-strong-bolivar", ["ve-20-2014", "ve-50-2018", "ve-2000-2016"]],
  ["チリ\u00001994\u0000チリ・ペソ", ["cl-1000-1994"]],
  ["yugoslavia-federal-dinar", ["sheet-yu-1993"]],
  ["ペルー\u00001987\u0000ペルー・インティ", ["pe-500-1987", "pe-10-1985", "pe-50-1986"]],
  ["brazil-new-cruzado", ["br-100-1989"]],
  ["austria-schilling", ["at-50-1986"]],
  ["フィンランド共和国\u00001986\u0000フィンランド・マルッカ", ["sheet-fi-10-1986"]],
  ["brazil-cruzeiro-1970", ["br-10-1974"]],
  ["argentina-peso-ley", ["ar-5-1974", "ar-5000-1977"]],
  ["argentina-peso-argentino", ["ar-10-1983-peso-argentino"]],
  ["argentina-austral", ["ar-1-1985", "ar-5-1985", "ar-10-1985"]],
  ["argentina-convertible-peso", ["ar-10-1992"]],
  ["turkey-e7-lira", ["sheet-tr-100-1983"]],
  ["turkey-e6-lira", ["sheet-tr-500"]],
  ["france-franc-1966", ["sheet-fr-10-1966", "sheet-fr-5-1966"]],
  ["france-new-franc-1965", ["sheet-fr-5-1965"]],
  ["france-franc-1946", []],
  ["ザール保護領\u00001947\u0000ザールマルク", ["sheet-saar-5-1947"]],
  ["ハンガリー\u00001946\u0000ペンゲー → フォリント（1946年8月1日）", ["sheet-hu-1946", "hu-10000b-1946"]],
  ["france-franc-1943", ["sheet-fr-5-1943"]],
  ["brazil-cruzeiro-1942", ["br-5-1964"]],
  ["germany-reichsmark", []],
  ["germany-reichskreditkassenschein", ["de-1-1940"]],
  ["germany-rentenmark", []],
  ["germany-papiermark", ["de-2-1914", "de-50-1920", "de-1000-1922", "de-10000-1922", "de-20000-1923", "de-100000-1923", "de-2000000-1923", "de-5000000-1923", "de-10000000-1923", "de-20000000-1923", "de-50000000-1923", "de-100000000-1923", "de-500000000-1923", "de-1000000000-1923", "de-buer-1000000000-1923"]],
  ["austria-hungary-krone", ["at-1000-1922"]],
  ["brazil-milreis", []],
  ["austria-republic-krone", ["at-50-1919"]],
  ["germany-goldmark", ["de-50-1906"]],
  ["germany-deutsche-mark", []], ["germany-ddr-mark", []], ["germany-euro", []],
  ["denmark-krone-1914", []],
  ["denmark-krone-1936", ["sheet-dk-10-1936"]],
  ["denmark-krone-1972", ["sheet-dk-20-1972"]],
  ["philippines-japanese-occupation-peso", ["ph-1-1943", "ph-5-1943", "ph-10-1943", "ph-100-1944"]],
  ["philippines-republic-peso", []],
  ["japan-meiji-yen", ["jp-1-1885"]],
  ["japan-wartime-yen", ["jp-1-1943", "jp-5sen-1944", "jp-10sen-1944", "jp-50sen-1938", "jp-50sen-1945", "jp-50sen-1943", "jp-50sen-1944"]],
  ["japan-modern-yen", ["jp-50sen-1948"]],
  ["japan-f-series", ["jp-10000-2024", "jp-5000-2024", "jp-1000-2024"]],
  ["roc-fabi", ["cn-10-1936"]],
  ["roc-federal-reserve-bank-yuan", ["cn-frbc-1fen-1938", "cn-frbc-5fen-1938", "cn-frbc-10fen-1938"]],
  ["roc-japanese-military-yen", ["cn-50sen-1937", "cn-50sen-1939", "cn-5-military-1938", "cn-10-military-1938"]],
  ["manchukuo-yuan", ["manchukuo-50fen-1941"]],
  ["roc-new-taiwan-dollar", []],
  ["myanmar-japanese-occupation-rupee", ["mm-1-1942", "mm-10-occupation", "mm-100-1944"]],
  ["myanmar-kyat", []],
  ["malaya-japanese-occupation-dollar", ["my-1-occupation", "my-5-occupation", "my-10-occupation"]],
  ["malaysia-ringgit", []],
  ["ブルガリア\u00001951\u0000第2レフ", ["bg-25-1951", "bg-200-1951"]],
  ["yugoslavia-sfr-dinar", ["yu-10-1981", "yu-20-1981", "yu-50-1981"]],
  ["ポーランド\u00001988\u0000第3ズウォティ", ["pl-50-1988", "pl-100-1988"]],
  ["romania-old-leu", ["ro-500-1991"]], ["romania-new-leu", ["ro-1-2005"]],
  ["ウクライナ\u00001992\u0000フリヴニャ（1992年銘）", ["ua-1-1992", "ua-2-1992"]],
  ["belarus-first-ruble", ["by-100-1992"]],
  ["belarus-second-ruble", ["by-50-2000", "by-100-2000", "by-500-2000", "by-1000-2000"]],
  ["mongolia-socialist-tugrik", ["mn-10-1981", "mn-20-1981", "mn-50-1981"]],
  ["mongolia-democratic-tugrik", ["mn-010-1993", "mn-020-1993", "mn-1-1993", "mn-5-1993", "mn-10-1993", "mn-20-1993"]],
  ["hong-kong-colonial-dollar", ["hk-5-1975", "hk-10-1992"]],
  ["hong-kong-sar-dollar", []],
  ["朝鮮民主主義人民共和国\u00002018\u0000第3ウォン", ["kp-50-2018-commemorative", "kp-200-2018-commemorative", "kp-500-2018-commemorative", "kp-1000-2018-commemorative", "kp-2000-2018-commemorative", "kp-5000-2017-kim-jong-suk", "kp-5000-2019-china-relations"]],
  ["モルドバ\u00002010\u0000モルドバ・レウ", ["md-1-2010"]],
  ["ケニア\u00002010\u0000ケニア・シリング", ["ke-50-2010"]]
  ,["ホンジュラス\u00002010\u0000レンピラ", ["hn-1-2010"]]
  ,["ソビエト連邦\u00001961\u0000ソビエト・ルーブル", ["su-1-1961", "su-3-1961", "su-5-1961"]]
  ,["沿ドニエストル\u00001994\u0000沿ドニエストル・ルーブル", ["pmr-1-1994", "pmr-5-1994", "pmr-10-1994"]]
  ,["ソマリア\u00001991\u0000ソマリア・シリング", ["so-50-1991"]]
  ,["ブルンジ\u00002011\u0000ブルンジ・フラン", ["bi-100-2011"]]
  ,["アンゴラ\u00002012\u0000クワンザ", ["ao-5-2012", "ao-10-2012"]]
  ,["ギニアビサウ\u00001990\u0000ペソ", ["gw-50-1990", "gw-100-1990"]]
  ,["エリトリア\u00001997\u0000ナクファ", ["er-10-1997"]]
  ,["タジキスタン\u00001994\u0000タジク・ルーブル／ディラム", ["tj-1-1994", "tj-10-1994", "tj-100-1994", "tj-5diram-1999"]]
  ,["トルクメニスタン\u00002017\u0000マナト", ["tm-1-2017"]]
  ,["カナダ\u00001986\u0000カナダ・ドル", ["ca-5-1986"]]
]);
const atlasRegionOverrides = new Map([
  ["オーストリア共和国", "中央ヨーロッパ"],
  ["オーストリア＝ハンガリー帝国", "中央ヨーロッパ"],
  ["ドイツ帝国", "中央ヨーロッパ"],
  ["ヴァイマル共和国", "中央ヨーロッパ"],
  ["ナチス・ドイツ", "中央ヨーロッパ"],
  ["ドイツ民主共和国", "中央ヨーロッパ"],
  ["ドイツ連邦共和国", "中央ヨーロッパ"],
  ["ドイツ連邦共和国（ユーロ）", "中央ヨーロッパ"],
  ["フィンランド共和国", "北ヨーロッパ"],
  ["フランス共和国", "西ヨーロッパ"],
  ["トルコ共和国", "中東アジア"],
  ["ブルガリア", "バルカン半島"],
  ["ユーゴスラビア社会主義連邦共和国", "バルカン半島"],
  ["ユーゴスラビア連邦共和国", "バルカン半島"],
  ["ポーランド", "東ヨーロッパ"],
  ["ルーマニア", "東ヨーロッパ"],
  ["ベラルーシ", "東ヨーロッパ"],
  ["モルドバ", "東ヨーロッパ"],
  ["ウクライナ", "東ヨーロッパ"],
  ["モンゴル", "東アジア"],
  ["香港", "東アジア"],
  ["朝鮮民主主義人民共和国", "東アジア"]
]);
const atlasRegionViews = new Map([
  ["北アメリカ", [-168, 12, -52, 74]],
  ["中央アメリカ", [-118, 6, -59, 33]],
  ["南アメリカ", [-82, -56, -34, 14]],
  ["オセアニア", [108, -49, 180, 3]],
  ["東アジア", [94, 14, 151, 55]],
  ["東南アジア", [89, -12, 145, 30]],
  ["中央アジア", [45, 29, 91, 56]],
  ["中東アジア", [24, 12, 61, 43]],
  ["北ヨーロッパ", [-13, 53, 33, 72]],
  ["西ヨーロッパ", [-12, 41, 13, 60]],
  ["中央ヨーロッパ", [3, 43, 25, 57]],
  ["東ヨーロッパ", [19, 39, 61, 72]],
  ["イベリア半島", [-11, 35, 5, 45]],
  ["バルカン半島", [12, 34, 31, 48]],
  ["ロシア構成国", [19, 40, 180, 82]],
  ["アフリカ", [-20, -36, 55, 38]]
]);
const atlasTimelineEras = new Set(["1885", "1914", "1919", "1920", "1923", "1936", "1938", "1940", "1941", "1943", "1946", "1947", "1948", "1951", "1961", "1964", "1965", "1966", "1970", "1972", "1974", "1975", "1981", "1983", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1997", "2000", "2002", "2005", "2010", "2011", "2012", "2014", "2017", "2018", "2024"]);
const historicalMapCache = new Map();
const historicalBoundaryFeatures = new Map([
  ["manchukuo", {
    type: "Feature",
    properties: { NAME: "Manchukuo (approximate)", BORDERPRECISION: 1 },
    geometry: { type: "Polygon", coordinates: [[[119.2, 41.2], [120.3, 40.3], [122.1, 39.8], [124, 40.2], [126, 40], [128, 41.4], [130.6, 42.3], [131.1, 43.4], [131.5, 44.9], [134.8, 48], [132, 48.9], [130.8, 51], [125.8, 53], [120.2, 52], [117.5, 47], [119, 44], [119.2, 41.2]]] }
  }]
]);
let historicalMapRequest = 0;
let historicalMapExitPromise = null;
const historicalMapExitDuration = 560;
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

async function refreshPublishedCommit() {
  try {
    const response = await fetch("https://api.github.com/repos/Rune-markar/folio-7c4e19a2/commits/main", {
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(2500)
    });
    if (!response.ok) return;
    const { sha } = await response.json();
    if (/^[0-9a-f]{40}$/i.test(sha)) $("#appCommit").textContent = sha.slice(0, 7);
  } catch {
    // Keep the embedded snapshot commit when GitHub is unavailable.
  }
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
  $$(".view").forEach((element) => {
    const active = element.dataset.view === view;
    element.classList.toggle("is-active", active);
    if (active) {
      const footer = $(".app-footer");
      if (footer) element.append(footer);
    }
  });
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

function atlasCountryCurrencyName(entry) {
  if (!entry) return "";
  const currencyName = entry.country === "ヴァイマル共和国" ? entry.period : (entry.pickerCurrency || entry.currency);
  const countryName = entry.country === "ドイツ連邦共和国（ユーロ）" ? "ドイツ連邦共和国" : entry.country;
  return `${countryName}（${currencyName}）`;
}

function atlasPickerKey(entry) {
  return entry.currencyKey || `${entry.country}\u0000${entry.currency}`;
}

function atlasScopeKey(entry) {
  return entry.currencyKey || `${entry.country}\u0000${entry.era}\u0000${entry.currency}`;
}

function atlasCollectionItems(entry) {
  const ids = new Set(atlasCollectionScopes.get(atlasScopeKey(entry)) || []);
  return appState.database.items.filter((item) => ids.has(item.id));
}

function atlasCollectionCount(entry) {
  return atlasCollectionItems(entry).length;
}

const atlasFlagSymbolByCountry = new Map([
  ["フィリピン", "ph"], ["日本", "jp"], ["中華民国", "tw"], ["ミャンマー", "mm"],
  ["マレーシア", "my"], ["ブルガリア", "bg"], ["ポーランド", "pl"], ["ルーマニア", "ro"],
  ["ウクライナ", "ua"], ["ベラルーシ", "by"], ["モンゴル", "mn"], ["香港", "hk"],
  ["朝鮮民主主義人民共和国", "kp"], ["モルドバ", "md"], ["デンマーク", "dk"],
  ["ホンジュラス", "hn"], ["ソマリア", "so"], ["ブルンジ", "bi"], ["アンゴラ", "ao"],
  ["ギニアビサウ", "gw"], ["エリトリア", "er"], ["タジキスタン", "tj"], ["トルクメニスタン", "tm"], ["カナダ", "ca"]
]);

function atlasFlagMarkup(entry) {
  if (entry.flag) return `<img src="${entry.flag.replace(/^\//, "")}" alt="${escapeHtml(entry.flagAlt || `${atlasCountryName(entry)}の旗`)}">`;
  const symbol = atlasFlagSymbolByCountry.get(entry.country);
  if (symbol) return `<svg class="country-flag-svg" viewBox="0 0 60 40" role="img" aria-label="${escapeHtml(entry.flagAlt || `${atlasCountryName(entry)}の旗`)}"><use href="flags/country-flags.svg#flag-${symbol}"></use></svg>`;
  return `<span class="country-flag-label" aria-label="${escapeHtml(`${atlasCountryName(entry)}の旗資料を確認中`)}">${escapeHtml(entry.short || entry.country).slice(0, 3)}</span>`;
}

function atlasRegion(entry) {
  if (!entry) return "";
  const indexedRegion = appState.database.collectionIndex?.find((item) => item.country === entry.country)?.region;
  const collectedRegion = appState.database.items.find((item) => item.country === entry.country)?.region;
  return atlasRegionOverrides.get(entry.country) || indexedRegion || collectedRegion || "その他";
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
  const familyName = entry.short || atlasCountryName(entry);
  list.setAttribute("aria-label", `${familyName}の紙幣・通貨期`);
  chronology.hidden = false;
  list.innerHTML = entries.map((item) => {
    const active = item.currencyKey === entry.currencyKey;
    return `<button type="button" role="option" aria-selected="${active}" class="currency-era${active ? " is-active" : ""}" data-atlas-currency="${escapeHtml(item.currencyKey)}">
      <i aria-hidden="true"></i><span class="currency-era-years">${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.period)}</strong><small>${escapeHtml(item.regimeLabel || atlasCountryName(item))}</small>
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
  const eraEntries = historicalAtlas.filter((entry) => entry.era === appState.atlasEra);
  const regions = Array.from(new Set(eraEntries.map(atlasRegion)));
  if (appState.atlasRegion && !regions.includes(appState.atlasRegion)) {
    appState.atlasRegion = "";
    appState.atlasCountry = "";
    appState.atlasCurrency = "";
  }
  $("#regionSymbols").innerHTML = regions.map((region) => {
    const countryCount = new Set(eraEntries.filter((entry) => atlasRegion(entry) === region).map(atlasPickerKey)).size;
    const active = region === appState.atlasRegion;
    return `<button type="button" role="option" aria-selected="${active}" class="region-symbol${active ? " is-active" : ""}" data-atlas-region="${escapeHtml(region)}"><strong>${escapeHtml(region)}</strong><small>${countryCount}件の国名・通貨</small></button>`;
  }).join("");
  const countries = Array.from(new Map(eraEntries
    .filter((entry) => atlasRegion(entry) === appState.atlasRegion)
    .map((entry) => [atlasPickerKey(entry), entry])).values());
  $("#countrySymbols").innerHTML = appState.atlasRegion ? countries.map((entry) => {
    const count = atlasCollectionCount(entry);
    const active = entry.currencyKey ? entry.currencyKey === appState.atlasCurrency : entry.country === appState.atlasCountry;
    const displayName = atlasCountryCurrencyName(entry);
    const wideName = displayName.length > 12;
    const entryIndex = historicalAtlas.indexOf(entry);
    return `<button type="button" role="option" aria-selected="${active}" class="country-symbol${wideName ? " has-wide-name" : ""}${active ? " is-active" : ""}" data-atlas-entry-index="${entryIndex}"><span class="country-flag">${atlasFlagMarkup(entry)}</span><span><strong>${escapeHtml(displayName)}</strong><small>${escapeHtml(entry.flagPeriod)} · ${count}件収蔵</small></span></button>`;
  }).join("") : `<span class="picker-guidance">先に地域を選択してください</span>`;
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

function regionGeometry(bounds) {
  const [west, south, east, north] = bounds;
  const segments = 12;
  const interpolate = (start, end, index) => start + (end - start) * index / segments;
  const ring = [];
  for (let index = 0; index <= segments; index += 1) ring.push([interpolate(west, east, index), north]);
  for (let index = 1; index <= segments; index += 1) ring.push([east, interpolate(north, south, index)]);
  for (let index = 1; index <= segments; index += 1) ring.push([interpolate(east, west, index), south]);
  for (let index = 1; index <= segments; index += 1) ring.push([west, interpolate(south, north, index)]);
  return { type: "Polygon", coordinates: [ring] };
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

function retireHistoricalHighlight() {
  const groups = [$("#historicalBorderData"), $("#historicalRegionData")];
  if (!groups.some((group) => group.childElementCount) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return Promise.resolve();
  }
  if (historicalMapExitPromise) return historicalMapExitPromise;
  groups.forEach((group) => group.classList.add("is-burning-out"));
  $("#historicalLabel").classList.remove("is-visible");
  $("#mapDataStatus").textContent = "境界を切替中";
  historicalMapExitPromise = new Promise((resolve) => {
    window.setTimeout(resolve, historicalMapExitDuration);
  }).finally(() => {
    historicalMapExitPromise = null;
  });
  return historicalMapExitPromise;
}

function mapHighlightPath(feature, className, index) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", geometryPath(feature.geometry));
  path.setAttribute("fill-rule", "evenodd");
  path.setAttribute("class", className);
  path.style.setProperty("--map-entry-delay", `${Math.min(index, 5) * 35}ms`);
  return path;
}

async function renderAtlasMap() {
  const entry = selectedAtlasEntry();
  const eraEntry = historicalAtlas.find((item) => item.era === appState.atlasEra);
  const mapYear = entry?.mapYear ?? eraEntry.mapYear;
  const regionBounds = !entry && appState.atlasRegion ? atlasRegionViews.get(appState.atlasRegion) : null;
  const requestId = ++historicalMapRequest;
  $("#historicalLabel").classList.remove("is-visible");
  $("#mapLabel").textContent = "";
  if (!entry && appState.atlasRegion) {
    $("#mapOverline").textContent = `${appState.atlasRegion} · REGION`;
    $("#mapCountryName").textContent = appState.atlasRegion;
    $("#mapCountryNative").hidden = true;
    $("#mapCountryNative").textContent = "";
    $("#mapCountryDetail").textContent = "選択した地域を拡大し、概略範囲を網掛けで表示しています。国名・通貨を選ぶと、その当時の国境へ移動します。";
    $("#viewCountryCollection").hidden = true;
    $("#mapFacts").hidden = true;
    $("#mapControlFact").hidden = true;
    $("#mapBoundaryLabel").textContent = "選択地域（概略）";
    $("#mapLegend").classList.remove("is-outline-only");
    $("#mapEraLegend").textContent = `${mapYear}年境界資料`;
    renderCurrencyChronology(null);
  } else if (!entry) {
    $("#mapOverline").textContent = "BORDERLESS WORLD";
    $("#mapCountryName").textContent = "国名・通貨を選択してください";
    $("#mapCountryNative").hidden = true;
    $("#mapCountryNative").textContent = "";
    $("#mapCountryDetail").textContent = "地図にはまだ国境がありません。上の年代、地域、国名・通貨を選ぶと、当時の姿が現れます。";
    $("#viewCountryCollection").hidden = true;
    $("#mapFacts").hidden = true;
    $("#mapControlFact").hidden = true;
    $("#mapBoundaryLabel").textContent = "選択国の国境";
    $("#mapLegend").classList.remove("is-outline-only");
    $("#mapEraLegend").textContent = "海岸線のみ表示";
    renderCurrencyChronology(null);
  } else {
    $("#mapOverline").textContent = entry.mapOverline || `${entry.label} · HISTORICAL BORDER`;
    $("#mapCountryName").textContent = atlasCountryCurrencyName(entry);
    $("#mapCountryNative").textContent = entry.nativeName || "";
    $("#mapCountryNative").hidden = !entry.nativeName;
    $("#mapCountryDetail").textContent = entry.detail;
    $("#mapCurrency").textContent = entry.currency;
    $("#mapControlLabel").textContent = entry.mapControlLabel || `${entry.label}の状態`;
    $("#mapControl").textContent = entry.mapControl || "";
    $("#mapControlFact").hidden = !entry.mapControl;
    $("#mapFacts").hidden = false;
    const collectionCount = atlasCollectionCount(entry);
    $("#viewCountryCollection").hidden = false;
    $("#viewCountryCollection").disabled = collectionCount === 0;
    $("#viewCountryCollection").innerHTML = collectionCount ? `収集済み紙幣を見る（${collectionCount}件） <span aria-hidden="true">→</span>` : "収蔵紙幣なし";
    $("#mapEraLegend").textContent = entry.mapLegend || `${entry.mapYear}年境界資料`;
    $("#mapBoundaryLabel").textContent = entry.mapBoundaryLabel || "選択国の国境";
    $("#mapLegend").classList.toggle("is-outline-only", entry.territoryMode === "outline-only");
    renderCurrencyChronology(entry);
  }
  $("#mapDataStatus").textContent = `${mapYear}年資料を読込中`;
  try {
    const [data, coastlineData] = await Promise.all([loadHistoricalMap(mapYear), loadHistoricalMap(2018)]);
    if (requestId !== historicalMapRequest) return;
    const boundaryFeature = entry?.boundaryKey ? historicalBoundaryFeatures.get(entry.boundaryKey) : null;
    const selected = boundaryFeature ? [boundaryFeature] : entry ? data.features.filter((feature) => entry.featureNames.includes(feature.properties?.NAME)) : [];
    const contextBoundaries = entry?.country === "中華民国" && mapYear === 1940 ? [historicalBoundaryFeatures.get("manchukuo")] : [];
    const regionFeature = regionBounds ? { type: "Feature", properties: {}, geometry: regionGeometry(regionBounds) } : null;
    const regionProjectedBounds = regionFeature ? projectedBounds([regionFeature]) : null;
    const regionalFeatures = regionProjectedBounds ? data.features.filter((feature) => {
      const focus = projectedPolygonView([feature]);
      return Number.isFinite(focus.x) && Number.isFinite(focus.y)
        && focus.x >= regionProjectedBounds.minX && focus.x <= regionProjectedBounds.maxX
        && focus.y >= regionProjectedBounds.minY && focus.y <= regionProjectedBounds.maxY;
    }) : [];
    await retireHistoricalHighlight();
    if (requestId !== historicalMapRequest) return;
    const group = $("#historicalMapData");
    if (!group.childElementCount) {
      group.replaceChildren(...coastlineData.features.map((feature) => mapHighlightPath(feature, "map-territory", 0)));
    }
    const regionGroup = $("#historicalRegionData");
    regionGroup.classList.remove("is-burning-out");
    regionGroup.replaceChildren(...regionalFeatures.map((feature, index) => mapHighlightPath(feature, "map-region-hatch map-highlight-entering", index)));
    const borderGroup = $("#historicalBorderData");
    borderGroup.classList.remove("is-burning-out");
    borderGroup.replaceChildren(...selected.map((feature, index) => {
      const precision = Number(feature.properties?.BORDERPRECISION || 3);
      return mapHighlightPath(feature, `map-selected-border map-highlight-entering precision-${precision}${entry?.territoryMode ? ` ${entry.territoryMode}` : ""}`, index);
    }), ...contextBoundaries.map((feature, index) => mapHighlightPath(feature, "map-context-boundary map-highlight-entering precision-1", selected.length + index)));
    let cameraTransform = "translate(0px, 0px) scale(1)";
    if (regionFeature) {
      const bounds = regionProjectedBounds;
      const width = bounds.maxX - bounds.minX;
      const height = bounds.maxY - bounds.minY;
      const scale = Math.max(1.35, Math.min(4.8, 260 / Math.max(width, height, 1)));
      const x = (bounds.minX + bounds.maxX) / 2;
      const y = (bounds.minY + bounds.maxY) / 2;
      cameraTransform = `translate(${(500 - x * scale).toFixed(2)}px, ${(240 - y * scale).toFixed(2)}px) scale(${scale.toFixed(3)})`;
    } else if (entry && selected.length) {
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
    } else if (entry?.focusCoordinates) {
      const [x, y] = equalEarthPoint(entry.focusCoordinates);
      const scale = 7;
      const markerRadius = 3.5 / scale;
      cameraTransform = `translate(${(500 - x * scale).toFixed(2)}px, ${(240 - y * scale).toFixed(2)}px) scale(${scale})`;
      $("#mapGlow feGaussianBlur").setAttribute("stdDeviation", (7 / scale).toFixed(3));
      $("#mapMarker").setAttribute("cx", x);
      $("#mapMarker").setAttribute("cy", y);
      $("#mapMarker").setAttribute("r", markerRadius.toFixed(3));
      $("#mapMarker").style.strokeWidth = `${(1.5 / scale).toFixed(3)}px`;
      $("#mapLabel").setAttribute("x", x + 12 / scale);
      $("#mapLabel").setAttribute("y", y);
      $("#mapLabel").style.fontSize = `${(18 / scale).toFixed(3)}px`;
      $("#mapLabel").style.strokeWidth = `${(4.5 / scale).toFixed(3)}px`;
      $("#mapLabel").style.dominantBaseline = "middle";
      $("#mapLabel").textContent = entry.mapLabel || atlasCountryName(entry);
      $("#historicalLabel").classList.add("is-visible");
    }
    $("#mapCamera").style.transform = cameraTransform;
    $("#mapDataStatus").textContent = entry && !selected.length ? (entry.focusCoordinates ? `${mapYear}年 · 位置表示` : "対象境界を特定できません") : `${mapYear}年 · ${data.features.length}地域`;
    $("#mapDescription").textContent = entry ? (entry.mapDescription || (entry.focusCoordinates && !selected.length ? `${mapYear}年の世界境界。基礎資料に個別境界がないため、${atlasCountryName(entry)}の位置を示しています。` : entry.territoryMode === "outline-only" ? `${mapYear}年の世界境界。${atlasCountryName(entry)}の外郭を表示し、占領軍の実効支配域としては塗っていません。` : `${mapYear}年の世界境界。${atlasCountryName(entry)}を強調表示しています。`)) : regionFeature ? `${mapYear}年資料の世界地図。${appState.atlasRegion}の概略範囲を網掛けで強調表示しています。` : `${mapYear}年資料の正確な海岸線。国境は非表示です。`;
  } catch (error) {
    if (requestId !== historicalMapRequest) return;
    $("#mapDataStatus").textContent = "地図の読込に失敗";
    showToast(error.message, true);
  }
}

function itemMatchesFilters(item, excludedKeys = new Set()) {
  const query = appState.search.trim().normalize("NFKC").toLocaleLowerCase("ja");
  if (appState.collectionScopeIds && !appState.collectionScopeIds.has(item.id)) return false;
  const haystack = [item.country, item.region, item.currency, item.denomination, item.year, item.series, item.issueType, item.title, item.story, item.catalogNumber, ...(item.tags || [])].join(" ").normalize("NFKC").toLocaleLowerCase("ja");
  if (query && !haystack.includes(query)) return false;
  if (!excludedKeys.has("macroRegion") && appState.filters.macroRegion && macroRegionForItem(item) !== appState.filters.macroRegion) return false;
  if (!excludedKeys.has("region") && appState.filters.region && item.region !== appState.filters.region) return false;
  if (!excludedKeys.has("country") && appState.filters.country && item.country !== appState.filters.country) return false;
  if (!excludedKeys.has("currency") && appState.filters.currency && item.currency !== appState.filters.currency) return false;
  if (!excludedKeys.has("stateStatus") && appState.filters.stateStatus && item.stateStatus !== appState.filters.stateStatus) return false;
  const issueYears = Array.from(String(item.year || "").matchAll(/\d{4}/g), (match) => Number(match[0]));
  const issueStart = issueYears.length ? Math.min(...issueYears) : null;
  const issueEnd = issueYears.length ? Math.max(...issueYears) : null;
  const overlaps = (start, end) => issueStart !== null && issueStart <= end && issueEnd >= start;
  if (!excludedKeys.has("period") && appState.filters.period === "before-1920" && !overlaps(0, 1919)) return false;
  if (!excludedKeys.has("period") && appState.filters.period === "1920-1949" && !overlaps(1920, 1949)) return false;
  if (!excludedKeys.has("period") && appState.filters.period === "1950-1979" && !overlaps(1950, 1979)) return false;
  if (!excludedKeys.has("period") && appState.filters.period === "1980-1999" && !overlaps(1980, 1999)) return false;
  if (!excludedKeys.has("period") && appState.filters.period === "after-2000" && !overlaps(2000, 9999)) return false;
  if (!excludedKeys.has("period") && appState.filters.period === "unknown" && issueStart !== null) return false;
  const rarity = Number(item.rarityScore) || 0;
  if (!excludedKeys.has("rarity") && appState.filters.rarity === "50-plus" && rarity < 50) return false;
  if (!excludedKeys.has("rarity") && appState.filters.rarity === "40-49" && (rarity < 40 || rarity >= 50)) return false;
  if (!excludedKeys.has("rarity") && appState.filters.rarity === "under-40" && rarity >= 40) return false;
  if (!excludedKeys.has("type") && appState.filters.type && item.type !== appState.filters.type) return false;
  if (!excludedKeys.has("location") && appState.filters.location === "placed" && (!item.location?.binder || item.location.binder === "未配置")) return false;
  if (!excludedKeys.has("location") && appState.filters.location === "unplaced" && item.location?.binder && item.location.binder !== "未配置") return false;
  if (!excludedKeys.has("duplicates") && appState.filters.duplicates && item.duplicateQty < 1) return false;
  return true;
}

function filteredItems(excludedKeys = new Set()) {
  return appState.database.items.filter((item) => itemMatchesFilters(item, excludedKeys));
}

function noteCard(item) {
  const image = !withheldImageIds.has(item.id) && item.images?.front ? `<img src="${escapeHtml(item.images.front)}" alt="${escapeHtml(item.country)} ${escapeHtml(item.title)}の表面">` : "";
  const issueBadge = item.issueType ? `<span class="commemorative-label">${escapeHtml(item.issueType)}</span>` : "";
  const location = item.location?.binder && item.location.binder !== "未配置" ? `${item.location.binder}${item.location.page ? ` / ${item.location.page}` : ""}` : "未配置";
  const interactionLabel = staticArchive ? "の詳細を見る" : "を編集";
  const footerStatus = staticArchive ? "詳細を見る →" : location;
  const interaction = ` role="button" tabindex="0" aria-label="${escapeHtml(item.country)} ${escapeHtml(item.title)}${interactionLabel}"`;
  return `<article class="note-card"${interaction} data-note-id="${escapeHtml(item.id)}">
    <div class="note-visual" style="--note-bg:${hashColor(item.country)}">${image}<span class="note-country-code">${escapeHtml(item.country.slice(0, 12))}</span><span class="note-denom">${escapeHtml(item.denomination)}</span></div>
    <div class="note-body"><div class="note-meta"><span class="country-label">${escapeHtml(item.country)}</span>${issueBadge}<span class="rarity-label">希少度 ${item.rarityScore}/100</span></div>
      <h4>${escapeHtml(item.title || `${item.denomination} ${item.currency}`)}</h4><p>${escapeHtml(item.year || "年代不明")} · ${escapeHtml(item.series || item.currency)}</p>
      <div class="note-footer"><span class="qty-pill">本蔵 ${item.collectionQty}枚${item.duplicateQty ? ` <b class="duplicate-pill">＋ダブり ${item.duplicateQty}</b>` : ""}</span><span>${escapeHtml(footerStatus)}</span></div>
    </div></article>`;
}

function renderCollection() {
  const source = appState.database.sourceSnapshot || {};
  const ribbon = $("#sourceRibbon");
  if (source.countryCount) {
    ribbon.hidden = false;
    const photoRegistration = Number(source.photoRegistrationCount) > 0 ? ` · 写真照合${source.photoRegistrationCount}件` : "";
    ribbon.innerHTML = `<span><b>Notion同期スナップショット</b> ${escapeHtml(source.importedAt || "")}</span><span>${source.countryCount}か国・地域の索引 · 詳細${source.detailedNotionCount || 0}件 · 一覧表${source.sheetCount || 0}件${photoRegistration}</span>`;
  } else {
    ribbon.hidden = true;
  }
  const fillFilter = (selector, values, selected) => {
    const select = $(selector);
    select.innerHTML = `<option value="">すべて</option>${values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
    select.value = selected;
  };
  const itemsByLabel = (key, excludedKeys) => Array.from(new Set(filteredItems(excludedKeys).map((item) => key === "macroRegion" ? macroRegionForItem(item) : item[key]).filter(Boolean))).sort((a, b) => a.localeCompare(b, "ja"));
  const macroRegions = itemsByLabel("macroRegion", new Set(["macroRegion", "region", "country", "currency"])).sort((a, b) => macroRegionOrder.indexOf(a) - macroRegionOrder.indexOf(b));
  fillFilter("#macroRegionFilter", macroRegions, appState.filters.macroRegion);
  fillFilter("#regionFilter", itemsByLabel("region", new Set(["region", "country", "currency"])), appState.filters.region);
  fillFilter("#countryFilter", itemsByLabel("country", new Set(["country", "currency"])), appState.filters.country);
  fillFilter("#currencyFilter", itemsByLabel("currency", new Set(["currency"])), appState.filters.currency);
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
  const previews = item && !withheldImageIds.has(item.id) ? [["表面", item.images?.front], ["裏面", item.images?.back]].filter(([, url]) => url) : [];
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

function openPublicNote(item) {
  if (!item) return;
  appState.filters.macroRegion = macroRegionForItem(item);
  appState.filters.region = item.region || "";
  appState.filters.country = item.country || "";
  appState.filters.currency = item.currency || "";
  renderCollection();
  $("#publicNoteDialogTitle").textContent = `${item.country} · ${item.title}`;
  $("#publicNoteKicker").textContent = `${item.year || "年代不明"} · ${item.series || item.currency}`;
  $("#publicNoteRarity").textContent = `希少度 ${item.rarityScore}/100`;
  const images = withheldImageIds.has(item.id) ? [] : [["表面", item.images?.front], ["裏面", item.images?.back]].filter(([, url]) => url);
  $("#publicNoteImages").innerHTML = images.length ? images.map(([label, url]) => `<figure><img src="${escapeHtml(url)}" alt="${escapeHtml(item.country)} ${escapeHtml(item.title)}の${label}"><figcaption>${label}</figcaption></figure>`).join("") : `<p class="public-note-empty">公開画像はありません。</p>`;
  const facts = [
    ["発行国・体制", item.country],
    ...(item.issueType ? [["発行区分", item.issueType]] : []),
    ["通貨", item.currency],
    ["額面", item.denomination],
    ["発行年・年代", item.year || "不明"],
    ["シリーズ", item.series || "未記録"],
    ["国家・体制", item.stateStatus || "未記録"]
  ];
  $("#publicNoteFacts").innerHTML = facts.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("");
  renderPublicNoteStory(item.story);
  const motifs = item.motifs || "";
  $("#publicNoteMotifs").textContent = motifs || "モチーフはまだ登録されていません。";
  $("#publicNoteDialog").showModal();
}

function renderPublicNoteStory(story) {
  const container = $("#publicNoteStory");
  container.replaceChildren();
  if (!story) {
    const empty = document.createElement("p");
    empty.className = "public-note-empty";
    empty.textContent = "歴史解説はまだ登録されていません。";
    container.append(empty);
    return;
  }
  const sections = [
    ["肖像・人物：", "肖像・人物"], ["発行背景：", "発行背景"],
    ["当時の社会情勢：", "当時の社会情勢"], ["特殊な点：", "この紙幣の特徴"],
    ["採用モチーフは、", null],
    ["通貨制度と、", "収蔵資料として"]
  ];
  const points = [];
  let remaining = story;
  for (const [marker, heading] of sections) {
    const markerIndex = remaining.indexOf(marker);
    if (markerIndex === -1) continue;
    const before = remaining.slice(0, markerIndex).trim();
    if (before) points.push(["", before]);
    remaining = remaining.slice(markerIndex + marker.length);
    const nextIndexes = sections.map(([nextMarker]) => remaining.indexOf(nextMarker)).filter((index) => index >= 0);
    const end = nextIndexes.length ? Math.min(...nextIndexes) : remaining.length;
    const text = remaining.slice(0, end).trim();
    if (heading) points.push([heading, text]);
    remaining = remaining.slice(end);
  }
  if (!points.length) points.push(["", story]);
  for (const [heading, text] of points) {
    const block = document.createElement("div");
    block.className = "public-note-story-block";
    if (heading) {
      const title = document.createElement("h4");
      title.textContent = heading;
      block.append(title);
    }
    const body = document.createElement("p");
    body.textContent = text;
    block.append(body);
    container.append(block);
  }
}

function openCardNote(item) {
  if (staticArchive) openPublicNote(item);
  else openNote(item);
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
      appState.atlasRegion = "";
      appState.atlasCountry = "";
      appState.atlasCurrency = "";
      renderDashboard();
    }
    const regionTarget = event.target.closest("[data-atlas-region]");
    if (regionTarget) {
      appState.atlasRegion = regionTarget.dataset.atlasRegion;
      appState.atlasCountry = "";
      appState.atlasCurrency = "";
      renderDashboard();
    }
    const countryTarget = event.target.closest("[data-atlas-entry-index]");
    if (countryTarget) {
      const entry = historicalAtlas[Number(countryTarget.dataset.atlasEntryIndex)];
      if (!entry) return;
      appState.atlasCountry = entry.country;
      appState.atlasCurrency = entry.currencyKey || "";
      renderDashboard();
    }
    const currencyTarget = event.target.closest("[data-atlas-currency]");
    if (currencyTarget) {
      const entry = historicalAtlas.find((item) => item.currencyKey === currencyTarget.dataset.atlasCurrency);
      if (!entry) return;
      appState.atlasEra = entry.era;
      appState.atlasRegion = atlasRegion(entry);
      appState.atlasCountry = entry.country;
      appState.atlasCurrency = entry.currencyKey;
      renderDashboard();
    }
    const noteTarget = event.target.closest("[data-note-id]");
    if (noteTarget) openCardNote(appState.database.items.find((item) => item.id === noteTarget.dataset.noteId));
    const close = event.target.closest("[data-close-dialog]");
    if (close) $(`#${close.dataset.closeDialog}`).close();
  });
  document.addEventListener("keydown", (event) => {
    const noteTarget = event.target.closest?.("[data-note-id]");
    if (noteTarget && ["Enter", " "].includes(event.key)) { event.preventDefault(); openCardNote(appState.database.items.find((item) => item.id === noteTarget.dataset.noteId)); }
  });
  $("#addNoteButton").addEventListener("click", () => openNote());
  $("#viewCountryCollection").addEventListener("click", () => {
    const entry = selectedAtlasEntry();
    if (!entry) return;
    const items = atlasCollectionItems(entry);
    if (!items.length) return;
    appState.search = "";
    appState.collectionScopeIds = new Set(items.map((item) => item.id));
    appState.filters = emptyCollectionFilters();
    const first = items[0];
    appState.filters.macroRegion = macroRegionForItem(first);
    appState.filters.region = items.every((item) => item.region === first.region) ? first.region : "";
    appState.filters.country = items.every((item) => item.country === first.country) ? first.country : "";
    appState.filters.currency = items.every((item) => item.currency === first.currency) ? first.currency : "";
    $("#globalSearch").value = "";
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
  $("#globalSearch").addEventListener("input", (event) => { appState.collectionScopeIds = null; appState.search = event.target.value; if (appState.search && appState.view !== "collection") switchView("collection"); else renderCollection(); });
  $("#macroRegionFilter").addEventListener("change", (event) => { appState.filters.macroRegion = event.target.value; appState.filters.region = ""; appState.filters.country = ""; appState.filters.currency = ""; renderCollection(); });
  $("#regionFilter").addEventListener("change", (event) => { appState.filters.region = event.target.value; appState.filters.country = ""; appState.filters.currency = ""; renderCollection(); });
  $("#countryFilter").addEventListener("change", (event) => { appState.filters.country = event.target.value; appState.filters.currency = ""; renderCollection(); });
  $("#currencyFilter").addEventListener("change", (event) => { appState.filters.currency = event.target.value; renderCollection(); });
  $("#periodFilter").addEventListener("change", (event) => { appState.filters.period = event.target.value; renderCollection(); });
  $("#stateStatusFilter").addEventListener("change", (event) => { appState.filters.stateStatus = event.target.value; renderCollection(); });
  $("#rarityFilter").addEventListener("change", (event) => { appState.filters.rarity = event.target.value; renderCollection(); });
  $("#typeFilter").addEventListener("change", (event) => { appState.filters.type = event.target.value; renderCollection(); });
  $("#locationFilter").addEventListener("change", (event) => { appState.filters.location = event.target.value; renderCollection(); });
  $("#duplicateFilter").addEventListener("change", (event) => { appState.filters.duplicates = event.target.checked; renderCollection(); });
  $("#clearFilters").addEventListener("click", () => {
    appState.search = ""; appState.collectionScopeIds = null; appState.filters = emptyCollectionFilters();
    $("#globalSearch").value = ""; $("#duplicateFilter").checked = false; renderCollection();
  });
  $$("[data-layout]").forEach((button) => button.addEventListener("click", () => { appState.layout = button.dataset.layout; $$("[data-layout]").forEach((item) => item.classList.toggle("is-active", item === button)); renderCollection(); }));
  $("#jsonImport").addEventListener("change", (event) => importFile(event.target.files[0], "json"));
  $("#csvImport").addEventListener("change", (event) => importFile(event.target.files[0], "csv"));
}

async function init() {
  attachEvents();
  refreshPublishedCommit();
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
