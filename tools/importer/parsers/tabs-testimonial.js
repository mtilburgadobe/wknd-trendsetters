/* eslint-disable */
/* global WebImporter */

/**
 * Parser: tabs-testimonial
 * Base block: tabs
 * Source: https://www.wknd-trendsetters.site/
 * Selector: .tabs-wrapper
 *
 * Tabs block structure (from library):
 * Each row: [tab-label | tab-content]
 *
 * Source: 4 tab panes, each with image + name + role + quote.
 * Tab menu buttons have name + role as labels.
 */
export default function parse(element, { document }) {
  const tabPanes = Array.from(element.querySelectorAll('.tab-pane'));
  const tabButtons = Array.from(element.querySelectorAll('.tab-menu-link'));

  const cells = [];

  tabPanes.forEach((pane, i) => {
    // Tab label from button text
    const button = tabButtons[i];
    const labelName = button ? button.querySelector('strong') : null;
    const label = labelName ? labelName.textContent.trim() : `Tab ${i + 1}`;

    // Tab content: image, name, role, quote
    const img = pane.querySelector('img.cover-image');
    const name = pane.querySelector('.paragraph-xl strong');
    const role = pane.querySelector('.paragraph-xl + div');
    const quote = pane.querySelector('p.paragraph-xl');

    const content = [];
    if (img) content.push(img);
    if (name) {
      const nameEl = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = name.textContent.trim();
      nameEl.append(strong);
      content.push(nameEl);
    }
    if (role) {
      const roleEl = document.createElement('p');
      roleEl.textContent = role.textContent.trim();
      content.push(roleEl);
    }
    if (quote) content.push(quote);

    cells.push([label, content]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
