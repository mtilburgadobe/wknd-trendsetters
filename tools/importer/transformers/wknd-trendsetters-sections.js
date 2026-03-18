/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters section breaks and section-metadata.
 * Adds <hr> between sections and section-metadata blocks for styled sections.
 * Runs in afterTransform only, uses payload.template.sections.
 * Selectors from captured DOM of https://www.wknd-trendsetters.site/
 *
 * Homepage sections (7 total):
 *   section-1: Hero (header.section.secondary-section) - no style
 *   section-2: Featured Story (main > section.section:nth-of-type(1)) - no style
 *   section-3: Image Gallery (main > section.section.secondary-section:nth-of-type(2)) - style: grey
 *   section-4: Testimonials (main > section.section:nth-of-type(3)) - no style
 *   section-5: Latest Articles (main > section.section.secondary-section:nth-of-type(4)) - style: grey
 *   section-6: FAQ (main > section.section:nth-of-type(5)) - no style
 *   section-7: CTA Banner (section.section.inverse-section) - no style
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.after) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const doc = element.ownerDocument || document;
    const sections = template.sections;

    // Process in reverse order to preserve DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];

      let sectionEl = null;
      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }
      if (!sectionEl) continue;

      // Add section-metadata block for sections with a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(metaBlock);
      }

      // Add <hr> before each section except the first
      if (i > 0) {
        const hr = doc.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
