/**
 * @copyright codewithsadee 2023
 * @author sadee <codewithsadee@gmail.com>
 */

"use strict";

/**
 * Import
 */

import { addEventOnElements } from "./utils/event.js";

/**
 * Add Menu Functionality
 * @param {Node} $menuWrapper Menu Parent Node
 * @param {Function} callback  Callback
 */

export const menu = function ($menuWrapper, callback) {
  const /** {NodeElement} */ $menu = $menuWrapper.querySelector("[data-menu]");
  const /** {NodeList} */ $menuTogglers = $menuWrapper.querySelectorAll(
      "[data-menu-toggler]"
    );
  const /** {NodeList} */ $menuItems =
      $menuWrapper.querySelectorAll("[data-menu-item]");

  addEventOnElements($menuTogglers, "click", () => {
    $menu.classList.toggle("expanded");
  });

  addEventOnElements($menuItems, "click", function () {
    $menu.classList.remove("expanded");
    if (callback) callback(this.dataset.menuItem);
  });
};