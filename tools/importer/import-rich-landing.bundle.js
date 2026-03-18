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

  // tools/importer/import-rich-landing.js
  var import_rich_landing_exports = {};
  __export(import_rich_landing_exports, {
    default: () => import_rich_landing_default
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

  // tools/importer/parsers/cards-feature.js
  function parse2(element, { document: document2 }) {
    const cardDivs = Array.from(element.querySelectorAll(":scope > div"));
    const cells = [];
    cardDivs.forEach((card) => {
      const img = card.querySelector("img.cover-image");
      const heading = card.querySelector("h2, .h3-heading");
      const description = card.querySelector("p.paragraph-sm, p.utility-text-secondary");
      const contentCell = [];
      if (heading) contentCell.push(heading);
      if (description) contentCell.push(description);
      cells.push([img || "", contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse3(element, { document: document2 }) {
    const articleCards = Array.from(element.querySelectorAll("a.article-card, a.card-link"));
    const cells = [];
    articleCards.forEach((card) => {
      const img = card.querySelector(".article-card-image img.cover-image, img.cover-image");
      const tag = card.querySelector(".article-card-meta .tag, .tag");
      const date = card.querySelector(".article-card-meta .paragraph-sm.utility-text-secondary, .paragraph-sm.utility-text-secondary");
      const heading = card.querySelector(".h4-heading, h3");
      const href = card.getAttribute("href");
      const contentCell = [];
      if (tag) {
        const tagEl = document2.createElement("p");
        tagEl.textContent = tag.textContent.trim();
        contentCell.push(tagEl);
      }
      if (date) {
        const dateEl = document2.createElement("p");
        dateEl.textContent = date.textContent.trim();
        contentCell.push(dateEl);
      }
      if (heading && href) {
        const link = document2.createElement("a");
        link.href = href;
        link.textContent = heading.textContent.trim();
        const h3 = document2.createElement("h3");
        h3.append(link);
        contentCell.push(h3);
      } else if (heading) {
        contentCell.push(heading);
      }
      cells.push([img || "", contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse4(element, { document: document2 }) {
    const images = Array.from(element.querySelectorAll(":scope > div img.cover-image"));
    const cells = [];
    images.forEach((img) => {
      cells.push([img, ""]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-gallery", cells });
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

  // tools/importer/import-rich-landing.js
  var parsers = {
    "hero-landing": parse,
    "cards-feature": parse2,
    "cards-article": parse3,
    "cards-gallery": parse4
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "rich-landing",
    description: "Feature-rich landing page with hero carousel, 3 feature cards, article feed, image gallery, and newsletter CTA",
    urls: [
      "https://www.wknd-trendsetters.site/fashion-trends-young-adults"
    ],
    blocks: [
      {
        name: "hero-landing",
        instances: ["header.section.secondary-section"]
      },
      {
        name: "cards-feature",
        instances: ["section.section:nth-of-type(1) .grid-layout.desktop-3-column"]
      },
      {
        name: "cards-article",
        instances: ["section.section#trends .grid-layout.desktop-4-column"]
      },
      {
        name: "cards-gallery",
        instances: ["section.section.secondary-section:nth-of-type(2) .grid-layout.desktop-4-column"]
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
        id: "section-2-cards-feature",
        name: "Feature Cards Section",
        selector: "section.section:nth-of-type(1)",
        style: null,
        blocks: ["cards-feature"],
        defaultContent: []
      },
      {
        id: "section-3-intro-text",
        name: "Intro Text Section",
        selector: "section.section.secondary-section:nth-of-type(1)",
        style: "secondary",
        blocks: [],
        defaultContent: [".utility-text-align-center .h2-heading", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-4-article-cards",
        name: "Article Cards Section",
        selector: "section.section#trends",
        style: null,
        blocks: ["cards-article"],
        defaultContent: [".utility-text-align-center .h2-heading"]
      },
      {
        id: "section-5-gallery",
        name: "Image Gallery Section",
        selector: "section.section.secondary-section:nth-of-type(2)",
        style: "secondary",
        blocks: ["cards-gallery"],
        defaultContent: [".utility-text-align-center .h2-heading", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-6-cta",
        name: "Call-to-Action Section",
        selector: "section.section.accent-section",
        style: "accent",
        blocks: [],
        defaultContent: [".utility-text-align-center .h2-heading", ".utility-text-align-center .paragraph-lg", ".button-group .button"]
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
  var import_rich_landing_default = {
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
  return __toCommonJS(import_rich_landing_exports);
})();
