/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-featured
 * Base block: columns
 * Sources:
 *   - https://www.wknd-trendsetters.site/blog (blog-index template)
 *     Selector: main > section.section:nth-of-type(1) .grid-layout
 *   - https://www.wknd-trendsetters.site/ (homepage template)
 *     Selector: main > section.section:nth-of-type(1) > .container > .grid-layout
 * Generated: 2026-03-18
 *
 * Columns block structure (from library):
 *   N rows, 2+ columns per row: [content | content]
 *
 * Blog-index live DOM:
 *   .grid-layout > div > img.cover-image
 *   .grid-layout > div > .flex-horizontal > span.tag + span.paragraph-sm.utility-text-secondary
 *                      + h2.h2-heading + p.paragraph-lg + .button-group > a.button
 *
 * Homepage live DOM:
 *   .grid-layout > div > img.cover-image
 *   .grid-layout > div > .breadcrumbs + h2.h2-heading
 *                      + .flex-horizontal > "By" + author name
 *                      + .flex-horizontal.utility-margin-top-0-5rem > date + bullet + read time
 */
export default function parse(element, { document }) {
  // Left column: featured image (shared across templates)
  const image = element.querySelector('img.cover-image, img[class*="cover"]');

  // Build right column content
  const rightContent = [];

  // --- Breadcrumbs (homepage: .breadcrumbs a.text-link) ---
  const breadcrumbLinks = Array.from(element.querySelectorAll('.breadcrumbs a.text-link, .breadcrumbs a'));
  if (breadcrumbLinks.length > 0) {
    const breadcrumbP = document.createElement('p');
    breadcrumbLinks.forEach((link, idx) => {
      if (idx > 0) breadcrumbP.append(document.createTextNode(' > '));
      breadcrumbP.append(link);
    });
    rightContent.push(breadcrumbP);
  }

  // --- Tag + Date (blog-index only: .flex-horizontal contains span.tag + date span) ---
  const tag = element.querySelector('.flex-horizontal span.tag');
  if (tag) {
    const tagP = document.createElement('p');
    tagP.textContent = tag.textContent.trim();
    rightContent.push(tagP);

    // Date is sibling span in the same flex container
    const tagContainer = tag.closest('.flex-horizontal');
    const dateEl = tagContainer
      ? tagContainer.querySelector('.paragraph-sm.utility-text-secondary')
      : null;
    if (dateEl) {
      const dateP = document.createElement('p');
      dateP.textContent = dateEl.textContent.trim();
      rightContent.push(dateP);
    }
  }

  // --- Heading (shared: .h2-heading, h2) ---
  const heading = element.querySelector('.h2-heading, h2');
  if (heading) rightContent.push(heading);

  // --- Author byline (homepage: .utility-text-black after "By" label) ---
  const authorName = element.querySelector('.paragraph-sm.utility-text-black');
  if (authorName) {
    const byLine = document.createElement('p');
    byLine.textContent = 'By ' + authorName.textContent.trim();
    rightContent.push(byLine);
  }

  // --- Read time metadata (homepage: .flex-horizontal.utility-margin-top-0-5rem > spans) ---
  const readTimeContainer = element.querySelector('.flex-horizontal.utility-margin-top-0-5rem');
  if (readTimeContainer) {
    const metaSpans = Array.from(readTimeContainer.querySelectorAll('.paragraph-sm'));
    if (metaSpans.length > 0) {
      const metaLine = document.createElement('p');
      metaLine.textContent = metaSpans.map((el) => el.textContent.trim()).filter(Boolean).join(' ');
      rightContent.push(metaLine);
    }
  }

  // --- Description paragraph (blog-index: p.paragraph-lg) ---
  const description = element.querySelector('p.paragraph-lg');
  if (description) rightContent.push(description);

  // --- CTA link/button (blog-index: .button-group a.button) ---
  const ctaLink = element.querySelector('.button-group a.button');
  if (ctaLink) rightContent.push(ctaLink);

  const cells = [];
  // Single row with 2 columns: [image | text content]
  cells.push([image || '', rightContent]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-featured', cells });
  element.replaceWith(block);
}
