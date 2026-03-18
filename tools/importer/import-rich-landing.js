/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroLandingParser from './parsers/hero-landing.js';
import cardsFeatureParser from './parsers/cards-feature.js';
import cardsArticleParser from './parsers/cards-article.js';
import cardsGalleryParser from './parsers/cards-gallery.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-landing': heroLandingParser,
  'cards-feature': cardsFeatureParser,
  'cards-article': cardsArticleParser,
  'cards-gallery': cardsGalleryParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'rich-landing',
  description: 'Feature-rich landing page with hero carousel, 3 feature cards, article feed, image gallery, and newsletter CTA',
  urls: [
    'https://www.wknd-trendsetters.site/fashion-trends-young-adults',
  ],
  blocks: [
    {
      name: 'hero-landing',
      instances: ['header.section.secondary-section'],
    },
    {
      name: 'cards-feature',
      instances: ['section.section:nth-of-type(1) .grid-layout.desktop-3-column'],
    },
    {
      name: 'cards-article',
      instances: ['section.section#trends .grid-layout.desktop-4-column'],
    },
    {
      name: 'cards-gallery',
      instances: ['section.section.secondary-section:nth-of-type(2) .grid-layout.desktop-4-column'],
    },
  ],
  sections: [
    {
      id: 'section-1-hero',
      name: 'Hero Section',
      selector: 'header.section.secondary-section',
      style: 'secondary',
      blocks: ['hero-landing'],
      defaultContent: [],
    },
    {
      id: 'section-2-cards-feature',
      name: 'Feature Cards Section',
      selector: 'section.section:nth-of-type(1)',
      style: null,
      blocks: ['cards-feature'],
      defaultContent: [],
    },
    {
      id: 'section-3-intro-text',
      name: 'Intro Text Section',
      selector: 'section.section.secondary-section:nth-of-type(1)',
      style: 'secondary',
      blocks: [],
      defaultContent: ['.utility-text-align-center .h2-heading', '.utility-text-align-center .paragraph-lg'],
    },
    {
      id: 'section-4-article-cards',
      name: 'Article Cards Section',
      selector: 'section.section#trends',
      style: null,
      blocks: ['cards-article'],
      defaultContent: ['.utility-text-align-center .h2-heading'],
    },
    {
      id: 'section-5-gallery',
      name: 'Image Gallery Section',
      selector: 'section.section.secondary-section:nth-of-type(2)',
      style: 'secondary',
      blocks: ['cards-gallery'],
      defaultContent: ['.utility-text-align-center .h2-heading', '.utility-text-align-center .paragraph-lg'],
    },
    {
      id: 'section-6-cta',
      name: 'Call-to-Action Section',
      selector: 'section.section.accent-section',
      style: 'accent',
      blocks: [],
      defaultContent: ['.utility-text-align-center .h2-heading', '.utility-text-align-center .paragraph-lg', '.button-group .button'],
    },
  ],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path: path || '/index',
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
