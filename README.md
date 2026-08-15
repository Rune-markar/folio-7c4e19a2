# World Banknote Archive - public snapshot

This repository publishes a read-only snapshot generated from the private NAS archive.

- Live site: https://rune-markar.github.io/folio-7c4e19a2/
- Source of truth: private NAS archive
- Excluded from this snapshot: write operations, storage locations, acquisition prices, private source URLs

The URL slug is intentionally non-descriptive, but obscurity is not authentication. The published data is treated as public.

## 保有資料写真からの登録

写真フォルダを使った棚卸し、既存登録との照合、公開用画像の選定、出典記録、検証、未確定資料の報告は [docs/BANKNOTE_REGISTRATION_WORKFLOW.md](docs/BANKNOTE_REGISTRATION_WORKFLOW.md) に従う。公開用画像の個別出典と利用条件は [media/SOURCE.md](media/SOURCE.md) に記録する。

2026年8月15日の追加写真53枚の照合結果は [docs/PHOTO_BATCH_2026-08-15.md](docs/PHOTO_BATCH_2026-08-15.md) に記録している。

## 歴史地図の同一系統国に関する基本基準

同じ国・地域の紙幣が複数の通貨期、発行期、または政治体制にまたがる場合は、ドイツと同じ縦型の「紙幣・通貨の系譜」を地図左側に表示する。国ごとの専用 UI は作らず、次の共通データ仕様で扱う。

歴史地図の選択順は「01 年代 → 02 地域 → 03 国名・通貨」とする。03の選択肢と選択後の見出しは「国名（通貨）」表記で統一し、同じ年代・国名に複数の通貨期がある場合も別々の選択肢とする。地域の正本は台帳の `collectionIndex` とし、収蔵品の `region` は一致させる。歴史上の国号と台帳名が一致しない場合だけ `atlasRegionOverrides` で補う。02を選んだ段階では `atlasRegionViews` の概略範囲へ地図を拡大して網掛けし、03を選ぶと対象の国・通貨期の境界表示へ切り替える。初回表示は登録済みの最新年代を開き、以後はURLパラメータまたはブラウザ保存値から選択状態を復元する。地図上の選択可能な国を押した場合は、その国について登録済みの最も新しい年代・通貨期へ直接移動する。

各地図期の収蔵件数と「収集済み紙幣を見る」は `atlasCollectionScopes` のID集合を正本とし、国名全文検索で代用しない。収蔵0件の比較用・後続期は地図に残し、件数を0件と表示して台帳ボタンを無効化する。

1. 同一系統の各期に共通の `currencyFamily` を設定する。国号や政治体制が変わっても、紙幣史として連続して比較する対象なら同じ値を使う。
2. 各期には一意な `currencyKey` と、古い期を `1` とする昇順の `currencyOrder` を設定する。画面ではこの順番どおり上から下へ並べる。
3. `label` は紙幣・通貨期の年代、`period` は利用者が選ぶ期の名称、`regimeLabel` はその時期の国・体制を示す。選択すると当該期の地図、国名、通貨、解説を一体で切り替える。
4. 収蔵品から同一系統の複数期が確認できた国にはこの仕様を適用する。占領地券と後続国家は法的同一性ではなく、同じ地域の紙幣史を比較する表示上の「系統国」として接続する。たとえば日本軍占領下フィリピンの軍票は日本の国内通貨系譜ではなく、現代フィリピンへ続く `philippines` 系譜に置く。
5. 該当年代の境界データがない場合は、利用できる最寄りの地図年を `mapYear` に指定し、`mapLegend` で紙幣年代と境界資料年の差を明記する。

適用中の系譜、占領期の扱い、新規登録時の確認項目は [docs/HISTORICAL_ATLAS_LINEAGES.md](docs/HISTORICAL_ATLAS_LINEAGES.md) にまとめる。2026-08-14に空欄を解消したカタログ番号の照合記録は [docs/CATALOG_AUDIT_2026-08-14.md](docs/CATALOG_AUDIT_2026-08-14.md) に保存する。

## 必須監査

変更後は依存パッケージ不要の `node scripts/audit.mjs` を実行する。JSON、ID、地域、カタログ番号、画像出典・権利確認状態、歴史地図境界、通貨系譜、国旗、収蔵スコープ、物語構造を一括確認する。

## 紙幣の物語を整理して表示する手順

紙幣詳細の解説は、`data/collection.json` の `story` に保存された一次データを変更せず、表示時に論点ごとへ分解する。

1. `app.js` の `renderPublicNoteStory()` で、`肖像・人物`、`発行背景`、`当時の社会情勢`、`特殊な点`、`通貨制度と` の順に見出し化する。
2. `採用モチーフは` の説明は、同じ画面の「券面のモチーフ」と重複するため、物語表示には含めない。元データは保全する。
3. `index.html` では物語の入れ物を段落要素からブロック要素へ変更し、`styles.css` で各論点の余白・左罫線・行間を整える。
4. 変更後は、データの全件を読み込めること、既存のラベル順で表示されること、390px 幅で本文が横にはみ出さないことを確認する。
