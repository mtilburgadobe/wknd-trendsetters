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

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-landing.js
  function parse(element, { document: document2 }) {
    const heading = element.querySelector("h1, .h1-heading");
    const description = element.querySelector(".subheading, p.subheading");
    const buttons = Array.from(element.querySelectorAll(".button-group a.button"));
    const images = Array.from(element.querySelectorAll(".grid-layout img.cover-image"));
    const cells = [];
    if (images.length > 0) {
      cells.push([images]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    contentCell.push(...buttons);
    cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-landing", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-featured.js
  function parse2(element, { document: document2 }) {
    const image = element.querySelector("img.cover-image");
    const heading = element.querySelector(".h2-heading, h2");
    const authorName = element.querySelector(".utility-text-black, .paragraph-sm.utility-text-black");
    const dateEl = element.querySelector(".utility-margin-top-0-5rem .utility-text-secondary");
    const rightContent = [];
    if (heading) rightContent.push(heading);
    if (authorName) {
      const byLine = document2.createElement("p");
      byLine.textContent = `By ${authorName.textContent.trim()}`;
      rightContent.push(byLine);
    }
    if (dateEl) {
      const dateLine = document2.createElement("p");
      dateLine.textContent = dateEl.textContent.trim();
      rightContent.push(dateLine);
    }
    const cells = [];
    cells.push([image || "", rightContent]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-featured", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document: document2 }) {
    const images = Array.from(element.querySelectorAll(":scope > div img.cover-image"));
    const cells = [];
    images.forEach((img) => {
      cells.push([img, ""]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document: document2 }) {
    const tabPanes = Array.from(element.querySelectorAll(".tab-pane"));
    const tabButtons = Array.from(element.querySelectorAll(".tab-menu-link"));
    const cells = [];
    tabPanes.forEach((pane, i) => {
      const button = tabButtons[i];
      const labelName = button ? button.querySelector("strong") : null;
      const label = labelName ? labelName.textContent.trim() : `Tab ${i + 1}`;
      const img = pane.querySelector("img.cover-image");
      const name = pane.querySelector(".paragraph-xl strong");
      const role = pane.querySelector(".paragraph-xl + div");
      const quote = pane.querySelector("p.paragraph-xl");
      const content = [];
      if (img) content.push(img);
      if (name) {
        const nameEl = document2.createElement("p");
        const strong = document2.createElement("strong");
        strong.textContent = name.textContent.trim();
        nameEl.append(strong);
        content.push(nameEl);
      }
      if (role) {
        const roleEl = document2.createElement("p");
        roleEl.textContent = role.textContent.trim();
        content.push(roleEl);
      }
      if (quote) content.push(quote);
      cells.push([label, content]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document: document2 }) {
    const articleCards = Array.from(element.querySelectorAll("a.article-card"));
    const cells = [];
    articleCards.forEach((card) => {
      const img = card.querySelector(".article-card-image img.cover-image");
      const tag = card.querySelector(".tag");
      const date = card.querySelector(".paragraph-sm.utility-text-secondary");
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

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document: document2 }) {
    const faqItems = Array.from(element.querySelectorAll("details.faq-item"));
    const cells = [];
    faqItems.forEach((item) => {
      const summary = item.querySelector("summary.faq-question, summary");
      const answerDiv = item.querySelector(".faq-answer");
      let questionText = "";
      if (summary) {
        const span = summary.querySelector("span");
        if (span) {
          questionText = span.textContent.trim();
        } else {
          questionText = summary.textContent.trim();
        }
      }
      const answerParagraphs = answerDiv ? Array.from(answerDiv.querySelectorAll("p")) : [];
      const questionCell = [];
      if (questionText) {
        const p = document2.createElement("p");
        p.textContent = questionText;
        questionCell.push(p);
      }
      const answerCell = [];
      answerParagraphs.forEach((p) => {
        const para = document2.createElement("p");
        para.textContent = p.textContent.trim();
        answerCell.push(para);
      });
      cells.push([
        questionCell.length > 0 ? questionCell : "",
        answerCell.length > 0 ? answerCell : ""
      ]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse7(element, { document: document2 }) {
    const img = element.querySelector("img.cover-image");
    const heading = element.querySelector("h2, .h1-heading");
    const description = element.querySelector("p.subheading, .card-body p.subheading");
    const buttons = Array.from(element.querySelectorAll(".button-group a.button"));
    const cells = [];
    if (img) {
      cells.push([img]);
    }
    const contentCell = [];
    if (heading) {
      const h2 = document2.createElement("h2");
      h2.textContent = heading.textContent.trim();
      contentCell.push(h2);
    }
    if (description) {
      const p = document2.createElement("p");
      p.textContent = description.textContent.trim();
      contentCell.push(p);
    }
    buttons.forEach((btn) => {
      const link = document2.createElement("a");
      link.href = btn.getAttribute("href") || "#";
      link.textContent = btn.textContent.trim();
      const p = document2.createElement("p");
      p.append(link);
      contentCell.push(p);
    });
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-banner", cells });
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
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;
    const doc = element.ownerDocument || document;
    const sections = template.sections;
    if (hookName === H2.before) {
      for (let i = sections.length - 1; i >= 0; i--) {
        if (i === 0) continue;
        const section = sections[i];
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        const hr = doc.createElement("hr");
        sectionEl.before(hr);
      }
    }
    if (hookName === H2.after) {
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section.style) continue;
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        const metaBlock = WebImporter.Blocks.createBlock(doc, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        sectionEl.append(metaBlock);
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-landing": parse,
    "columns-featured": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-banner": parse7
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Homepage template for WKND Trendsetters site with hero, featured content, and promotional sections",
    urls: [
      "https://www.wknd-trendsetters.site/"
    ],
    blocks: [
      {
        name: "hero-landing",
        instances: ["header.section.secondary-section"]
      },
      {
        name: "columns-featured",
        instances: ["main > section.section:nth-of-type(1) > .container > .grid-layout"]
      },
      {
        name: "cards-gallery",
        instances: [".section.secondary-section .grid-layout.desktop-4-column.grid-gap-sm"]
      },
      {
        name: "tabs-testimonial",
        instances: [".tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: [".section.secondary-section .grid-layout.desktop-4-column.grid-gap-md"]
      },
      {
        name: "accordion-faq",
        instances: [".faq-list"]
      },
      {
        name: "hero-banner",
        instances: ["section.section.inverse-section"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "header.section.secondary-section",
        style: null,
        blocks: ["hero-landing"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Featured Story",
        selector: "main > section.section:nth-of-type(1)",
        style: null,
        blocks: ["columns-featured"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Image Gallery",
        selector: "main > section.section.secondary-section:nth-of-type(2)",
        style: "grey",
        blocks: ["cards-gallery"],
        defaultContent: [".utility-text-align-center .h2-heading", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "main > section.section:nth-of-type(3)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest Articles",
        selector: "main > section.section.secondary-section:nth-of-type(4)",
        style: "grey",
        blocks: ["cards-article"],
        defaultContent: [".utility-text-align-center .h2-heading", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "main > section.section:nth-of-type(5)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: [".grid-layout > div:first-child .h2-heading", ".grid-layout > div:first-child .subheading"]
      },
      {
        id: "section-7",
        name: "CTA Banner",
        selector: "section.section.inverse-section",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
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
  var import_homepage_default = {
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
  return __toCommonJS(import_homepage_exports);
})();
