# カタログ番号監査（2026-08-14）

## 方針

`catalogNumber` が空欄だった32件を券面の額面・年・意匠・発行主体と専門カタログで照合した。印刷所や署名組合せを画像から確定できない場合は、無理に細分類せず候補範囲を記録する。画像と旧台帳が矛盾した2件は、利用者判断（9a・10a）により券面を正として台帳も訂正した。

## 確定結果

| item id | 確定した番号 | 照合先 |
|---|---:|---|
| `ve-2-2018` | P#101 | [Numista](https://en.numista.com/204755) |
| `ve-5-2018` | P#102 | [Numista](https://en.numista.com/208164) |
| `ve-20-2014` | P#91 | [Numista](https://en.numista.com/205348) |
| `ve-50-2018` | P#92 | [Numista](https://en.numista.com/205351) |
| `ve-2000-2016` | P#96 | [Numista](https://en.numista.com/205362) |
| `ar-1-1985` | P#323 | [Numista Argentina](https://en.numista.com/catalogue/argentina-6.html) |
| `ar-5-1985` | P#324 | [Numista Argentina](https://en.numista.com/catalogue/argentina-6.html) |
| `ar-10-1985` | P#325 | [Numista Argentina](https://en.numista.com/catalogue/argentina-6.html) |
| `ar-10-1992` | P#342 | [Numista](https://en.numista.com/203272) |
| `cl-1000-1994` | P#154e | [Numista](https://en.numista.com/203431) |
| `pe-500-1987` | P#134 | [Numista Peru](https://en.numista.com/catalogue/perou-9.html) |
| `de-50-1906` | P#26 | [Numista](https://en.numista.com/239939) |
| `de-10000-1922` | P#72 | [Numista Germany](https://en.numista.com/catalogue/allemagne-pre1945-29.html) |
| `de-100000-1923` | P#83 | [Numista](https://en.numista.com/205189) |
| `de-2000000-1923` | P#89 | [Numista Germany](https://en.numista.com/catalogue/allemagne-pre1945-29.html) |
| `de-10000000-1923` | P#96 | [Numista Germany](https://en.numista.com/catalogue/allemagne-pre1945-29.html) |
| `de-100000000-1923` | P#107 | [Numista](https://en.numista.com/203593) |
| `de-500000000-1923` | P#110 | [Numista](https://en.numista.com/203604) |
| `de-1000000000-1923` | P#113 | [Numista](https://en.numista.com/203966) |
| `de-1-1940` | P#R136 | [Numista](https://de.numista.com/207449) |
| `at-1000-1922` | P#78 | [Numista](https://en.numista.com/206948) |
| `at-50-1986` | P#149 | [Numista Austria](https://en.numista.com/catalogue/autriche-7.html) |
| `pe-10-1985` | P#128/129（印刷所未細分） | [Numista](https://en.numista.com/202812) |
| `pe-50-1986` | P#130/131（印刷所未細分） | [Numista Peru](https://en.numista.com/catalogue/perou-9.html) |
| `ar-10-1983-peso-argentino` | P#313 | [Numista](https://en.numista.com/203785) |
| `hu-10000b-1946` | P#132 | [Numista Hungary](https://en.numista.com/catalogue/hongrie-14.html) |
| `de-2-1914` | P#54 | [Numista](https://en.numista.com/208392) |
| `de-50-1920` | P#68 | [Numista](https://en.numista.com/208616) |
| `de-1000-1922` | P#76 | [Numista](https://en.numista.com/202207) |
| `de-20000-1923` | P#85 | [Numista](https://en.numista.com/203613) |
| `de-20000000-1923` | P#97 | [Numista](https://en.numista.com/203334) |
| `de-50000000-1923` | P#98 | [Numista](https://en.numista.com/202216) |

## 継続要件

- 新規登録時は番号を確認できた場合だけ `catalogNumber` を設定し、空文字や由来不明の管理値で埋めない。
- 変種を断定できない場合は候補範囲と未確定理由を記録する。
- 券面・台帳・カタログの額面、通貨期、発行主体が一致しない場合は監査失敗として扱い、利用者判断なしに台帳を補正しない。
- `node scripts/audit.mjs` で、存在する `catalogNumber` が空でないこと、廃止値がないこと、地図期へ一意に収蔵登録されていることを確認する。

## 旧管理値の廃止

利用者判断により、旧管理表由来12件へ一律に入っていた `202211130` はカタログ情報ではなく不要なデータとして破棄した。今後この値を別フィールドへ退避したり、カタログ番号として扱ったりしない。監査は再混入をエラーにする。トルコ500リラのみ、別途券面とトルコ共和国中央銀行資料からP#190を確認できたため正式番号へ置換した。
