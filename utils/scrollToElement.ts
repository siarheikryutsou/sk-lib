/**
 * Smoothly scrolls the page to the specified element by its ID, accounting for an optional offset.
 *
 * @param {string} id - The ID of the DOM element to scroll to.
 * @param {number} [offset=0] - Additional offset from the top (e.g., fixed header height).
 *
 * @example
 * // Scroll to the element with id="features" with a 80px offset for a fixed header
 * scrollToElement('features', 80);
 */

export const scrollToElement = (id: string, offset: number = 0) => {
  const target = document.getElementById(id);

  if (target) {
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
