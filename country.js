(function () {
  "use strict";

  const countries = window.ARCHIVE_COUNTRIES || [];
  const params = new URLSearchParams(window.location.search);
  const code = (params.get("code") || "").toUpperCase();
  const country = countries.find((item) => item.code === code);
  const detail = document.querySelector("#country-detail");
  const relatedSection = document.querySelector("#related");
  const relatedGrid = document.querySelector("#related-grid");

  function relatedTemplate(item) {
    return `
      <a class="related-card palette-${item.palette}" href="country.html?code=${encodeURIComponent(item.code)}">
        <span class="related-flag" aria-hidden="true">${window.archiveFlagSvg(item.code)}</span>
        <span><small>${item.currencyCode}</small><strong>${item.nameJa}</strong></span>
        <span aria-hidden="true">↗</span>
      </a>`;
  }

  if (!country) {
    document.title = "資料が見つかりません — World Banknote Archive";
    detail.innerHTML = `
      <section class="not-found section-shell">
        <p class="eyebrow">404 / CATALOGUE ENTRY</p>
        <h1>資料が見つかりません。</h1>
        <p>指定された国・通貨圏は、現在の公開資料に登録されていません。</p>
        <a class="button button-primary" href="index.html#atlas">国別アトラスへ戻る</a>
      </section>`;
    return;
  }

  document.title = `${country.nameJa}・${country.currency} — World Banknote Archive`;
  document.querySelector('meta[name="description"]').setAttribute("content", `${country.nameJa}の${country.currency}、発行機関、紙幣意匠をたどる公開資料。`);

  detail.innerHTML = `
    <section class="country-hero palette-${country.palette}">
      <div class="country-identity">
        <p class="eyebrow">COUNTRY &amp; CURRENCY FILE / ${country.code}</p>
        <div class="detail-flag" aria-label="${country.nameJa}の国旗">${window.archiveFlagSvg(country.code)}</div>
        <p class="detail-region">${country.region} · ${country.currencyCode}</p>
        <h1>${country.nameJa}</h1>
        <p class="detail-en">${country.nameEn}</p>
      </div>
      <div class="country-intro">
        <span class="record-tag">PUBLIC FILE · ${country.code}-2026</span>
        <p class="country-summary">${country.summary}</p>
        <dl class="country-facts">
          <div><dt>CURRENCY / 通貨</dt><dd>${country.currency}<small>${country.currencyCode}</small></dd></div>
          <div><dt>ISSUER / 発行機関</dt><dd>${country.issuer}</dd></div>
          <div><dt>REGION / 地域</dt><dd>${country.region}</dd></div>
        </dl>
      </div>
    </section>

    <section class="country-body section-shell">
      <div class="story-column">
        <p class="eyebrow">EDITORIAL NOTE</p>
        <h2>この紙幣の見どころ</h2>
        <p class="story-text">${country.story}</p>
        <div class="denominations">
          <span>REFERENCE DENOMINATIONS</span>
          <div>${country.denominations.map((value) => `<b>${value}</b>`).join("")}</div>
        </div>
      </div>
      <ol class="observation-list">
        ${country.observations.map((item, index) => `
          <li>
            <span>${String(index + 1).padStart(2, "0")} / ${item[0]}</span>
            <h3>${item[1]}</h3>
            <p>${item[2]}</p>
          </li>`).join("")}
      </ol>
    </section>

    <section class="source-panel section-shell">
      <div class="source-icon" aria-hidden="true">↗</div>
      <div>
        <p class="eyebrow">PRIMARY SOURCE</p>
        <h2>発行機関の公式資料で、さらに詳しく。</h2>
        <p>現行券・偽造防止技術・発行情報は、最新の公式資料をご確認ください。</p>
      </div>
      <a class="source-link" href="${country.sourceUrl}" target="_blank" rel="noopener noreferrer external" referrerpolicy="no-referrer">
        <span>OFFICIAL WEBSITE</span>
        <strong>${country.sourceLabel}</strong>
        <b>外部サイトを開く ↗</b>
      </a>
    </section>`;

  const related = countries.filter((item) => item.regionKey === country.regionKey && item.code !== country.code).slice(0, 3);
  if (related.length) {
    relatedGrid.innerHTML = related.map(relatedTemplate).join("");
    relatedSection.hidden = false;
  }
})();
