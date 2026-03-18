var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-landing-trend-cards.js
  var import_landing_trend_cards_exports = {};
  __export(import_landing_trend_cards_exports, {
    default: () => import_landing_trend_cards_default
  });

  // tools/importer/parsers/hero-landing.js
  function parse(element, { document: document2 }) {
    const images = Array.from(element.querySelectorAll(".grid-layout img.cover-image, img.cover-image"));
    const heading = element.querySelector("h1, .h1-heading");
    const subheading = element.querySelector(".subheading, p.subheading");
    const descriptionParagraphs = Array.from(element.querySelectorAll("p")).filter((p) => {
      if (p === subheading) return false;
      if (p.closest(".button-group")) return false;
      if (p.classList.contains("subheading")) return false;
      const text = p.textContent.trim();
      return text.length > 0 && !p.querySelector("a.button");
    });
    const buttons = Array.from(element.querySelectorAll(".button-group a.button, a.button"));
    const cells = [];
    if (images.length > 0) {
      const imageCell = document2.createElement("div");
      images.forEach((img) => imageCell.append(img));
      cells.push([imageCell]);
    }
    const contentContainer = document2.createElement("div");
    if (heading) contentContainer.append(heading);
    if (subheading) contentContainer.append(subheading);
    descriptionParagraphs.forEach((p) => contentContainer.append(p));
    buttons.forEach((btn) => {
      const p = document2.createElement("p");
      p.append(btn);
      contentContainer.append(p);
    });
    cells.push([contentContainer]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-landing", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-trend.js
  function parse2(element, { document: document2 }) {
    const cards = Array.from(element.querySelectorAll("a.trend-card, a.card-link"));
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".trend-card-image img, img.cover-image");
      const tag = card.querySelector(".tag, .trend-card-body span");
      const heading = card.querySelector("h3, .h4-heading, .trend-card-body h3");
      const description = card.querySelector(".trend-card-body p, p.paragraph-sm");
      const textCell = [];
      if (tag) {
        const tagEl = document2.createElement("p");
        const em = document2.createElement("em");
        em.textContent = tag.textContent.trim();
        tagEl.appendChild(em);
        textCell.push(tagEl);
      }
      if (heading) textCell.push(heading);
      if (description) textCell.push(description);
      const href = card.getAttribute("href");
      if (href) {
        const link = document2.createElement("a");
        link.setAttribute("href", href);
        link.textContent = heading ? heading.textContent.trim() : "Read more";
        textCell.push(link);
      }
      const row = [];
      row.push(img || "");
      row.push(textCell);
      cells.push(row);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-trend", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-cta.js
  function parse3(element, { document: document2 }) {
    const columnDivs = Array.from(element.querySelectorAll(":scope > div"));
    const imageDiv = columnDivs[0];
    const img = imageDiv ? imageDiv.querySelector("img.cover-image, img") : null;
    const textDiv = columnDivs[1];
    const heading = textDiv ? textDiv.querySelector("h2, .h2-heading") : null;
    const description = textDiv ? textDiv.querySelector("p.paragraph-lg, p") : null;
    const cta = textDiv ? textDiv.querySelector(".button-group a.button, a.button") : null;
    const textCell = [];
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);
    if (cta) textCell.push(cta);
    const cells = [
      [img || "", textCell]
    ];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        ".skip-link",
        ".nav-mobile-menu-button"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        ".navbar",
        "footer.footer",
        "link",
        "noscript"
      ]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const doc = element.ownerDocument || document;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(metaBlock);
        }
        if (i > 0) {
          const hr = doc.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-landing-trend-cards.js
  var parsers = {
    "hero-landing": parse,
    "cards-trend": parse2,
    "columns-cta": parse3
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "landing-trend-cards",
    description: "Category landing page with hero section, 8-card trend category grid, promotional CTA, and newsletter signup",
    urls: [
      "https://www.wknd-trendsetters.site/fashion-trends-young-adults-casual-sport",
      "https://www.wknd-trendsetters.site/fashion-trends-of-the-season"
    ],
    blocks: [
      {
        name: "hero-landing",
        instances: ["header.section.secondary-section"]
      },
      {
        name: "cards-trend",
        instances: ["#trends .grid-layout.desktop-4-column"]
      },
      {
        name: "columns-cta",
        instances: ["section.section.secondary-section .grid-layout"]
      }
    ],
    sections: [
      {
        id: "section-1-hero",
        name: "Hero Section",
        selector: "header.section.secondary-section",
        style: "secondary",
        blocks: ["hero-landing"],
        defaultContent: []
      },
      {
        id: "section-2-trend-cards",
        name: "Trend Cards Grid Section",
        selector: "section#trends",
        style: null,
        blocks: ["cards-trend"],
        defaultContent: ["#trends .utility-text-align-center .h2-heading", "#trends .utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-3-columns-cta",
        name: "Columns CTA Section",
        selector: "section.section.secondary-section",
        style: "secondary",
        blocks: ["columns-cta"],
        defaultContent: []
      },
      {
        id: "section-4-cta-banner",
        name: "CTA Banner Section",
        selector: "section.section.accent-section",
        style: "accent",
        blocks: [],
        defaultContent: ["section.accent-section .h2-heading", "section.accent-section .paragraph-lg", "section.accent-section .button"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_landing_trend_cards_default = {
    transform: (payload) => {
      const { document: document2, url, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path: path || "/index",
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_landing_trend_cards_exports);
})();
