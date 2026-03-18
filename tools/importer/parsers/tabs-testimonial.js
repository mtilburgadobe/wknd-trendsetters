/* eslint-disable */
/* global WebImporter */

/**
 * Parser: tabs-testimonial
 * Base block: tabs
 * Source: https://www.wknd-trendsetters.site/case-studies
 * Selector: .tabs-wrapper
 * Generated: 2026-03-18
 *
 * Tabs block structure (from library):
 *   2 columns per row: [tab-label | tab-content]
 *   Each row represents a single tab
 *
 * Source structure:
 *   .tabs-content contains .tab-pane elements (4 total)
 *   Each pane: grid with img.cover-image, .paragraph-xl strong (name),
 *     div after name (role), p.paragraph-xl (quote)
 *   .tab-menu contains .tab-menu-link buttons with strong (name)
 */
export default function parse(element, { document }) {
  const tabPanes = Array.from(element.querySelectorAll('.tab-pane'));
  const tabButtons = Array.from(element.querySelectorAll('.tab-menu-link'));

  const cells = [];

  tabPanes.forEach((pane, i) => {
    // Tab label: person name from button (from captured DOM: .tab-menu-link strong)
    const button = tabButtons[i];
    const labelName = button ? button.querySelector('strong') : null;
    const label = labelName ? labelName.textContent.trim() : 'Tab ' + (i + 1);

    // Tab content extraction from pane
    // Image (from captured DOM: img.cover-image)
    const img = pane.querySelector('img.cover-image');

    // Name (from captured DOM: .paragraph-xl strong, .paragraph-xl.utility-margin-bottom-0 strong)
    const name = pane.querySelector('.paragraph-xl strong, .paragraph-xl.utility-margin-bottom-0 strong');

    // Role (from captured DOM: div after .paragraph-xl.utility-margin-bottom-0)
    const role = pane.querySelector('.paragraph-xl.utility-margin-bottom-0 + div, .paragraph-xl + div');

    // Quote (from captured DOM: p.paragraph-xl — the paragraph, not the div with name)
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
