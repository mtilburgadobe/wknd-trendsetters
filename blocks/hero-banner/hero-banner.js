export default function decorate(block) {
  const hasImage = block.querySelector(':scope > div:first-child picture')
    || block.querySelector(':scope > div:first-child img');
  if (!hasImage) {
    block.classList.add('no-image');
  }

  // Decorate standalone links as buttons
  block.querySelectorAll(':scope > div:last-child > div').forEach((cell) => {
    const a = cell.querySelector('a');
    const p = cell.querySelector('p') || cell;
    if (a && p.textContent.trim() === a.textContent.trim()) {
      a.className = 'button';
      if (p.tagName === 'P') p.className = 'button-wrapper';
    }
  });
}
