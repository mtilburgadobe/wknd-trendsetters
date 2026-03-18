/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns
 * Base block: columns
 * Source: https://www.wknd-trendsetters.site/faq
 * Selector: section.section.secondary-section .grid-layout
 * Generated: 2026-03-18
 *
 * Columns block structure (from library):
 *   Multiple columns per row, first row is block name (auto-generated).
 *   Each subsequent row has N cells matching the visual column count.
 *   Each cell can contain text, images, links, or other inline elements.
 *
 * Source structure (FAQ contact section):
 *   .grid-layout with 2 child divs:
 *   - Left: h2 heading (.h2-heading) + description paragraph (.paragraph-lg)
 *   - Right: .contact-items with h3 labels (.h6-heading) and values (links, paragraphs)
 *     - Email: h3 + <a href="mailto:..."> (link not wrapped in <p>)
 *     - Phone: h3 + <a href="tel:..."> (link not wrapped in <p>)
 *     - Address: h3 + <p> (plain text)
 */
export default function parse(element, { document }) {
  // Get the direct column children of the grid-layout
  // Source DOM: .grid-layout > div (each div is a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  const cells = [];

  if (columnDivs.length > 0) {
    // Build one row with N columns matching the source layout
    const row = columnDivs.map((colDiv) => {
      const cellContainer = document.createElement('div');

      // Walk through meaningful content elements in document order
      // Source has: h2, h3 (.h6-heading), p (.paragraph-lg), a (.paragraph-lg)
      const contentEls = Array.from(colDiv.querySelectorAll('h2, h3, p, a'));

      contentEls.forEach((el) => {
        // Skip links that are inside a <p> (they will be handled with their parent <p>)
        if (el.tagName === 'A' && el.closest('p')) return;

        if (el.tagName === 'H2' || el.tagName === 'H3') {
          const heading = document.createElement(el.tagName.toLowerCase());
          heading.textContent = el.textContent.trim();
          cellContainer.append(heading);
        } else if (el.tagName === 'P') {
          const p = document.createElement('p');
          // Preserve links inside paragraphs
          const link = el.querySelector('a');
          if (link) {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.textContent.trim();
            p.append(a);
          } else {
            p.textContent = el.textContent.trim();
          }
          if (p.textContent.trim() || p.querySelector('a')) {
            cellContainer.append(p);
          }
        } else if (el.tagName === 'A') {
          // Standalone link (not inside a <p>), e.g. email/phone links
          const p = document.createElement('p');
          const a = document.createElement('a');
          a.href = el.href;
          a.textContent = el.textContent.trim();
          p.append(a);
          cellContainer.append(p);
        }
      });

      return cellContainer;
    });

    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns', cells });
  element.replaceWith(block);
}
