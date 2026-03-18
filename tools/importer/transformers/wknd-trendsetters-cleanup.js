/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters cleanup.
 * Removes non-authorable content (navbar, footer, skip-link, mobile menu buttons).
 * Selectors from captured DOM of https://www.wknd-trendsetters.site/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove elements that could interfere with block parsing (from captured DOM)
    // .skip-link: <a href="#main-content" class="skip-link">Skip to main content</a>
    // .nav-mobile-menu-button: <button class="nav-mobile-menu-button" id="nav-toggle">
    WebImporter.DOMUtils.remove(element, [
      '.skip-link',
      '.nav-mobile-menu-button',
    ]);
  }
  if (hookName === H.after) {
    // Remove non-authorable site chrome (from captured DOM)
    // .navbar: <div class="navbar"> (main navigation)
    // footer.footer: <footer class="footer inverse-footer"> (site footer)
    // link, noscript: non-authorable elements
    WebImporter.DOMUtils.remove(element, [
      '.navbar',
      'footer.footer',
      'link',
      'noscript',
    ]);
  }
}
