/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-landing
 * Base block: hero
 * Source: https://www.wknd-trendsetters.site/
 * Selector: header.section.secondary-section
 *
 * Hero block structure:
 * Row 1: image grid (all hero images in one cell)
 * Row 2: heading + subheading + CTAs
 *
 * Source structure: two-column grid with H1, paragraph, buttons on left;
 * 3 images on right.
 */
export default function parse(element, { document }) {
  // Extract content from source DOM
  const heading = element.querySelector('h1, .h1-heading');
  const description = element.querySelector('.subheading, p.subheading');
  const buttons = Array.from(element.querySelectorAll('.button-group a.button'));
  const images = Array.from(element.querySelectorAll('.grid-layout img.cover-image'));

  const cells = [];

  // Row 1: all images in one cell for image grid
  if (images.length > 0) {
    cells.push([images]);
  }

  // Row 2: heading + description + CTAs
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  contentCell.push(...buttons);
  cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-landing', cells });
  element.replaceWith(block);
}
