/**
 * @copyright codewithsadee 2023
 * @author sadee <codewithsadee@gmail.com>
 */

"use strict";

/**
 * Import
 */

import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { segment } from "../../js/segment_btn.js";
import { photoCard } from "../../js/photo_card.js";
import { videoCard } from "../../js/video_card.js";

/**
 * Favorite Segment Button
 */

const /** {NodeElement} */ $favoriteSegment = document.querySelector(
    "[data-segment='favorite']"
  );
let /** {String} */ favType = "photos";

segment($favoriteSegment, (segmentValue) => {
  favType = segmentValue;
  $favGrid.innerHTML = "";
  favGrid = gridInit($favGrid);
  loadFav(favType, favGrid);
});

/**
 * Load Favorite Items
 */

const /** {NodeElement} */ $favGrid = document.querySelector("[data-fav-grid]");
let /** {Object} */ favGrid = gridInit($favGrid);
const favData = JSON.parse(window.localStorage.getItem("favorite"));

const loadFav = function (type, favGridItem) {
  // Clear the grid
  favGridItem.$columns.forEach(($column) => {
    while ($column.firstChild) {
      $column.firstChild.remove();
    }
  });

  Object.values(favData[type]).forEach((item) => {
    let /** {NodeElement} */ $card;

    switch (type) {
      case "photos":
        $card = photoCard(item);
        break;
      case "videos":
        $card = videoCard(item);
        break;
    }

    updateGrid($card, favGridItem.columnsHeight, favGridItem.$columns);
  });
};

loadFav(favType, favGrid);
