/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-feature
 * Base block: cards
 * Source: https://www.wknd-trendsetters.site/fashion-trends-young-adults
 * Selector: section.section:nth-of-type(1) .grid-layout.desktop-3-column
 * Generated: 2026-03-18
 *
 * Cards block structure (from library):
 * Each row: [image | text content (heading, description)]
 *
 * Source: 3 feature cards in a 3-column grid, each with:
 *   - img.cover-image.utility-aspect-3x2 (3:2 rounded image)
 *   - h2.h3-heading (card title)
 *   - p.paragraph-sm.utility-text-secondary (card description)
 * Each card is a direct child <div> of the grid container.
 */
export default function parse(element, { document }) {
  // Each card is a direct child div of the grid layout
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  const cells = [];

  cardDivs.forEach((card) => {
    // Extract image - from captured DOM: img.cover-image.utility-aspect-3x2
    const img = card.querySelector('img.cover-image');

    // Extract heading - from captured DOM: h2.h3-heading
    const heading = card.querySelector('h2, .h3-heading');

    // Extract description - from captured DOM: p.paragraph-sm.utility-text-secondary
    const description = card.querySelector('p.paragraph-sm, p.utility-text-secondary');

    // Build text content cell: heading + description (matching Cards library structure)
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);

    // Row: [image | text content]
    cells.push([img || '', contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-feature', cells });
  element.replaceWith(block);
}
