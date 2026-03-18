/* eslint-disable */
/* global WebImporter */

/**
 * Parser: accordion-faq
 * Base block: accordion
 * Source: https://www.wknd-trendsetters.site/
 * Selector: .faq-list
 *
 * Accordion block structure (from library):
 * Each row: [title cell (question) | content cell (answer)]
 *
 * Source: 4 FAQ items as <details> with <summary> question and .faq-answer content
 */
export default function parse(element, { document }) {
  const faqItems = Array.from(element.querySelectorAll('details.faq-item'));

  const cells = [];

  faqItems.forEach((item) => {
    const summary = item.querySelector('summary.faq-question, summary');
    const answerDiv = item.querySelector('.faq-answer');

    // Get question text from span inside summary, or from summary directly (excluding img text)
    let questionText = '';
    if (summary) {
      const span = summary.querySelector('span');
      if (span) {
        questionText = span.textContent.trim();
      } else {
        questionText = summary.textContent.trim();
      }
    }

    const answerParagraphs = answerDiv ? Array.from(answerDiv.querySelectorAll('p')) : [];

    const questionCell = [];
    if (questionText) {
      const p = document.createElement('p');
      p.textContent = questionText;
      questionCell.push(p);
    }

    const answerCell = [];
    answerParagraphs.forEach((p) => {
      const para = document.createElement('p');
      para.textContent = p.textContent.trim();
      answerCell.push(para);
    });

    cells.push([
      questionCell.length > 0 ? questionCell : '',
      answerCell.length > 0 ? answerCell : '',
    ]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
