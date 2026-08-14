# World Banknote Archive - public snapshot

This repository publishes a read-only snapshot generated from the private NAS archive.

- Live site: https://rune-markar.github.io/folio-7c4e19a2/
- Source of truth: private NAS archive
- Excluded from this snapshot: write operations, storage locations, acquisition prices, private source URLs

The URL slug is intentionally non-descriptive, but obscurity is not authentication. The published data is treated as public.

## 紙幣の物語を整理して表示する手順

紙幣詳細の解説は、`data/collection.json` の `story` に保存された一次データを変更せず、表示時に論点ごとへ分解する。

1. `app.js` の `renderPublicNoteStory()` で、`肖像・人物`、`発行背景`、`当時の社会情勢`、`特殊な点`、`通貨制度と` の順に見出し化する。
2. `採用モチーフは` の説明は、同じ画面の「券面のモチーフ」と重複するため、物語表示には含めない。元データは保全する。
3. `index.html` では物語の入れ物を段落要素からブロック要素へ変更し、`styles.css` で各論点の余白・左罫線・行間を整える。
4. 変更後は、データの全件を読み込めること、既存のラベル順で表示されること、390px 幅で本文が横にはみ出さないことを確認する。
