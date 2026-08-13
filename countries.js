window.archiveFlagSvg = function (code) {
  const common = 'viewBox="0 0 60 40" role="img" aria-hidden="true" focusable="false"';
  const flags = {
    JP: `<svg ${common}><rect width="60" height="40" fill="#fff"/><circle cx="30" cy="20" r="11" fill="#bc002d"/></svg>`,
    IN: `<svg ${common}><rect width="60" height="13.34" fill="#ff9933"/><rect y="13.33" width="60" height="13.34" fill="#fff"/><rect y="26.66" width="60" height="13.34" fill="#138808"/><g transform="translate(30 20)" fill="none" stroke="#000080"><circle r="4.5" stroke-width="1"/><path d="M0-4.5V4.5M-4.5 0H4.5M-3.2-3.2L3.2 3.2M3.2-3.2L-3.2 3.2" stroke-width=".55"/></g></svg>`,
    GB: `<svg ${common}><rect width="60" height="40" fill="#012169"/><path d="M0 0L60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0L60 40M60 0L0 40" stroke="#c8102e" stroke-width="4"/><path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="13"/><path d="M30 0V40M0 20H60" stroke="#c8102e" stroke-width="7"/></svg>`,
    EU: `<svg ${common}><rect width="60" height="40" fill="#003399"/><g fill="#ffcc00">${Array.from({ length: 12 }, (_, index) => { const angle = (index * 30 - 90) * Math.PI / 180; const x = 30 + Math.cos(angle) * 12; const y = 20 + Math.sin(angle) * 12; return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="1.35"/>`; }).join("")}</g></svg>`,
    CH: `<svg ${common}><rect width="60" height="40" fill="#d52b1e"/><path d="M25 7H35V15H43V25H35V33H25V25H17V15H25Z" fill="#fff"/></svg>`,
    US: `<svg ${common}><rect width="60" height="40" fill="#fff"/>${Array.from({ length: 7 }, (_, index) => `<rect y="${(index * 80 / 13).toFixed(2)}" width="60" height="${(40 / 13).toFixed(2)}" fill="#b22234"/>`).join("")}<rect width="26" height="21.54" fill="#3c3b6e"/><g fill="#fff">${Array.from({ length: 9 }, (_, row) => Array.from({ length: row % 2 ? 5 : 6 }, (_, column) => `<circle cx="${(2.4 + column * 4.2 + (row % 2 ? 2.1 : 0)).toFixed(1)}" cy="${(1.8 + row * 2.2).toFixed(1)}" r=".55"/>`).join("")).join("")}</g></svg>`,
    CA: `<svg ${common}><rect width="60" height="40" fill="#fff"/><rect width="15" height="40" fill="#d80621"/><rect x="45" width="15" height="40" fill="#d80621"/><path d="M30 7L27.5 14.5 23 12.5 25 18.5 19 17 21.2 22.5 17 24.5 26.5 27 25.7 34H34.3L33.5 27 43 24.5 38.8 22.5 41 17 35 18.5 37 12.5 32.5 14.5Z" fill="#d80621"/></svg>`,
    BR: `<svg ${common}><rect width="60" height="40" fill="#009c3b"/><path d="M30 5L53 20 30 35 7 20Z" fill="#ffdf00"/><circle cx="30" cy="20" r="8.5" fill="#002776"/><path d="M21.8 18.4Q30 14.6 38.2 19" fill="none" stroke="#fff" stroke-width="1"/></svg>`,
    AU: `<svg ${common}><rect width="60" height="40" fill="#00008b"/><g transform="scale(.48)"><rect width="60" height="40" fill="#012169"/><path d="M0 0L60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0L60 40M60 0L0 40" stroke="#c8102e" stroke-width="4"/><path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="13"/><path d="M30 0V40M0 20H60" stroke="#c8102e" stroke-width="7"/></g><g fill="#fff"><path d="M15 24l1.3 3.7h4l-3.2 2.3 1.2 3.8-3.3-2.3-3.3 2.3 1.2-3.8-3.2-2.3h4z"/><circle cx="44" cy="10" r="1.6"/><circle cx="51" cy="18" r="1.4"/><circle cx="43" cy="28" r="1.5"/><circle cx="52" cy="32" r="1.3"/><circle cx="48" cy="23" r=".9"/></g></svg>`
  };
  return flags[code] || `<svg ${common}><rect width="60" height="40" fill="#fff"/><text x="30" y="24" text-anchor="middle" font-size="11" fill="#16241d">${code}</text></svg>`;
};

window.ARCHIVE_COUNTRIES = [
  {
    code: "JP",
    flag: "🇯🇵",
    nameJa: "日本",
    nameEn: "JAPAN",
    region: "アジア",
    regionKey: "asia",
    currency: "日本円",
    currencyCode: "JPY",
    issuer: "日本銀行",
    denominations: ["¥1,000", "¥2,000", "¥5,000", "¥10,000"],
    summary: "肖像と文化財を通して、時代の知性と日本の文化を構成する紙幣。",
    story: "現在の日本銀行券は、肖像、建築、芸術作品を緻密な印刷技術で結び付けています。国別ページでは、額面だけでなく、人物や文化的モチーフが選ばれた背景にも注目します。",
    observations: [
      ["PORTRAIT", "肖像", "人物の功績と、選定された時代背景を読む。"],
      ["CULTURE", "文化財", "建築や芸術作品が担う象徴性を見る。"],
      ["SECURITY", "偽造防止", "すき入れ、ホログラム、凹版印刷に注目する。"]
    ],
    sourceLabel: "日本銀行 — Banknotes and Coins in Use",
    sourceUrl: "https://www.boj.or.jp/en/note_tfjgs/note/valid/",
    palette: "vermilion"
  },
  {
    code: "IN",
    flag: "🇮🇳",
    nameJa: "インド",
    nameEn: "INDIA",
    region: "アジア",
    regionKey: "asia",
    currency: "インド・ルピー",
    currencyCode: "INR",
    issuer: "インド準備銀行",
    denominations: ["₹10", "₹20", "₹50", "₹100", "₹200", "₹500"],
    summary: "色彩と文化遺産を額面ごとに展開する、マハトマ・ガンディー新シリーズ。",
    story: "インドの紙幣は、多言語表記、国家的象徴、文化遺産を一枚の中に重ねています。額面ごとに異なる色や裏面のモチーフを比較すると、広大な文化圏の編集方法が見えてきます。",
    observations: [
      ["LANGUAGE", "多言語", "複数の言語表記が共存する構成を見る。"],
      ["HERITAGE", "文化遺産", "裏面に選ばれた建築・遺産の意味をたどる。"],
      ["COLOUR", "色彩設計", "額面識別を助ける色とサイズの差を見る。"]
    ],
    sourceLabel: "Reserve Bank of India — Banknotes FAQ",
    sourceUrl: "https://www.rbi.org.in/scripts/FS_FAQs.aspx?Id=136&fn=2753",
    palette: "saffron"
  },
  {
    code: "GB",
    flag: "🇬🇧",
    nameJa: "イギリス",
    nameEn: "UNITED KINGDOM",
    region: "ヨーロッパ",
    regionKey: "europe",
    currency: "英ポンド",
    currencyCode: "GBP",
    issuer: "イングランド銀行",
    denominations: ["£5", "£10", "£20", "£50"],
    summary: "透明窓と箔を生かしたポリマー券。君主と歴史的人物が表裏を結ぶ。",
    story: "イングランド銀行券は、ポリマー素材の透明窓、箔、触知要素を統合しています。君主の肖像と各分野の歴史的人物を並置し、連続性と文化史を同時に語ります。",
    observations: [
      ["MATERIAL", "ポリマー", "透明窓を含む素材設計と耐久性を見る。"],
      ["PORTRAITS", "二つの肖像", "表裏の人物が担う歴史的文脈を読む。"],
      ["ACCESS", "触知要素", "識別を助ける凹凸やサイズの差に注目する。"]
    ],
    sourceLabel: "Bank of England — Banknotes",
    sourceUrl: "https://www.bankofengland.co.uk/banknotes",
    palette: "indigo"
  },
  {
    code: "EU",
    flag: "🇪🇺",
    nameJa: "ユーロ圏",
    nameEn: "EURO AREA",
    region: "ヨーロッパ",
    regionKey: "europe",
    currency: "ユーロ",
    currencyCode: "EUR",
    issuer: "ユーロシステム",
    denominations: ["€5", "€10", "€20", "€50", "€100", "€200"],
    summary: "特定の国に寄らない架空の建築表現で、ヨーロッパのつながりを描く。",
    story: "ユーロ紙幣は、窓と門、橋をテーマにしながら、特定の実在建築を主役にしない設計です。複数国で共有する通貨が、共通性をどのように視覚化したかを読み取れます。",
    observations: [
      ["ARCHITECTURE", "建築様式", "時代ごとの窓・門・橋の表現を比較する。"],
      ["SHARED", "共有通貨", "多言語圏に共通する記号と構成を見る。"],
      ["EUROPA", "エウロペ", "肖像窓やホログラムの安全技術に注目する。"]
    ],
    sourceLabel: "European Central Bank — Current banknotes",
    sourceUrl: "https://www.ecb.europa.eu/euro/banknotes/current/html/index.en.html",
    palette: "azure"
  },
  {
    code: "CH",
    flag: "🇨🇭",
    nameJa: "スイス",
    nameEn: "SWITZERLAND",
    region: "ヨーロッパ",
    regionKey: "europe",
    currency: "スイス・フラン",
    currencyCode: "CHF",
    issuer: "スイス国立銀行",
    denominations: ["CHF 10", "CHF 20", "CHF 50", "CHF 100", "CHF 200", "CHF 1,000"],
    summary: "人物ではなく、手・地球・場所を通してスイスの多面性を描く第9次券。",
    story: "スイスの現行シリーズは、人物肖像を使わず、手の動作、地球、場所、物を共通文法として採用しています。縦長の紙面と抽象的なテーマの展開が特徴です。",
    observations: [
      ["FORMAT", "縦長構成", "縦方向に展開する情報のリズムを見る。"],
      ["MOTIF", "手と地球", "全額面に反復する共通モチーフを追う。"],
      ["THEME", "多面性", "時間・光・風など額面別テーマを比較する。"]
    ],
    sourceLabel: "Swiss National Bank — The current banknote series",
    sourceUrl: "https://www.snb.ch/en/the-snb/mandates-goals/cash/series-9",
    palette: "scarlet"
  },
  {
    code: "US",
    flag: "🇺🇸",
    nameJa: "アメリカ合衆国",
    nameEn: "UNITED STATES",
    region: "南北アメリカ",
    regionKey: "americas",
    currency: "米ドル",
    currencyCode: "USD",
    issuer: "連邦準備制度",
    denominations: ["$1", "$2", "$5", "$10", "$20", "$50", "$100"],
    summary: "統一されたサイズと肖像の伝統を保ちながら、安全技術を積層する紙幣。",
    story: "米国紙幣は額面が変わってもサイズが共通し、肖像と国家的建築を中心に構成されます。シリーズ更新で加えられた色、糸、透かしなどを比較すると変化が見えます。",
    observations: [
      ["IDENTIFIER", "識別情報", "肖像、記章、発行銀行記号を読み分ける。"],
      ["SERIES", "シリーズ年", "デザイン更新と記載年の関係を見る。"],
      ["SECURITY", "安全技術", "糸、透かし、色変化インクを確認する。"]
    ],
    sourceLabel: "U.S. Currency Education Program — Denominations",
    sourceUrl: "https://www.uscurrency.gov/denominations",
    palette: "navy"
  },
  {
    code: "CA",
    flag: "🇨🇦",
    nameJa: "カナダ",
    nameEn: "CANADA",
    region: "南北アメリカ",
    regionKey: "americas",
    currency: "カナダ・ドル",
    currencyCode: "CAD",
    issuer: "カナダ銀行",
    denominations: ["$5", "$10", "$20", "$50", "$100"],
    summary: "透明窓と大胆な色彩で、人物・人権・歴史を編むポリマー券。",
    story: "カナダのポリマー銀行券は、透明窓と大きな色面を識別性と安全性の両方に使います。縦型の10ドル券など、シリーズの中で構図そのものを更新する試みも見どころです。",
    observations: [
      ["WINDOW", "透明窓", "窓の中に重ねられた肖像と箔を見る。"],
      ["ORIENTATION", "縦横構成", "額面による向きと情報配置の違いを比べる。"],
      ["STORY", "社会の物語", "人物と出来事の結び付け方を読む。"]
    ],
    sourceLabel: "Bank of Canada — Bank notes",
    sourceUrl: "https://www.bankofcanada.ca/banknotes/",
    palette: "maple"
  },
  {
    code: "BR",
    flag: "🇧🇷",
    nameJa: "ブラジル",
    nameEn: "BRAZIL",
    region: "南北アメリカ",
    regionKey: "americas",
    currency: "ブラジル・レアル",
    currencyCode: "BRL",
    issuer: "ブラジル中央銀行",
    denominations: ["R$2", "R$5", "R$10", "R$20", "R$50", "R$100", "R$200"],
    summary: "共和国像と固有の動物を対にし、生物多様性を額面ごとに展開する。",
    story: "レアル紙幣は、表面の共和国像と裏面のブラジルを代表する動物を対にしています。海から森林まで、額面を並べることで生物多様性の小さな図鑑になります。",
    observations: [
      ["FAUNA", "動物", "額面ごとに選ばれた生息域と種を見る。"],
      ["SCALE", "サイズ", "額面識別を助ける紙面サイズの変化を比べる。"],
      ["REPUBLIC", "共和国像", "シリーズを統一する表面の寓意像を読む。"]
    ],
    sourceLabel: "Banco Central do Brasil — Cédulas produzidas",
    sourceUrl: "https://www.bcb.gov.br/cedulasemoedas/cedulasemitidas",
    palette: "tropical"
  },
  {
    code: "AU",
    flag: "🇦🇺",
    nameJa: "オーストラリア",
    nameEn: "AUSTRALIA",
    region: "オセアニア",
    regionKey: "oceania",
    currency: "オーストラリア・ドル",
    currencyCode: "AUD",
    issuer: "オーストラリア準備銀行",
    denominations: ["$5", "$10", "$20", "$50", "$100"],
    summary: "透明窓を紙面の軸に据え、固有植物と人物史を重ねるポリマー券。",
    story: "ポリマー銀行券を早くから実用化したオーストラリアでは、透明窓が装飾ではなく構図の中心に組み込まれています。人物、建築、固有植物の層を行き来して観察できます。",
    observations: [
      ["WINDOW", "透明窓", "紙面を縦断する窓と動的要素を見る。"],
      ["FLORA", "固有植物", "額面ごとの植物と色彩の関係を読む。"],
      ["TACTILE", "触知記号", "視覚以外でも額面を伝える工夫を見る。"]
    ],
    sourceLabel: "Reserve Bank of Australia — Banknotes",
    sourceUrl: "https://www.rba.gov.au/banknotes/",
    palette: "ocean"
  }
];
