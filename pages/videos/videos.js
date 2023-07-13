/**
 * @copyright codewithsadee 2023
 * @author sadee <codewithsadee@gmail.com>
 */

"use strict";

/**
 * @copyright codewithsadee 2023
 * @author sadee <codewithsadee@gmail.com>
 */

"use strict";

/**
 * Import
 */

import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { videoCard } from "../../js/video_card.js";
import { updateUrl } from "../../js/utils/updateUrl.js";
import { urlDecode } from "../../js/utils/urlDecode.js";
import { filter } from "../../js/filter.js";

/**
 * Show Filter Bar if Previous Searches
 */

const /** {NodeElement} */ $filterBar =
    document.querySelector("[data-filter-bar]");

$filterBar.computedStyleMap.display = window.location.search ? "flex" : "none";

/**
 * Init Filter
 */

const /** {NodeList} */ $filterWrappers =
    document.querySelectorAll("[data-filter]");

$filterWrappers.forEach(($filterWrapper) => {
  filter($filterWrapper, window.filterObj, (newObj) => {
    window.filterObj = newObj;
    updateUrl(newObj, "videos");
  });
});

/**
 * Render Popular or Searched Videos
 * If Search Something Render Videos
 * Otherwise Render Popular Videos
 */

const /** {NodeElement} */ $videoGrid =
    document.querySelector("[data-video-grid]");
const /** {NodeElement} */ $title = document.querySelector("[data-title]");
const /** {Object} */ videoGrid = gridInit($videoGrid);
const /** {Number} */ perPage = 30;
let /** {Number} */ currentPage = 1;
let /** {Number} */ totalPage = 0;
const /** {String} */ searchUrl = window.location.search.slice(1);
let /** {Object} */ searchObj = searchUrl && urlDecode(searchUrl);
const /** {String} */ title = searchObj
    ? `${searchObj.query} videos`
    : "Popular videos";

$title.textContent = title;
document.title = title;

/**
 * Render All Photos
 * @param {Number} currentPage Current Page Number
 */

const renderVideos = function (currentPage) {
  client.videos[searchObj ? "search" : "popular"](
    { ...searchObj, per_page: perPage, page: currentPage },
    (data) => {
      totalPage = Math.ceil(data.total_results / perPage);

      data.videos.forEach((video) => {
        const /** {NodeElement} */ $videoCard = videoCard(video);

        updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.$columns);
      });

      // When Video Loaded
      isLoaded = true;

      // When No Videos Found, Hide Loader
      if (currentPage >= totalPage) $loader.style.display = "none";
    }
  );
};

renderVideos(currentPage);

/**
 * Load More Videos
 */

const /** {NodeElement} */ $loader = document.querySelector("[data-loader]");
let /** {Boolean} */ isLoaded = true;

window.addEventListener("scroll", function () {
  console.log($loader.getBoundingClientRect().top);

  if (
    $loader.getBoundingClientRect().top < window.innerHeight * 2 &&
    currentPage < totalPage &&
    isLoaded
  ) {
    currentPage++;
    renderVideos(currentPage);
    isLoaded = false;
  }
});
