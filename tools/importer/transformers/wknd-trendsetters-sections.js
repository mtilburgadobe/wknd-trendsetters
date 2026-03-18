/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters section breaks and section-metadata.
 * Adds <hr> between sections and section-metadata blocks for styled sections.
 * Runs in afterTransform only, uses payload.template.sections.
 * Selectors from captured DOM of https://www.wknd-trendsetters.site/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  const { template } = payload;
  if (!template || !template.sections || template.sections.length < 2) return;

  const doc = element.ownerDocument || document;
  const sections = template.sections;

  if (hookName === H.before) {
    // Insert <hr> section breaks BEFORE parsers run (elements still exist)
    // Process in reverse to preserve DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      if (i === 0) continue; // No break before first section
      const section = sections[i];
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];

      let sectionEl = null;
      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }
      if (!sectionEl) continue;

      const hr = doc.createElement('hr');
      sectionEl.before(hr);
    }
  }

  if (hookName === H.after) {
    // Add section-metadata blocks AFTER parsers run (for styled sections)
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
        name: 'Section Metadata',
        cells: { style: section.style },
      });
      sectionEl.append(metaBlock);
    }
  }
}
