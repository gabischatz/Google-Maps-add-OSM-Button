// ==UserScript==
// @name         Google Maps: OSM + GMaps Menüeinträge unter Koordinaten
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Fügt im Google-Maps-Rechtsklick-Menü unter dem Koordinaten-Eintrag eigene Menüzeilen für OSM und Google Maps hinzu
// @match        https://www.google.com/maps/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const coordRegex = /^\s*-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*$/;

  function setMenuRowText(rowFxNQSd, text) {
    const label = rowFxNQSd.querySelector('.mLuXec');
    if (label) label.textContent = text;
  }

  function makeClickableRow(rowFxNQSd, onClick) {
    // Google hat jsaction="click: actionmenu.select" etc. -> wir fangen vorher ab
    rowFxNQSd.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }, true);

    // Tastatur: Enter/Space
    rowFxNQSd.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }
    }, true);

    rowFxNQSd.style.cursor = 'pointer';
  }

  function addCustomRows() {
    const coordItems = document.querySelectorAll('.mLuXec');

    coordItems.forEach((coordLabel) => {
      const text = (coordLabel.innerText || '').trim();
      if (!coordRegex.test(text)) return;

      const coordRow = coordLabel.closest('.fxNQSd');
      if (!coordRow) return;

      // Duplicate-Schutz: nur einmal pro Koordinaten-Zeile
      if (coordRow.dataset.osmInjected === '1') return;
      coordRow.dataset.osmInjected = '1';

      const [latStr, lonStr] = text.split(',').map(s => s.trim());
      const lat = Number(latStr);
      const lon = Number(lonStr);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
      if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return;

      const osmUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`;
      const gmUrl  = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lon}`)}`;

      // Als Vorlage nehmen wir eine vorhandene Zeile (der Koordinaten-Row selber ist ideal)
      const template = coordRow;

      // 1) OSM-Zeile klonen
      const osmRow = template.cloneNode(true);
      osmRow.dataset.osmInjected = '1'; // damit die Clone-Zeilen nicht wieder als "Koordinaten-Zeile" gelten
      setMenuRowText(osmRow, '🗺️ OpenStreetMap öffnen');
      makeClickableRow(osmRow, () => window.open(osmUrl, '_blank', 'noopener,noreferrer'));

      // 2) Google Maps-Zeile klonen
      const gmRow = template.cloneNode(true);
      gmRow.dataset.osmInjected = '1';
      setMenuRowText(gmRow, '🔍 Google Maps (Koordinaten) öffnen');
      makeClickableRow(gmRow, () => { window.location.href = gmUrl; });

      // Direkt NACH der Koordinaten-Zeile einfügen (Reihenfolge: Google, dann OSM – du kannst es drehen)
      coordRow.insertAdjacentElement('afterend', osmRow);
      coordRow.insertAdjacentElement('afterend', gmRow);
    });
  }

  // Trigger (SPA)
  const obs = new MutationObserver(() => addCustomRows());
  obs.observe(document.documentElement, { childList: true, subtree: true });

  addCustomRows();
  setInterval(addCustomRows, 800); // Fallback
})();
