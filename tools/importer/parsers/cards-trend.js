/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-trend
 * Base block: cards
 * Source: https://www.wknd-trendsetters.site/fashion-trends-young-adults-casual-sport
 * Selector: #trends .grid-layout.desktop-4-column
 *
 * Cards block structure (from block library):
 * 2-column table, multiple rows (one per card)
 * Column 1: Image
 * Column 2: Text content (heading + description + optional CTA)
 *
 * Source structure: grid of <a class="trend-card"> links, each containing:
 * - .trend-card-image > img (card image)
 * - .trend-card-body > .tag (category), h3 (title), p (description)
 * Each card is wrapped in an <a> link to the destination URL.
 */
export default function parse(element, { document }) {
  // Each trend card is an <a> with class "trend-card" or "card-link"
  const cards = Array.from(element.querySelectorAll('a.trend-card, a.card-link'));

  const cells = [];

  cards.forEach((card) => {
    // Column 1: Image
    const img = card.querySelector('.trend-card-image img, img.cover-image');

    // Column 2: Text content - category tag, heading, description, and link
    const tag = card.querySelector('.tag, .trend-card-body span');
    const heading = card.querySelector('h3, .h4-heading, .trend-card-body h3');
    const description = card.querySelector('.trend-card-body p, p.paragraph-sm');

    const textCell = [];

    // Add category tag as an emphasized paragraph
    if (tag) {
      const tagEl = document.createElement('p');
      const em = document.createElement('em');
      em.textContent = tag.textContent.trim();
      tagEl.appendChild(em);
      textCell.push(tagEl);
    }

    if (heading) textCell.push(heading);
    if (description) textCell.push(description);

    // Preserve the card link as a CTA
    const href = card.getAttribute('href');
    if (href) {
      const link = document.createElement('a');
      link.setAttribute('href', href);
      link.textContent = heading ? heading.textContent.trim() : 'Read more';
      textCell.push(link);
    }

    // Build the row: [image, text content]
    const row = [];
    row.push(img || '');
    row.push(textCell);
    cells.push(row);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-trend', cells });
  element.replaceWith(block);
}
