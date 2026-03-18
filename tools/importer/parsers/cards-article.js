/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-article
 * Base block: cards
 * Sources:
 *   - https://www.wknd-trendsetters.site/ (homepage template)
 *     Selector: .section.secondary-section .grid-layout.desktop-4-column.grid-gap-md
 *   - https://www.wknd-trendsetters.site/blog (blog-index template)
 *     Selector: section#articles .grid-layout.desktop-4-column
 * Generated: 2026-03-18
 *
 * Cards block structure (from library):
 *   2 columns per row: [image | text content]
 *   Text content can include: title (heading), description, CTA (link)
 *
 * Source structure: article cards (4 on homepage, 6 on blog-index)
 *   Each card is an <a class="article-card card-link"> with:
 *     .article-card-image > img.cover-image
 *     .article-card-body > .article-card-meta > span.tag + span.paragraph-sm.utility-text-secondary (date)
 *     .article-card-body > h3.h4-heading
 */
export default function parse(element, { document }) {
  // Extract all article cards (from live DOM: a.article-card or a.card-link)
  const articleCards = Array.from(element.querySelectorAll('a.article-card, a.card-link'));

  const cells = [];

  articleCards.forEach((card) => {
    // Image (from live DOM: .article-card-image img.cover-image)
    const img = card.querySelector('.article-card-image img.cover-image, img.cover-image');

    // Category tag (from live DOM: .article-card-meta span.tag)
    const tag = card.querySelector('.article-card-meta .tag, .tag');

    // Date (from live DOM: .article-card-meta .paragraph-sm.utility-text-secondary)
    const date = card.querySelector('.article-card-meta .paragraph-sm.utility-text-secondary, .paragraph-sm.utility-text-secondary');

    // Heading (from live DOM: h3.h4-heading)
    const heading = card.querySelector('.h4-heading, h3');

    // Link href from the card anchor itself
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
