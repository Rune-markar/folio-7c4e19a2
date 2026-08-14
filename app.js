const appState = {
  database: null,
  view: "dashboard",
  layout: "cards",
  search: "",
  atlasEra: "2018",
  atlasRegion: "",
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
  { era: "1993", label: "1992–2003", period: "連邦共和国ディナール", mapYear: 1993, featureNames: ["Yugoslavia"], country: "ユーゴスラビア連邦共和国", currency: "ユーゴスラビア・ディナール", currencyFamily: "yugoslavia", currencyKey: "yugoslavia-federal-dinar", currencyOrder: 2, regimeLabel: "ユーゴスラビア連邦共和国", flag: "/flags/yugoslavia-1992.svg", flagAlt: "1992年から2003年のユーゴスラビア連邦共和国旗", flagPeriod: "1992–2003", short: "ユーゴスラビア", detail: "社会主義連邦の解体後、セルビアとモンテネグロで構成された連邦共和国のディナール。国家再編と急激なインフレーションが紙幣に刻まれた時代。" },
  { era: "1987", label: "1987", period: "インティ時代", mapYear: 1987, featureNames: ["Peru"], country: "ペルー", officialName: "ペルー共和国", currency: "ペルー・インティ", flag: "/flags/peru.svg", flagAlt: "1987年当時のペルー国旗", flagPeriod: "1950–現在", short: "ペルー", detail: "インフレーションが進行するなか、インティ紙幣が流通していた時代。" },
  { era: "1986", label: "1986", period: "冷戦後期", mapYear: 1986, featureNames: ["Austria"], country: "オーストリア共和国", currency: "オーストリア・シリング", flag: "/flags/austria.svg", flagAlt: "オーストリア国旗", flagPeriod: "1945–現在", short: "オーストリア", detail: "シリングが流通していた、欧州統合前のオーストリア。" },
  { era: "1986", label: "1986", period: "冷戦後期", mapYear: 1986, featureNames: ["Finland"], country: "フィンランド共和国", currency: "フィンランド・マルッカ", flag: "/flags/finland.svg", flagAlt: "フィンランド国旗", flagPeriod: "1918–現在", short: "フィンランド", detail: "マルッカ紙幣が北欧の日常を支えていた時代。" },
  { era: "1970", label: "1970年代", period: "ペソ・レイ", mapYear: 1985, mapLegend: "1985年境界資料（収蔵紙幣は1970年代）", featureNames: ["Argentina"], country: "アルゼンチン", officialName: "アルゼンチン共和国", currency: "ペソ・レイ18.188（Peso ley 18.188）", currencyFamily: "argentina", currencyKey: "argentina-peso-ley", currencyOrder: 1, regimeLabel: "アルゼンチン共和国", flag: "/flags/argentina.svg", flagAlt: "1970年代当時のアルゼンチン国旗", flagPeriod: "1944–現在", short: "アルゼンチン", detail: "1970年に旧ペソから切り替えられ、1983年まで流通したペソ・レイ18.188の時代。収蔵品には1970年代後半から1980年代前半の旧ペソ末期券も含みます。" },
  { era: "1985", label: "1985–1991", period: "アウストラル", eraPeriod: "通貨改革", mapYear: 1985, featureNames: ["Argentina"], country: "アルゼンチン", officialName: "アルゼンチン共和国", currency: "アウストラル（Austral）", currencyFamily: "argentina", currencyKey: "argentina-austral", currencyOrder: 2, regimeLabel: "アルゼンチン共和国", flag: "/flags/argentina.svg", flagAlt: "1985年当時のアルゼンチン国旗", flagPeriod: "1944–現在", short: "アルゼンチン", detail: "慢性的なインフレーションへの対策として、1985年にアウストラルが導入された時代。" },
  { era: "1992", label: "1992–2001", period: "兌換ペソ", mapYear: 1993, mapLegend: "1993年境界資料（1992年発行紙幣）", featureNames: ["Argentina"], country: "アルゼンチン", officialName: "アルゼンチン共和国", currency: "兌換ペソ（Peso convertible）", currencyFamily: "argentina", currencyKey: "argentina-convertible-peso", currencyOrder: 3, regimeLabel: "アルゼンチン共和国", flag: "/flags/argentina.svg", flagAlt: "1992年当時のアルゼンチン国旗", flagPeriod: "1944–現在", short: "アルゼンチン", detail: "1992年に導入され、米ドルとの固定相場を制度の柱とした兌換ペソの時代。" },
  { era: "1983", label: "1983", period: "共和国の転換期", mapYear: 1983, featureNames: ["Turkey (Ottoman Empire)"], country: "トルコ共和国", currency: "トルコ・リラ", flag: "/flags/turkey.svg", flagAlt: "1983年当時のトルコ国旗", flagPeriod: "1936–現在", short: "トルコ", detail: "高インフレへ向かう時期のトルコで、リラ紙幣が流通していた時代。" },
  { era: "1966", label: "1966", period: "フラン／新フラン", mapYear: 1966, featureNames: ["France"], country: "フランス共和国", officialName: "フランス共和国（第五共和政）", nativeName: "République française", currency: "フランス・フラン（収蔵資料に新フラン表記を含む）", pickerCurrency: "フラン／新フラン", currencyFamily: "france", currencyKey: "france-franc-1966", currencyOrder: 4, regimeLabel: "第五共和政", flag: "/flags/france-1946.svg", flagAlt: "1966年当時のフランス国旗", flagPeriod: "1794–現在", short: "フランス", detail: "1958年憲法による第五共和政下で通貨制度の安定が進み、旧額面との区別から「新フラン」の呼称もなお見られた時代。" },
  { era: "1965", label: "1965", period: "新フラン", mapYear: 1965, featureNames: ["France"], country: "フランス共和国", officialName: "フランス共和国（第五共和政）", nativeName: "République française", currency: "新フラン", currencyFamily: "france", currencyKey: "france-new-franc-1965", currencyOrder: 3, regimeLabel: "第五共和政", flag: "/flags/france-1946.svg", flagAlt: "1965年当時のフランス国旗", flagPeriod: "1794–現在", short: "フランス", detail: "1958年憲法による第五共和政下、1960年の通貨改革で100旧フランを1新フランとした後の通貨。" },
  { era: "1947", label: "1947", period: "戦後のザール", mapYear: 1947, mapLegend: "1947年境界資料・ザール位置資料", featureNames: ["Saar Protectorate"], country: "ザール保護領", currency: "ザールマルク", flag: "/flags/saar-1947.svg", flagAlt: "1947年から1956年のザール保護領旗", flagPeriod: "1947–1956", short: "ザール", detail: "フランス管理下でドイツ通貨圏から切り離され、1947年6月に短命なザールマルクが導入された過渡期。位置表示には現在のザールラント境界を参照しています。" },
  { era: "1946", label: "1946", period: "戦後復興", mapYear: 1946, featureNames: ["Hungary"], country: "ハンガリー", officialName: "ハンガリー共和国", currency: "ペンゲー → フォリント（1946年8月1日）", flag: "/flags/hungary-1946.svg", flagAlt: "1946年から1949年のハンガリー共和国旗", flagPeriod: "1946–1949", short: "ハンガリー", detail: "史上屈指のハイパーインフレーションを経て、フォリントへ転換した年。" },
  { era: "1946", label: "1946", period: "戦後フラン", mapYear: 1946, featureNames: ["France"], country: "フランス共和国", officialName: "フランス共和国（臨時政府 → 第四共和政）", nativeName: "République française", currency: "フランス・フラン", currencyFamily: "france", currencyKey: "france-franc-1946", currencyOrder: 2, regimeLabel: "臨時政府 → 第四共和政", flag: "/flags/france-1946.svg", flagAlt: "1946年当時のフランス国旗", flagPeriod: "1946年仕様", short: "フランス", detail: "1946年はフランス共和国臨時政府から、10月27日の憲法施行による第四共和政へ移行した年。復興期の社会をフラン紙幣が支えました。" },
  { era: "1943", label: "1943", period: "占領期フラン", mapYear: 1943, mapOverline: "1943 · OCCUPIED FRANCE", mapLegend: "1943年7月1日・フランス外郭（支配域ではありません）", mapBoundaryLabel: "フランス本土の外郭", mapControl: "全土占領下：大部分はドイツ軍、南東部・コルシカはイタリア軍", mapLabel: "ヴィシー政府所在地", markerCoordinates: [3.4242, 46.126], territoryMode: "outline-only", featureNames: ["France"], country: "フランス共和国", officialName: "フランス国（ヴィシー政権）", nativeName: "État français", currency: "フランス・フラン", currencyFamily: "france", currencyKey: "france-franc-1943", currencyOrder: 1, regimeLabel: "ヴィシー政権", flag: "/flags/france-1946.svg", flagAlt: "1943年当時に用いられたフランス三色旗", flagPeriod: "1794–現在", short: "フランス", detail: "1943年7月1日にはフランス本土全域が枢軸軍の占領下にあり、ヴィシー政府に独立した実効支配域はありませんでした。地図の金色線はフランスの外郭であり、ヴィシー政権の領土を示すものではありません。" },
  { era: "1940", label: "1924–1948", period: "ライヒスマルク", eraPeriod: "戦時ドイツ", mapYear: 1940, mapLegend: "1940年境界資料（通貨期 1924–1948）", featureNames: ["Germany (Prussia)"], country: "ナチス・ドイツ", officialName: "ドイツ国（ナチス政権）", nativeName: "Deutsches Reich", currency: "ライヒスマルク（Reichsmark）", currencyFamily: "germany", currencyKey: "germany-reichsmark", currencyOrder: 4, regimeLabel: "ヴァイマル共和国 → ナチス・ドイツ", flag: "/flags/germany-1935.svg", flagAlt: "1935年から1945年のドイツ国旗", flagPeriod: "1935–1945", short: "ナチス・ドイツ", detail: "1924年に導入されたライヒスマルクは、ヴァイマル共和国からナチス・ドイツを経て1948年まで使われました。政治体制では分割せず、ひとつの通貨期として表示しています。" },
  { era: "1923", label: "1923–1924", period: "レンテンマルク", mapYear: 1923, featureNames: ["Germany (Prussia)"], country: "ヴァイマル共和国", officialName: "ドイツ国（ヴァイマル共和国）", nativeName: "Weimarer Republik", currency: "レンテンマルク（Rentenmark）", currencyFamily: "germany", currencyKey: "germany-rentenmark", currencyOrder: 3, regimeLabel: "ヴァイマル共和国", flag: "/flags/weimar-1919.svg", flagAlt: "1919年から1933年のヴァイマル共和国旗", flagPeriod: "1919–1933", short: "ヴァイマル共和国", detail: "1923年11月、通貨安定のためレンテンマルクが導入されました。ライヒスマルク導入後も補助的に長く残りますが、ここでは新しい通貨単位が始まった転換点としてまとめています。" },
  { era: "1923", label: "1914–1923", period: "パピエルマルク", mapYear: 1923, featureNames: ["Germany (Prussia)"], country: "ヴァイマル共和国", officialName: "ドイツ国（ヴァイマル共和国）", nativeName: "Weimarer Republik", currency: "パピエルマルク（Papiermark）", pickerCurrency: "パピエルマルク／レンテンマルク", currencyFamily: "germany", currencyKey: "germany-papiermark", currencyOrder: 2, regimeLabel: "ドイツ帝国 → ヴァイマル共和国", flag: "/flags/weimar-1919.svg", flagAlt: "1919年から1933年のヴァイマル共和国旗", flagPeriod: "1919–1933", short: "ヴァイマル共和国", detail: "金兌換停止後のマルクは、後にパピエルマルクと呼ばれました。帝政末期からヴァイマル共和国のハイパーインフレーションまでを、同じ通貨単位の時期としてまとめています。" },
  { era: "1923", label: "1923", period: "紙幣の激動期", mapYear: 1914, mapLegend: "1914年境界資料（帝国存続時）", featureNames: ["Austria-Hungary"], country: "オーストリア＝ハンガリー帝国", currency: "旧オーストリア＝ハンガリー・クローネ（後継国で移行中）", flag: "/flags/austria-hungary-1869.svg", flagAlt: "1869年から1918年のオーストリア＝ハンガリー民船旗", flagPeriod: "1869–1918 民船旗", short: "オーストリア＝ハンガリー帝国", detail: "帝国崩壊後も旧クローネ紙幣が残った時代。地図は比較のため、帝国存続時の1914年版図を表示しています。" },
  { era: "1920", label: "1920", period: "共和国初期", mapYear: 1920, featureNames: ["Brazil"], country: "ブラジル", officialName: "ブラジル合衆国", currency: "ミルレイス", flag: "/flags/brazil-1889.svg", flagAlt: "1889年から1960年のブラジル国旗", flagPeriod: "1889–1960", short: "ブラジル", detail: "ブラジル第一共和政期に、ミルレイス紙幣が流通していた時代。" },
  { era: "1914", label: "1871–1914", period: "金マルク", mapYear: 1914, featureNames: ["Germany (Prussia)"], country: "ドイツ帝国", nativeName: "Deutsches Reich", currency: "金マルク（Goldmark）", currencyFamily: "germany", currencyKey: "germany-goldmark", currencyOrder: 1, regimeLabel: "ドイツ帝国", flag: "/flags/german-empire-1867.svg", flagAlt: "1867年から1918年のドイツ帝国旗", flagPeriod: "1867–1918", short: "ドイツ帝国", detail: "1871年の統一後に整えられた金本位制のマルク。第一次世界大戦で金兌換が停止されるまでを、ひとつの通貨期として表示しています。" },
  { era: "1948", label: "1948–2001", period: "ドイツ・マルク", eraPeriod: "戦後の通貨改革", mapYear: 1946, mapLegend: "1946年境界資料（1948年通貨改革）", featureNames: ["German Federal Republic"], country: "ドイツ連邦共和国", nativeName: "Bundesrepublik Deutschland", currency: "ドイツ・マルク（Deutsche Mark）", currencyFamily: "germany", currencyKey: "germany-deutsche-mark", currencyOrder: 5, regimeLabel: "西ドイツ → 統一ドイツ", flag: "/flags/weimar-1919.svg", flagAlt: "ドイツ連邦共和国旗", flagPeriod: "1949–現在", short: "西ドイツ", detail: "1948年の西側占領地域の通貨改革で導入され、1949年以後は西ドイツ、1990年以後は統一ドイツの通貨となりました。" },
  { era: "1948", label: "1948–1990", period: "東ドイツ・マルク", eraPeriod: "戦後の通貨改革", mapYear: 1946, mapLegend: "1946年境界資料（東側占領地域）", featureNames: ["German Democratic Republic"], country: "ドイツ民主共和国", nativeName: "Deutsche Demokratische Republik", currency: "東ドイツ・マルク（Mark der DDR）", currencyFamily: "germany", currencyKey: "germany-ddr-mark", currencyOrder: 6, regimeLabel: "東ドイツ", flag: "/flags/east-germany.svg", flagAlt: "ドイツ民主共和国旗", flagPeriod: "1959–1990", short: "東ドイツ", detail: "東側占領地域の通貨改革に始まり、ドイツ民主共和国で1990年の通貨統合まで使われたマルクです。" },
  { era: "2002", label: "2002–", period: "ユーロ", mapYear: 2018, mapLegend: "2018年境界資料（2002年現金流通開始）", featureNames: ["German Federal Republic"], country: "ドイツ連邦共和国（ユーロ）", nativeName: "Bundesrepublik Deutschland", currency: "ユーロ（Euro）", currencyFamily: "germany", currencyKey: "germany-euro", currencyOrder: 7, regimeLabel: "統一ドイツ", flag: "/flags/weimar-1919.svg", flagAlt: "ドイツ連邦共和国旗", flagPeriod: "1949–現在", short: "ドイツ", detail: "1999年に会計通貨として導入され、2002年からユーロ紙幣・硬貨の流通が始まりました。" },
  { era: "1914", label: "1914", period: "大戦の始まり", mapYear: 1914, featureNames: ["Denmark"], country: "デンマーク", officialName: "デンマーク王国", currency: "デンマーク・クローネ", flag: "/flags/denmark.svg", flagAlt: "1914年当時のデンマーク国旗", flagPeriod: "1914年仕様", short: "デンマーク", detail: "北欧の王国でクローネ紙幣が使われていた時代。" },
  { era: "1943", label: "1942–1945", period: "日本軍占領地ペソ", eraPeriod: "アジア太平洋戦争", mapYear: 1943, mapLegend: "1943年境界資料（占領・実効支配域ではありません）", mapBoundaryLabel: "フィリピンの外郭", mapControl: "日本軍占領下。1943年10月に第二共和国が成立", territoryMode: "outline-only", featureNames: ["Philippines"], country: "フィリピン", officialName: "日本軍占領下フィリピン", currency: "日本軍占領地ペソ", currencyFamily: "philippines", currencyKey: "philippines-japanese-occupation-peso", currencyOrder: 1, regimeLabel: "日本軍政 → 第二共和国", flagPeriod: "1942–1945", short: "フィリピン", detail: "日本軍が発行した軍票の時期。フィリピンの地理的・紙幣史的な系統として戦後の共和国へ接続しますが、金色線は占領軍の実効支配域ではなくフィリピンの外郭です。" },
  { era: "2018", label: "1946–現在", period: "共和国のフィリピン・ペソ", mapYear: 2018, mapLegend: "2018年境界資料（1946年独立後の系統）", featureNames: ["Philippines"], country: "フィリピン", officialName: "フィリピン共和国", currency: "フィリピン・ペソ", currencyFamily: "philippines", currencyKey: "philippines-republic-peso", currencyOrder: 2, regimeLabel: "フィリピン共和国", flagPeriod: "1946–現在", short: "フィリピン", detail: "日本占領期の軍票とは発行主体も通貨制度も異なりますが、同じ地域の紙幣史を比較する後続期として表示します。" },
  { era: "1885", label: "1885", period: "明治初期の日本銀行兌換銀券", mapYear: 1914, mapLegend: "1914年境界資料（収蔵紙幣は1885年）", featureNames: ["Japan"], country: "大日本帝国", currency: "円", currencyFamily: "japan", currencyKey: "japan-meiji-yen", currencyOrder: 1, regimeLabel: "大日本帝国・明治期", flagPeriod: "1870–1999", short: "明治日本", detail: "日本銀行が開業後初めて発行した兌換銀券の時期。利用できる最古の境界資料との差を注記して表示します。" },
  { era: "1943", label: "1938–1945", period: "戦時期の円", eraPeriod: "アジア太平洋戦争", mapYear: 1943, featureNames: ["Japan"], country: "大日本帝国", currency: "円", currencyFamily: "japan", currencyKey: "japan-wartime-yen", currencyOrder: 2, regimeLabel: "大日本帝国・戦時期", flagPeriod: "1870–1999", short: "戦時日本", detail: "日中戦争から敗戦前後に発行・流通した日本銀行券と政府紙幣の時期。占領地軍票はこの国内通貨系譜へ混ぜず、使用地域側の系譜で扱います。" },
  { era: "2018", label: "1946–2024年改刷前", period: "戦後・現代の円", mapYear: 2018, featureNames: ["Japan"], country: "日本", officialName: "日本国", currency: "円", currencyFamily: "japan", currencyKey: "japan-modern-yen", currencyOrder: 3, regimeLabel: "戦後日本", flagPeriod: "1999–現在", short: "日本", detail: "戦後の日本で継続する円の通貨期。2024年7月3日のF号券発行を次の改刷期として分け、帝国期との制度的連続と国家体制の断絶も比較します。" },
  { era: "2024", label: "2024–現在", period: "F号券（新日本銀行券）", mapYear: 2018, mapLegend: "2018年境界資料（2024年改刷）", featureNames: ["Japan"], country: "日本", officialName: "日本国", currency: "円（F号券）", currencyFamily: "japan", currencyKey: "japan-f-series", currencyOrder: 4, regimeLabel: "現代日本・2024年改刷", flagPeriod: "1999–現在", short: "日本", detail: "2024年7月3日に一万円・五千円・千円のF号券が発行された改刷期。渋沢栄一、津田梅子、北里柴三郎の肖像と3Dホログラムなど新しい偽造防止技術を採用しています。" },
  { era: "1936", label: "1935–1948", period: "南京国民政府の法幣", mapYear: 1940, mapLegend: "1940年境界資料（収蔵紙幣は1936年）", featureNames: ["China"], country: "中華民国", officialName: "中華民国（南京国民政府）", currency: "法幣（中華民国元）", currencyFamily: "republic-of-china", currencyKey: "roc-fabi", currencyOrder: 1, regimeLabel: "南京国民政府", flagPeriod: "1928–現在", short: "中華民国", detail: "1935年の幣制改革で主要銀行券を法定通貨へ統合した後の通貨期。収蔵品は中央銀行が1936年に発行した10元法幣です。" },
  { era: "1938", label: "1937–1944", period: "日本軍用円", mapYear: 1940, mapLegend: "1940年境界資料（収蔵紙幣は1937～1944年）", mapBoundaryLabel: "中華民国の外郭（占領域ではありません）", mapControl: "日本軍占領地域向け軍票。中国全域を日本の支配域としては表示しない", territoryMode: "outline-only", featureNames: ["China"], country: "中華民国", currency: "日本軍用円", currencyFamily: "republic-of-china", currencyKey: "roc-japanese-military-yen", currencyOrder: 2, regimeLabel: "日中戦争期の中華民国", flagPeriod: "1928–現在", short: "中華民国", detail: "日本軍占領地域向けの軍票。地図は当時の中華民国外郭であり、日本軍の占領・実効支配域を示すものではありません。" },
  { era: "2018", label: "1949–現在", period: "台湾の新台湾ドル", mapYear: 2018, featureNames: ["Taiwan"], country: "中華民国", officialName: "中華民国（台湾）", currency: "新台湾ドル", currencyFamily: "republic-of-china", currencyKey: "roc-new-taiwan-dollar", currencyOrder: 3, regimeLabel: "台湾の中華民国政府", flagPeriod: "1928–現在", short: "台湾", detail: "日中戦争期の大陸で使われた軍票とは別制度です。中華民国をめぐる紙幣史の後続期として表示するもので、主権・法的地位への見解を示す分類ではありません。" },
  { era: "1943", label: "1942–1945", period: "日本軍占領地ルピー", eraPeriod: "アジア太平洋戦争", mapYear: 1943, mapLegend: "1943年境界資料（占領・実効支配域ではありません）", mapBoundaryLabel: "ビルマの外郭", territoryMode: "outline-only", featureNames: ["Myanmar (Burma)"], country: "ミャンマー", officialName: "日本軍占領下ビルマ", currency: "日本軍占領地ルピー", currencyFamily: "myanmar", currencyKey: "myanmar-japanese-occupation-rupee", currencyOrder: 1, regimeLabel: "日本軍政 → ビルマ国", flagPeriod: "1942–1945", short: "ミャンマー", detail: "日本軍占領地ルピーが流通したビルマの戦時期。現在のミャンマーへ続く地域の紙幣史として扱い、外郭を占領軍の実効支配域とはみなしません。" },
  { era: "2018", label: "1948–現在", period: "独立後のチャット", mapYear: 2018, featureNames: ["Myanmar (Burma)"], country: "ミャンマー", officialName: "ミャンマー連邦共和国", currency: "チャット", currencyFamily: "myanmar", currencyKey: "myanmar-kyat", currencyOrder: 2, regimeLabel: "独立後のビルマ／ミャンマー", flagPeriod: "1948–現在", short: "ミャンマー", detail: "占領地軍票とは別制度の独立後通貨。地域の紙幣史を比較する後続期として系譜に含めます。" },
  { era: "1943", label: "1942–1945", period: "日本軍占領地ドル", eraPeriod: "アジア太平洋戦争", mapYear: 1943, mapLegend: "1943年境界資料（マラヤ諸地域の外郭）", mapBoundaryLabel: "マラヤ諸地域の外郭", territoryMode: "outline-only", featureNames: ["Federated Malay States", "Unfederated Malay States"], country: "マレーシア", officialName: "日本軍占領下マラヤ", currency: "日本軍占領地ドル", currencyFamily: "malaysia", currencyKey: "malaya-japanese-occupation-dollar", currencyOrder: 1, regimeLabel: "日本軍政下マラヤ", flagPeriod: "1942–1945", short: "マラヤ", detail: "軍票の通用圏は現在のマレーシアだけでなくシンガポールや北ボルネオ等を含みました。地図は資料にあるマラヤ諸地域の外郭であり、通用圏全体や実効支配域の厳密な復元ではありません。" },
  { era: "2018", label: "1967–現在", period: "マレーシア・リンギット", mapYear: 2018, featureNames: ["Malaysia"], country: "マレーシア", officialName: "マレーシア", currency: "リンギット", currencyFamily: "malaysia", currencyKey: "malaysia-ringgit", currencyOrder: 2, regimeLabel: "マレーシア", flagPeriod: "1963–現在", short: "マレーシア", detail: "占領地ドルの通用圏と現在の国境は一致しません。重なる地域の紙幣史をたどる後続期として表示します。" },
  { era: "1951", label: "1951", period: "人民共和国初期の第2レフ", mapYear: 1947, mapLegend: "1947年境界資料（収蔵紙幣は1951年）", featureNames: ["Bulgaria"], country: "ブルガリア", officialName: "ブルガリア人民共和国", currency: "第2レフ", flagPeriod: "1946–1967", short: "ブルガリア", detail: "社会主義体制初期の通貨改革後に発行された第2レフ紙幣の時期。" },
  { era: "1981", label: "1981", period: "社会主義ユーゴスラビア・ディナール", mapYear: 1983, mapLegend: "1983年境界資料（収蔵紙幣は1981年）", featureNames: ["Yugoslavia"], country: "ユーゴスラビア社会主義連邦共和国", currency: "ユーゴスラビア・ディナール", currencyFamily: "yugoslavia", currencyKey: "yugoslavia-sfr-dinar", currencyOrder: 1, regimeLabel: "社会主義連邦共和国", flagPeriod: "1946–1992", short: "ユーゴスラビア", detail: "六共和国からなる社会主義連邦のディナール。1990年代の国家再編と通貨混乱へ続く前段として表示します。" },
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
  { era: "2010", label: "1993–現在", period: "モルドバ・レウ", mapYear: 2018, mapLegend: "2018年境界資料（収蔵紙幣は2010年）", featureNames: ["Moldova"], country: "モルドバ", officialName: "モルドバ共和国", currency: "モルドバ・レウ", flagPeriod: "1990–現在", short: "モルドバ", detail: "独立後に導入されたモルドバ・レウの通貨期。" }
];
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
const atlasTimelineEras = new Set(["1885", "1914", "1920", "1923", "1936", "1938", "1940", "1943", "1946", "1947", "1951", "1965", "1966", "1970", "1975", "1981", "1983", "1985", "1986", "1987", "1988", "1991", "1992", "1993", "1994", "2000", "2005", "2010", "2018", "2024"]);
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

