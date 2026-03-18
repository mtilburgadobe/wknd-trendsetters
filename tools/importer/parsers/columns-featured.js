/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-featured
 * Base block: columns
 * Source: https://www.wknd-trendsetters.site/
 * Selector: main > section.section:nth-of-type(1) > .container > .grid-layout
 *
 * Columns block structure (from library):
 * Each row has 2 columns: [content | content]
 *
 * Source: image on left, breadcrumbs + heading + author info on right
 */
export default function parse(element, { document }) {
  // Left column: image
  const image = element.querySelector('img.cover-image');

  // Right column: heading + author info
  const heading = element.querySelector('.h2-heading, h2');
  const authorName = element.querySelector('.utility-text-black, .paragraph-sm.utility-text-black');
  const dateEl = element.querySelector('.utility-margin-top-0-5rem .utility-text-secondary');

  const rightContent = [];
  if (heading) rightContent.push(heading);
  if (authorName) {
    const byLine = document.createElement('p');
    byLine.textContent = `By ${authorName.textContent.trim()}`;
    rightContent.push(byLine);
  }
  if (dateEl) {
    const dateLine = document.createElement('p');
    dateLine.textContent = dateEl.textContent.trim();
    rightContent.push(dateLine);
  }

  const cells = [];
  cells.push([image || '', rightContent]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-featured', cells });
  element.replaceWith(block);
}
