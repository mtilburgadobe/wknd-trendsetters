/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-gallery
 * Base block: cards
 * Source: https://www.wknd-trendsetters.site/
 * Selector: .section.secondary-section .grid-layout.desktop-4-column.grid-gap-sm
 *
 * Cards block structure (from library):
 * Each row: [image | text content]
 * For gallery variant: image-only cards, so each row is [image | ""]
 *
 * Source: 4x2 grid of 8 square images with no text
 */
export default function parse(element, { document }) {
  const images = Array.from(element.querySelectorAll(':scope > div img.cover-image'));

  const cells = [];
  images.forEach((img) => {
    cells.push([img, '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
