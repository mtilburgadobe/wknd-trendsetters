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

  // tools/importer/import-case-studies.js
  var import_case_studies_exports = {};
  __export(import_case_studies_exports, {
    default: () => import_case_studies_default
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
      const label = labelName ? labelName.textContent.trim() : "Tab " + (i + 1);
      const img = pane.querySelector("img.cover-image");
      const name = pane.querySelector(".paragraph-xl strong, .paragraph-xl.utility-margin-bottom-0 strong");
      const role = pane.querySelector(".paragraph-xl.utility-margin-bottom-0 + div, .paragraph-xl + div");
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

  // tools/importer/parsers/hero-banner.js
  function parse5(element, { document: document2 }) {
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

  // tools/importer/import-case-studies.js
  var parsers = {
    "hero-landing": parse,
    "columns-featured": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "hero-banner": parse5
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "case-studies",
    description: "Case study showcase page with hero, breadcrumb, author metadata, image gallery, tabbed testimonials, and CTA banner",
    urls: [
      "https://www.wknd-trendsetters.site/case-studies"
    ],
    blocks: [
      {
        name: "hero-landing",
        instances: ["header.section.secondary-section"]
      },
      {
        name: "columns-featured",
        instances: ["main > section.section:nth-of-type(1) > .container > .grid-layout.tablet-1-column"]
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
        name: "hero-banner",
        instances: ["section.section.inverse-section"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "header.section.secondary-section",
        style: "light",
        blocks: ["hero-landing"],
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
        name: "Image Gallery",
        selector: "section.section.secondary-section",
        style: "light",
        blocks: ["cards-gallery"],
        defaultContent: [".utility-text-align-center .h2-heading", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "section.section#cases",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "CTA Banner",
        selector: "section.section.inverse-section",
        style: "dark",
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
  var import_case_studies_default = {
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
  return __toCommonJS(import_case_studies_exports);
})();
