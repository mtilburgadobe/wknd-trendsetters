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

  // tools/importer/import-blog-index.js
  var import_blog_index_exports = {};
  __export(import_blog_index_exports, {
    default: () => import_blog_index_default
  });

  // tools/importer/parsers/hero-blog.js
  function parse(element, { document: document2 }) {
    const heroImage = element.querySelector('img.cover-image, img[class*="cover"]');
    const heading = element.querySelector("h1, h2, .h1-heading");
    const description = element.querySelector('p.subheading, p[class*="subheading"]');
    const ctaButtons = Array.from(element.querySelectorAll(".button-group a.button, .button-group a"));
    const cells = [];
    if (heroImage) {
      cells.push([heroImage]);
    }
    const contentContainer = document2.createElement("div");
    if (heading) contentContainer.append(heading);
    if (description) contentContainer.append(description);
    ctaButtons.forEach((btn) => contentContainer.append(btn));
    cells.push([contentContainer]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-blog", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-featured.js
  function parse2(element, { document: document2 }) {
    const image = element.querySelector('img.cover-image, img[class*="cover"]');
    const rightContent = [];
    const breadcrumbLinks = Array.from(element.querySelectorAll(".breadcrumbs a.text-link, .breadcrumbs a"));
    if (breadcrumbLinks.length > 0) {
      const breadcrumbP = document2.createElement("p");
      breadcrumbLinks.forEach((link, idx) => {
        if (idx > 0) breadcrumbP.append(document2.createTextNode(" > "));
        breadcrumbP.append(link);
      });
      rightContent.push(breadcrumbP);
    }
    const tag = element.querySelector(".flex-horizontal span.tag");
    if (tag) {
      const tagP = document2.createElement("p");
      tagP.textContent = tag.textContent.trim();
      rightContent.push(tagP);
      const tagContainer = tag.closest(".flex-horizontal");
      const dateEl = tagContainer ? tagContainer.querySelector(".paragraph-sm.utility-text-secondary") : null;
      if (dateEl) {
        const dateP = document2.createElement("p");
        dateP.textContent = dateEl.textContent.trim();
        rightContent.push(dateP);
      }
    }
    const heading = element.querySelector(".h2-heading, h2");
    if (heading) rightContent.push(heading);
    const authorName = element.querySelector(".paragraph-sm.utility-text-black");
    if (authorName) {
      const byLine = document2.createElement("p");
      byLine.textContent = "By " + authorName.textContent.trim();
      rightContent.push(byLine);
    }
    const readTimeContainer = element.querySelector(".flex-horizontal.utility-margin-top-0-5rem");
    if (readTimeContainer) {
      const metaSpans = Array.from(readTimeContainer.querySelectorAll(".paragraph-sm"));
      if (metaSpans.length > 0) {
        const metaLine = document2.createElement("p");
        metaLine.textContent = metaSpans.map((el) => el.textContent.trim()).filter(Boolean).join(" ");
        rightContent.push(metaLine);
      }
    }
    const description = element.querySelector("p.paragraph-lg");
    if (description) rightContent.push(description);
    const ctaLink = element.querySelector(".button-group a.button");
    if (ctaLink) rightContent.push(ctaLink);
    const cells = [];
    cells.push([image || "", rightContent]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-featured", cells });
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

  // tools/importer/import-blog-index.js
  var parsers = {
    "hero-blog": parse,
    "columns-featured": parse2,
    "cards-article": parse3
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "blog-index",
    description: "Blog listing page with hero, featured article card, article card grid, image gallery, and newsletter CTA",
    urls: [
      "https://www.wknd-trendsetters.site/blog",
      "https://www.wknd-trendsetters.site/fashion-insights"
    ],
    blocks: [
      {
        name: "hero-blog",
        instances: ["header.section.secondary-section > .container > .grid-layout"]
      },
      {
        name: "columns-featured",
        instances: ["main > section.section:nth-of-type(1) .grid-layout"]
      },
      {
        name: "cards-article",
        instances: ["section#articles .grid-layout.desktop-4-column"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "header.section.secondary-section",
        style: null,
        blocks: ["hero-blog"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Featured Article",
        selector: "main > section.section:nth-of-type(1)",
        style: null,
        blocks: ["columns-featured"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Latest Articles Grid",
        selector: ["section#articles", "section.section.secondary-section#articles"],
        style: null,
        blocks: ["cards-article"],
        defaultContent: [".utility-text-align-center .h2-heading", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-4",
        name: "Subscribe CTA",
        selector: "section.section.accent-section",
        style: "accent",
        blocks: [],
        defaultContent: [".utility-text-align-center .h2-heading", ".utility-text-align-center .paragraph-lg", ".utility-text-align-center .button-group .button"]
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
  var import_blog_index_default = {
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
  return __toCommonJS(import_blog_index_exports);
})();
