(() => {
  "use strict";

  const definitions = [
    { name: "Mobile — 320 px", width: 320 },
    { name: "Tablet — 768 px", width: 768 },
    { name: "Desktop — 1440 px", width: 1440 },
    { name: "Texto ampliado — 320 px, fonte 200%", width: 320, largeText: true },
  ];
  const cases = [];
  const base = new URL("../", window.location.href).href;
  const expectedAddress = "Rua Joaquim Gutier Navarro Filho, 180 - Bonança, Osasco - SP, 06266-200, Brasil";
  const hook = '<script>window.__qaErrors=[];addEventListener("error",function(e){if(e.message)window.__qaErrors.push(e.message)});addEventListener("unhandledrejection",function(e){window.__qaErrors.push(String(e.reason))});</script>';

  const measure = (test) => {
    const doc = test.frame.contentDocument;
    const view = test.frame.contentWindow;
    if (!doc || !doc.querySelector(".hero")) return;
    const width = doc.documentElement.clientWidth;
    const overflow = doc.documentElement.scrollWidth - width;
    const offending = Array.from(doc.body.querySelectorAll("*")).filter((element) => {
      if (element.closest(".sr-only, .skip-link") || element.namespaceURI !== "http://www.w3.org/1999/xhtml") return false;
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && (rect.left < -1 || rect.right > width + 1);
    }).slice(0, 8).map((element) => `${element.tagName.toLowerCase()}.${element.className}`);
    const fonts = Array.from(doc.fonts).map((face) => `${face.family}: ${face.status}`);
    const route = doc.querySelector('[data-map-action="route"]');
    const search = doc.querySelector('[data-map-action="search"]');
    const map = doc.querySelector("[data-office-map]");
    const urls = [
      route && new URL(route.href).searchParams.get("destination"),
      search && new URL(search.href).searchParams.get("query"),
      map && new URL(map.src).searchParams.get("q"),
    ];
    const resources = view.performance.getEntriesByType("resource");
    const failed = resources.filter((entry) => entry.responseStatus >= 400).map((entry) => entry.name);
    test.output.textContent = [
      `Viewport efetivo: ${width}px; fonte raiz: ${view.getComputedStyle(doc.documentElement).fontSize}`,
      `Excesso horizontal do documento: ${Math.max(0, overflow)}px`,
      `Elementos fora da largura: ${offending.length ? offending.join(", ") : "nenhum"}`,
      `H1: ${doc.querySelectorAll("h1").length}; fontes: ${fonts.join("; ")}`,
      `Maps: ${urls.every((address) => address === expectedAddress) ? "três destinos nº180 corretos" : "DIVERGÊNCIA"}`,
      `Erros de execução capturados: ${(view.__qaErrors || []).length}`,
      `Respostas HTTP com erro observáveis: ${failed.length ? failed.join(", ") : "nenhuma"}`,
      `Recursos locais observados: ${resources.filter((entry) => entry.name.startsWith(base)).length}`,
    ].join("\n");
  };

  const init = async () => {
    const response = await fetch(new URL("index.html", base));
    if (!response.ok) throw new Error(`HTTP ${response.status} ao ler index.html`);
    const source = await response.text();
    definitions.forEach((definition) => {
      const section = document.createElement("section");
      const title = document.createElement("h2");
      title.textContent = definition.name;
      const output = document.createElement("output");
      output.textContent = "Aguardando fontes e renderização…";
      const wrap = document.createElement("div");
      wrap.className = "frame-wrap";
      const frame = document.createElement("iframe");
      frame.title = definition.name;
      frame.style.width = `${definition.width}px`;
      const test = { frame, output };
      cases.push(test);
      frame.addEventListener("load", async () => {
        const doc = frame.contentDocument;
        if (definition.largeText) doc.documentElement.style.fontSize = "200%";
        await doc.fonts.ready;
        frame.contentWindow.requestAnimationFrame(() => frame.contentWindow.requestAnimationFrame(() => measure(test)));
      });
      section.append(title, output, wrap);
      wrap.append(frame);
      document.getElementById("cenarios").append(section);
      frame.srcdoc = source.replace("<head>", `<head><base href="${base}">${hook}`);
    });
  };

  document.getElementById("reavaliar").addEventListener("click", () => cases.forEach(measure));
  init().catch((error) => {
    document.getElementById("cenarios").textContent = `Diagnóstico não concluído: ${error.message}`;
  });
})();
