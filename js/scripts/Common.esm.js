export const HIDDEN_CLASS = "hidden";
export const VISIBLE_SCREEN = true;
export const HIDDEN_SCREEN = false;

/**
 * class with common method, to bind HTML elements with JS code
 */
export class Common {
  /**
   * @param {!string} elementId id of HTML element to bind this element with code, this element should be a main element of layer
   */
  constructor(elementId) {
    if (typeof elementId === "undefined") return;
    this.element = this.bindToElement(elementId);
  }

  //find element by id if it doesn't exist throw error
  /**Method to bind html elements with JS by id
   * @param {!string} elementToFindById id of elemnt which we want to bind
   */
  bindToElement(elementToFindById) {
    const element = document.getElementById(elementToFindById);

    if (!element)
      throw new Error(`Element o id '${elementToFindById}' nie istnieje`);

    return element;
  }

  /**
   *Method to change te visibility of specified layer in element
   * @param {HTMLElement} element element which visibility we want to change
   * @param {boolean} mode two types of value VISIBLE_SCREEN or HIDDEN_SCREEN depending on whether we want hidden or show layer
   */
  changeVisibilityOfScreen(element, mode) {
    mode === VISIBLE_SCREEN
      ? element.classList.remove(HIDDEN_CLASS)
      : element.classList.add(HIDDEN_CLASS);
  }
}
