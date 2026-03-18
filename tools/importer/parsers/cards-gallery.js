/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-gallery
 * Base block: cards
 * Source: https://www.wknd-trendsetters.site/case-studies
 * Selector: .section.secondary-section .grid-layout.desktop-4-column.grid-gap-sm
 * Generated: 2026-03-18
 *
 * Cards block structure (from library):
 *   2 columns per row: [image | text content]
 *   For gallery variant: image-only cards, each row is [image | ""]
 *
 * Source structure: 4x2 grid of 8 square images (no text)
 *   Each child div contains .utility-aspect-1x1 > img.cover-image
 */
export default function parse(element, { document }) {
  // Extract all gallery images (from captured DOM: :scope > div img.cover-image)
  const images = Array.from(element.querySelectorAll(':scope > div img.cover-image'));

  const cells = [];
  images.forEach((img) => {
    // Each card: [image | empty text cell]
    cells.push([img, '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
