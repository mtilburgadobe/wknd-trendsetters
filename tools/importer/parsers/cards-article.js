/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-article
 * Base block: cards
 * Source: https://www.wknd-trendsetters.site/
 * Selector: .section.secondary-section .grid-layout.desktop-4-column.grid-gap-md
 *
 * Cards block structure (from library):
 * Each row: [image | text content (heading, description, CTA)]
 *
 * Source: 4 article cards, each with image, tag, date, heading, linked
 */
export default function parse(element, { document }) {
  const articleCards = Array.from(element.querySelectorAll('a.article-card'));

  const cells = [];

  articleCards.forEach((card) => {
    const img = card.querySelector('.article-card-image img.cover-image');
    const tag = card.querySelector('.tag');
    const date = card.querySelector('.paragraph-sm.utility-text-secondary');
    const heading = card.querySelector('.h4-heading, h3');
    const href = card.getAttribute('href');

    const contentCell = [];

    if (tag) {
      const tagEl = document.createElement('p');
      tagEl.textContent = tag.textContent.trim();
      contentCell.push(tagEl);
    }
    if (date) {
      const dateEl = document.createElement('p');
      dateEl.textContent = date.textContent.trim();
      contentCell.push(dateEl);
    }
    if (heading && href) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = heading.textContent.trim();
      const h3 = document.createElement('h3');
      h3.append(link);
      contentCell.push(h3);
    } else if (heading) {
      contentCell.push(heading);
    }

    cells.push([img || '', contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
