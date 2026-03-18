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

  // tools/importer/import-blog-post.js
  var import_blog_post_exports = {};
  __export(import_blog_post_exports, {
    default: () => import_blog_post_default
  });

  // tools/importer/parsers/hero-article.js
  function parse(element, { document: document2 }) {
    const image = element.querySelector('img.cover-image, img[fetchpriority="high"]');
    const heading = element.querySelector("h1, h1.h2-heading, .h2-heading");
    const authorContainer = element.querySelector(".flex-horizontal.flex-gap-xxs");
    let authorText = null;
    if (authorContainer) {
      const parts = authorContainer.querySelectorAll(".paragraph-sm");
      if (parts.length >= 2) {
        authorText = document2.createElement("p");
        authorText.textContent = `${parts[0].textContent.trim()} ${parts[1].textContent.trim()}`;
      }
    }
    const metaRows = element.querySelectorAll(".flex-horizontal.flex-gap-xxs");
    let dateReadTime = null;
    if (metaRows.length >= 2) {
      const dateParts = metaRows[1].querySelectorAll(".paragraph-sm");
      if (dateParts.length > 0) {
        dateReadTime = document2.createElement("p");
        const texts = Array.from(dateParts).map((el) => el.textContent.trim());
        dateReadTime.textContent = texts.join(" ");
      }
    }
    const tagEl = element.querySelector(".tag");
    let categoryTag = null;
    if (tagEl) {
      categoryTag = document2.createElement("p");
      categoryTag.innerHTML = `<em>${tagEl.textContent.trim()}</em>`;
    }
    const cells = [];
    if (image) {
      cells.push([image]);
    }
    const contentWrapper = document2.createElement("div");
    if (heading) contentWrapper.append(heading);
    if (authorText) contentWrapper.append(authorText);
    if (dateReadTime) contentWrapper.append(dateReadTime);
    if (categoryTag) contentWrapper.append(categoryTag);
    cells.push([contentWrapper]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-article", cells });
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

  // tools/importer/import-blog-post.js
  var parsers = {
    "hero-article": parse
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "blog-post",
    description: "Individual blog article page with hero image, breadcrumb, article header with author and date, and long-form editorial content with lists and quotes",
    urls: [
      "https://www.wknd-trendsetters.site/blog/latest-trends-young-casual-fashion",
      "https://www.wknd-trendsetters.site/blog/fashion-trends-young-culture",
      "https://www.wknd-trendsetters.site/blog/fashion-trends-young-style",
      "https://www.wknd-trendsetters.site/blog/fashion-blog-post"
    ],
    blocks: [
      {
        name: "hero-article",
        instances: [".grid-layout.tablet-1-column.grid-gap-lg"]
      }
    ],
    sections: [
      {
        id: "section-1-blog-hero",
        name: "Blog Post Hero",
        selector: "main > section:first-child",
        style: null,
        blocks: ["hero-article"],
        defaultContent: []
      },
      {
        id: "section-2-blog-body",
        name: "Blog Post Body",
        selector: "main > section:nth-child(2)",
        style: null,
        blocks: [],
        defaultContent: [".blog-content h2", ".blog-content p", ".blog-content h3", ".blog-content ul", ".blog-content blockquote"]
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
  var import_blog_post_default = {
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
  return __toCommonJS(import_blog_post_exports);
})();
