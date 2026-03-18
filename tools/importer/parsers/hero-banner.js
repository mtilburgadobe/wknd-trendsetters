/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-banner
 * Base block: hero
 * Source: https://www.wknd-trendsetters.site/
 * Selector: section.section.inverse-section
 *
 * Hero block structure (from library):
 * Row 1: [background image]
 * Row 2: [heading, subheading, CTA button(s)]
 *
 * Source: Full-width dark overlay section with background image, H2 heading, paragraph, and CTA button
 */
export default function parse(element, { document }) {
  const img = element.querySelector('img.cover-image');
  const heading = element.querySelector('h2, .h1-heading');
  const description = element.querySelector('p.subheading, .card-body p.subheading');
  const buttons = Array.from(element.querySelectorAll('.button-group a.button'));

  const cells = [];

  // Row 1: Background image
  if (img) {
    cells.push([img]);
  }

  // Row 2: Heading, description, CTA buttons
  const contentCell = [];
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    contentCell.push(h2);
  }
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    contentCell.push(p);
  }
  buttons.forEach((btn) => {
    const link = document.createElement('a');
    link.href = btn.getAttribute('href') || '#';
    link.textContent = btn.textContent.trim();
    const p = document.createElement('p');
    p.append(link);
    contentCell.push(p);
  });

  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
