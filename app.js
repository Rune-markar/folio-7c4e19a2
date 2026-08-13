(function () {
  "use strict";

  const countries = window.ARCHIVE_COUNTRIES || [];
  const grid = document.querySelector("#country-grid");
  const search = document.querySelector("#country-search");
  const filters = Array.from(document.querySelectorAll(".filter-button"));
  const count = document.querySelector("#result-count");
  const total = document.querySelector("#country-total");
  const empty = document.querySelector("#empty-state");
  let activeRegion = "all";

  function cardTemplate(country, index) {
    return `
      <a class="country-card palette-${country.palette}" href="country.html?code=${encodeURIComponent(country.code)}" aria-label="${country.nameJa}、${country.currency}の資料を開く">
        <span class="card-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="flag-frame" aria-hidden="true">${window.archiveFlagSvg(country.code)}</span>
        <span class="card-region">${country.region} / ${country.currencyCode}</span>
        <strong>${country.nameJa}</strong>
        <small>${country.nameEn}</small>
        <span class="card-currency">${country.currency}</span>
        <span class="card-arrow" aria-hidden="true">↗</span>
      </a>`;
  }

  function render() {
    const query = search.value.trim().toLocaleLowerCase("ja");
    const visible = countries.filter((country) => {
      const regionMatches = activeRegion === "all" || country.regionKey === activeRegion;
      const searchText = [country.nameJa, country.nameEn, country.currency, country.currencyCode, country.issuer].join(" ").toLocaleLowerCase("ja");
      return regionMatches && searchText.includes(query);
    });

    grid.innerHTML = visible.map(cardTemplate).join("");
    count.textContent = String(visible.length);
    empty.hidden = visible.length !== 0;
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeRegion = button.dataset.region;
      filters.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      render();
    });
  });

  search.addEventListener("input", render);
  total.textContent = String(countries.length).padStart(2, "0");
  render();
})();
