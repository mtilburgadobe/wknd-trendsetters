/**
 * Hero Article block - blog post hero with image and article metadata.
 * Row 1: Hero image
 * Row 2: Article metadata (title, author, date, read time, category tag)
 * @param {Element} block The hero-article block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  const imageRow = rows[0];
  const contentRow = rows[1];

  // Mark the image row
  imageRow.classList.add('hero-article-image');

  // Mark the content row
  contentRow.classList.add('hero-article-content');

  // Find and decorate metadata elements in the content cell
  const contentCell = contentRow.querySelector(':scope > div');
  if (contentCell) {
    // Decorate author line: look for "By" text pattern
    const paragraphs = contentCell.querySelectorAll('p');
    paragraphs.forEach((p) => {
      const text = p.textContent.trim();
      if (text.startsWith('By ')) {
        p.classList.add('hero-article-author');
      }
    });

    // Decorate any standalone short text that looks like a tag/category
    const allElements = [...contentCell.children];
    allElements.forEach((el) => {
      const text = el.textContent.trim();
      // Tag-like elements: short text, no links, not a heading
      if (text.length < 30
        && !el.querySelector('a')
        && !el.matches('h1, h2, h3, h4, h5, h6')
        && !el.classList.contains('hero-article-author')
        && text !== '') {
        // Check if it looks like metadata (date pattern or category)
        if (/\d{4}|min read/.test(text)) {
          el.classList.add('hero-article-date');
        } else if (!text.startsWith('By ')) {
          el.classList.add('hero-article-tag');
        }
      }
    });
  }
}
