/**
 * @copyright codewithsadee 2023
 * @author sadee <codewithsadee@gmail.com>
 */

"use strict";

/**
 * Import
 * @param {Node} $gridContainer
 * @returns {Object} Column & Columns Height Array
 */

export const gridInit = function ($gridContainer) {
  const /** {NodeList} */ $columns = [];
  const /** {NodeList} */ columnsHeight = [];

  const /** {Number} */ columnCount = Number(
      getComputedStyle($gridContainer).getPropertyValue("--column-count")
    );

  for (let i = 0; i < columnCount; i++) {
    const /** {NodeElement} */ $column = document.createElement("div");
    $column.classList.add("column");
    $gridContainer.appendChild($column);
    $columns.push($column);
    columnsHeight.push(0);
  }

  return { $columns, columnsHeight };
};

/**
 * Update Masonry Grid
 * @param {Node} $card Grid Item
 * @param {Array} columnsHeight Height of All Columns
 * @param {NodeList} $columns All Columns
 */

export const updateGrid = function ($card, columnsHeight, $columns) {
  const /** {Number} */ minColumnHeight = Math.min(...columnsHeight);
  const /** {Number} */ minColumnIndex = columnsHeight.indexOf(minColumnHeight);

  $columns[minColumnIndex].appendChild($card);
  columnsHeight[minColumnIndex] = $columns[minColumnIndex].offsetHeight;
};
