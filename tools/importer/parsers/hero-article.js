/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-article
 * Base block: hero
 * Source: https://www.wknd-trendsetters.site/blog/latest-trends-young-casual-fashion
 * Selector: .grid-layout.tablet-1-column.grid-gap-lg
 *
 * Hero block structure (from Block Collection):
 * Row 1: Background/hero image
 * Row 2: Title (heading) + additional text content
 *
 * Source structure: two-column grid layout with hero image on left,
 * article metadata on right (breadcrumbs, H1 title, author byline,
 * publication date, read time, category tag).
 * Breadcrumbs are auto-generated and excluded per authoring analysis.
 */
export default function parse(element, { document }) {
  // Row 1: Extract hero image from source DOM
  // Source: img.cover-image inside the first child div of the grid
  const image = element.querySelector('img.cover-image, img[fetchpriority="high"]');

  // Row 2: Extract article metadata content
  // Source: h1.h2-heading - main article title
  const heading = element.querySelector('h1, h1.h2-heading, .h2-heading');

  // Author name - "By {author}" pattern in flex-horizontal divs
  // Source: .flex-horizontal > .paragraph-sm (second child has author name)
  const authorContainer = element.querySelector('.flex-horizontal.flex-gap-xxs');
  let authorText = null;
  if (authorContainer) {
    const parts = authorContainer.querySelectorAll('.paragraph-sm');
    if (parts.length >= 2) {
      // Build "By Author Name" paragraph
      authorText = document.createElement('p');
      authorText.textContent = `${parts[0].textContent.trim()} ${parts[1].textContent.trim()}`;
    }
  }

  // Date and read time - second .flex-horizontal row
  // Source: .flex-horizontal.flex-gap-xxs.utility-margin-top-0-5rem
  const metaRows = element.querySelectorAll('.flex-horizontal.flex-gap-xxs');
  let dateReadTime = null;
  if (metaRows.length >= 2) {
    const dateParts = metaRows[1].querySelectorAll('.paragraph-sm');
    if (dateParts.length > 0) {
      dateReadTime = document.createElement('p');
      const texts = Array.from(dateParts).map((el) => el.textContent.trim());
      dateReadTime.textContent = texts.join(' ');
    }
  }

  // Category tag
  // Source: .tag element
  const tagEl = element.querySelector('.tag');
  let categoryTag = null;
  if (tagEl) {
    categoryTag = document.createElement('p');
    categoryTag.innerHTML = `<em>${tagEl.textContent.trim()}</em>`;
  }

  // Build cells following hero block library structure (1 column, 2 rows)
  const cells = [];

  // Row 1: Hero image (single cell)
  if (image) {
    cells.push([image]);
  }

  // Row 2: Article metadata content in a single cell (title + author + date + tag)
  // Wrap in a container div so all elements land in one cell
  const contentWrapper = document.createElement('div');
  if (heading) contentWrapper.append(heading);
  if (authorText) contentWrapper.append(authorText);
  if (dateReadTime) contentWrapper.append(dateReadTime);
  if (categoryTag) contentWrapper.append(categoryTag);
  cells.push([contentWrapper]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-article', cells });
  element.replaceWith(block);
}
