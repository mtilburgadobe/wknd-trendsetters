/* eslint-disable */
/* global WebImporter */

/**
 * Parser: accordion-faq
 * Base block: accordion
 * Source: https://www.wknd-trendsetters.site/
 * Selector: .faq-list
 * Generated: 2026-03-18
 *
 * Accordion block structure (from library):
 *   2 columns per row: [title cell (question) | content cell (answer)]
 *   Each subsequent row represents one accordion item
 *
 * Source structure:
 *   .faq-list contains details.faq-item elements (4 total)
 *   Each item: summary.faq-question > span (question text) + img (icon)
 *   Each item: .faq-answer > p (answer paragraphs)
 */
export default function parse(element, { document }) {
  // Extract all FAQ items (from captured DOM: details.faq-item)
  const faqItems = Array.from(element.querySelectorAll('details.faq-item'));

  const cells = [];

  faqItems.forEach((item) => {
    // Question from summary (from captured DOM: summary.faq-question > span)
    const summary = item.querySelector('summary.faq-question, summary');
    const answerDiv = item.querySelector('.faq-answer');

    // Get question text from span inside summary (excluding SVG icon text)
    let questionText = '';
    if (summary) {
      const span = summary.querySelector('span');
      if (span) {
        questionText = span.textContent.trim();
      } else {
        questionText = summary.textContent.trim();
      }
    }

    // Get answer paragraphs (from captured DOM: .faq-answer p)
    const answerParagraphs = answerDiv ? Array.from(answerDiv.querySelectorAll('p')) : [];

    const questionCell = [];
    if (questionText) {
      const p = document.createElement('p');
      p.textContent = questionText;
      questionCell.push(p);
    }

    const answerCell = [];
    answerParagraphs.forEach((para) => {
      const p = document.createElement('p');
      p.textContent = para.textContent.trim();
      answerCell.push(p);
    });

    cells.push([
      questionCell.length > 0 ? questionCell : '',
      answerCell.length > 0 ? answerCell : '',
    ]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
