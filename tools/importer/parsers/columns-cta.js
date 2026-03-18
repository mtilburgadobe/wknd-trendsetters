/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-cta
 * Base block: columns
 * Source: https://www.wknd-trendsetters.site/fashion-trends-young-adults-casual-sport
 * Selector: section.section.secondary-section .grid-layout
 *
 * Columns block structure (from block library):
 * Multi-column table, 1 content row
 * Column 1: Image
 * Column 2: H2 heading + description paragraph + CTA button
 *
 * Source structure: .grid-layout with two child divs:
 * - div 1: img.cover-image (bustling-pub.avif)
 * - div 2: h2.h2-heading + p.paragraph-lg + .button-group > a.button
 */
export default function parse(element, { document }) {
  // The grid-layout has two direct child divs representing the two columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Column 1: Image
  const imageDiv = columnDivs[0];
  const img = imageDiv ? imageDiv.querySelector('img.cover-image, img') : null;

  // Column 2: Text content (heading, description, CTA)
  const textDiv = columnDivs[1];
  const heading = textDiv ? textDiv.querySelector('h2, .h2-heading') : null;
  const description = textDiv ? textDiv.querySelector('p.paragraph-lg, p') : null;
  const cta = textDiv ? textDiv.querySelector('.button-group a.button, a.button') : null;

  const textCell = [];
  if (heading) textCell.push(heading);
  if (description) textCell.push(description);
  if (cta) textCell.push(cta);

  const cells = [
    [img || '', textCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-cta', cells });
  element.replaceWith(block);
}
