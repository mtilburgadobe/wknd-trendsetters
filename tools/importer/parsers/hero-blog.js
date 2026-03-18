/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-blog
 * Base block: hero
 * Source: https://www.wknd-trendsetters.site/blog
 * Selector: header.section.secondary-section > .container > .grid-layout
 * Generated: 2026-03-18
 *
 * Hero block structure (from library - 1 column):
 *   Row 1: Background image (optional)
 *   Row 2: Title (heading) + Subheading (text) + CTA buttons (all in single cell)
 *
 * Live DOM structure:
 *   header.section.secondary-section > .container > .grid-layout
 *     div > h1.h1-heading + p.subheading + div.button-group > a.button (x2)
 *     div > .grid-layout > img.cover-image
 */
export default function parse(element, { document }) {
  // Extract hero image (from live DOM: img.cover-image nested in second child div)
  const heroImage = element.querySelector('img.cover-image, img[class*="cover"]');

  // Extract heading (from live DOM: h1.h1-heading)
  const heading = element.querySelector('h1, h2, .h1-heading');

  // Extract subheading/description (from live DOM: p.subheading)
  const description = element.querySelector('p.subheading, p[class*="subheading"]');

  // Extract CTA buttons (from live DOM: .button-group a.button)
  const ctaButtons = Array.from(element.querySelectorAll('.button-group a.button, .button-group a'));

  // Build cells matching Hero block library structure (single column)
  const cells = [];

  // Row 1: Hero image (single cell)
  if (heroImage) {
    cells.push([heroImage]);
  }

  // Row 2: All content in a single cell (heading + description + CTAs)
  // Wrap in a container div so all elements stay in one cell
  const contentContainer = document.createElement('div');
  if (heading) contentContainer.append(heading);
  if (description) contentContainer.append(description);
  ctaButtons.forEach((btn) => contentContainer.append(btn));
  cells.push([contentContainer]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-blog', cells });
  element.replaceWith(block);
}