function atlasFlagMarkup(entry) {
  if (entry.flag) return `<img src="${entry.flag.replace(/^\//, "")}" alt="${escapeHtml(entry.flagAlt || `${atlasCountryName(entry)}の旗`)}">`;
  return `<span class="country-flag-label" aria-hidden="true">${escapeHtml(entry.short || entry.country).slice(0, 3)}</span>`;
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
    const countryCount = new Set(eraEntries.filter((entry) => atlasRegion(entry) === region).map((entry) => entry.country)).size;
    const active = region === appState.atlasRegion;
    return `<button type="button" role="option" aria-selected="${active}" class="region-symbol${active ? " is-active" : ""}" data-atlas-region="${escapeHtml(region)}"><strong>${escapeHtml(region)}</strong><small>${countryCount}か国・体制</small></button>`;
  }).join("");
  const countries = Array.from(new Map(eraEntries
    .filter((entry) => atlasRegion(entry) === appState.atlasRegion)
    .map((entry) => [entry.country, entry])).values());
  $("#countrySymbols").innerHTML = appState.atlasRegion ? countries.map((entry) => {
    const count = appState.database.items.filter((item) => item.country === entry.country).length;
    const wideName = atlasCountryName(entry).length > 12;
    return `<button type="button" role="option" aria-selected="${entry.country === appState.atlasCountry}" class="country-symbol${wideName ? " has-wide-name" : ""}${entry.country === appState.atlasCountry ? " is-active" : ""}" data-atlas-country="${escapeHtml(entry.country)}"><span class="country-flag">${atlasFlagMarkup(entry)}</span><span><strong>${escapeHtml(atlasCountryName(entry))}</strong><small>${escapeHtml(entry.pickerCurrency || entry.currency)}</small><small>${escapeHtml(entry.flagPeriod)} · ${count}件収蔵</small></span></button>`;
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
    $("#mapCountryDetail").textContent = "選択した地域を拡大し、概略範囲を網掛けで表示しています。国家・体制を選ぶと、その当時の国境へ移動します。";
    $("#viewCountryCollection").hidden = true;
    $("#mapFacts").hidden = true;
    $("#mapControlFact").hidden = true;
    $("#mapBoundaryLabel").textContent = "選択地域（概略）";
    $("#mapLegend").classList.remove("is-outline-only");
    $("#mapEraLegend").textContent = `${mapYear}年境界資料`;
    renderCurrencyChronology(null);
  } else if (!entry) {
    $("#mapOverline").textContent = "BORDERLESS WORLD";
    $("#mapCountryName").textContent = "国家・体制を選択してください";
    $("#mapCountryNative").hidden = true;
    $("#mapCountryNative").textContent = "";
    $("#mapCountryDetail").textContent = "地図にはまだ国境がありません。上の年代、地域、国家・体制を選ぶと、当時の姿が現れます。";
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
    $("#mapControlLabel").textContent = entry.mapControlLabel || `${entry.label}の状態`;
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
    const regionFeature = regionBounds ? { type: "Feature", properties: {}, geometry: regionGeometry(regionBounds) } : null;
    const regionProjectedBounds = regionFeature ? projectedBounds([regionFeature]) : null;
    const regionalFeatures = regionProjectedBounds ? data.features.filter((feature) => {
      const focus = projectedPolygonView([feature]);
      return Number.isFinite(focus.x) && Number.isFinite(focus.y)
        && focus.x >= regionProjectedBounds.minX && focus.x <= regionProjectedBounds.maxX
        && focus.y >= regionProjectedBounds.minY && focus.y <= regionProjectedBounds.maxY;
    }) : [];
    const group = $("#historicalMapData");
    group.replaceChildren(...coastlineData.features.map((feature) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", geometryPath(feature.geometry));
      path.setAttribute("fill-rule", "evenodd");
      path.setAttribute("class", "map-territory");
      return path;
    }));
    $("#historicalRegionData").replaceChildren(...regionalFeatures.map((feature) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", geometryPath(feature.geometry));
      path.setAttribute("fill-rule", "evenodd");
      path.setAttribute("class", "map-region-hatch");
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
    $("#mapDescription").textContent = entry ? (entry.focusCoordinates && !selected.length ? `${mapYear}年の世界境界。基礎資料に個別境界がないため、${atlasCountryName(entry)}の位置を示しています。` : entry.territoryMode === "outline-only" ? `${mapYear}年の世界境界。${atlasCountryName(entry)}の外郭を表示し、占領軍の実効支配域としては塗っていません。` : `${mapYear}年の世界境界。${atlasCountryName(entry)}を強調表示しています。`) : regionFeature ? `${mapYear}年資料の世界地図。${appState.atlasRegion}の概略範囲を網掛けで強調表示しています。` : `${mapYear}年資料の正確な海岸線。国境は非表示です。`;
  } catch (error) {
    if (requestId !== historicalMapRequest) return;
    $("#mapDataStatus").textContent = "地図の読込に失敗";
    showToast(error.message, true);
  }
}

function filteredItems() {
  const query = appState.search.trim().normalize("NFKC").toLocaleLowerCase("ja");
  return appState.database.items.filter((item) => {
    const haystack = [item.country, item.region, item.currency, item.denomination, item.year, item.series, item.issueType, item.title, item.story, item.catalogNumber, ...(item.tags || [])].join(" ").normalize("NFKC").toLocaleLowerCase("ja");
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

function openPublicNote(item) {
  if (!item) return;
  $("#publicNoteDialogTitle").textContent = `${item.country} · ${item.title}`;
  $("#publicNoteKicker").textContent = `${item.year || "年代不明"} · ${item.series || item.currency}`;
  $("#publicNoteRarity").textContent = `希少度 ${item.rarityScore}/100`;
  const images = [["表面", item.images?.front], ["裏面", item.images?.back]].filter(([, url]) => url);
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
