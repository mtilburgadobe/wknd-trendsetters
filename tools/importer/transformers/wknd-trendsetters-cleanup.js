/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters cleanup.
 * Removes non-authorable content (navbar, footer, skip-link, mega-menus).
 * Selectors from captured DOM of https://www.wknd-trendsetters.site/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove skip link and mobile menu button (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '.skip-link',
      '.nav-mobile-menu-button',
    ]);
  }
  if (hookName === H.after) {
    // Remove non-authorable site chrome (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '.navbar',
      'footer.footer',
      'link',
      'noscript',
    ]);
  }
}
