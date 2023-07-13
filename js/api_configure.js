/**
 * @copyright codewithsadee 2023
 * @author sadee <codewithsadee@gmail.com>
 */

"use strict";

// Import

import { urlEncode } from "./utils/urlEncode.js";

const /** {String} */ API_KEY =
    "fiZstO4Y2jonWLnXkPQyccWN10ojTGftcXjk8AiCC7ibBeGP79FHnJF5";

const /** {Function} */ headers = new Headers();
headers.append("Authorization", API_KEY);

const /** {Object} */ requestOptions = { headers };

/**
 * Fetch data from Pexels
 * @param {String} url Fetch URL
 * @param {Function} successCallback Success callback function
 */

const fetchData = async function (url, successCallback) {
  const /** {Object} */ response = await fetch(url, requestOptions);

  if (response.ok) {
    const /** {Object} */ data = await response.json();
    successCallback(data);
  }
};

let /** {String} */ requestUrl = "";

const /** {Object} */ root = {
    default: "https://api.pexels.com/v1/",
    videos: "https://api.pexels.com/videos/",
  };

export const /** {Object} */ client = {
    photos: {
      /**
       * Search Photos
       * @param {Object} parameters Url Object
       * @param {Function} callback Callback function
       */
      search(parameters, callback) {
        requestUrl = `${root.default}search?${urlEncode(parameters)}`;
        fetchData(requestUrl, callback);
      },

      /**
       * Curated Photos
       * @param {Object} parameters Url Object
       * @param {Function} callback Callback function
       */
      curated(parameters, callback) {
        fetchData(`${root.default}curated?${urlEncode(parameters)}`, callback);
      },

      /**
       * Get Single Photo
       * @param {String} id Photo ID
       * @param {Function} callback Callback function
       */
      detail(id, callback) {
        fetchData(`${root.default}photos/${id}`, callback);
      },
    },

    videos: {
      /**
       * Search Videos
       * @param {Object} parameters Url Object
       * @param {Function} callback Callback function
       */
      search(parameters, callback) {
        requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
        fetchData(requestUrl, callback);
      },

      /**
       * Popular Videos
       * @param {Object} parameters Url Object
       * @param {Function} callback Callback function
       */
      popular(parameters, callback) {
        fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback);
      },

      /**
       * Get Single Video
       * @param {String} id Video ID
       * @param {Function} callback Callback function
       */
      detail(id, callback) {
        fetchData(`${root.videos}videos/${id}`, callback);
      },
    },

    collections: {
      /**
       * Get Featured Collections
       * @param {Object} parameters Url Object
       * @param {Function} callback Callback function
       */
      featured(parameters, callback) {
        requestUrl = `${root.default}collections/featured?${urlEncode(
          parameters
        )}`;
        fetchData(requestUrl, callback);
      },

      /**
       * Get a Collection
       * @param {String} id Collection ID
       * @param {Object} parameters Url object
       * @param {Function} callback Callback function
       */
      detail(id, parameters, callback) {
        requestUrl = `${root.default}/collections/${id}?${urlEncode(
          parameters
        )}`;
        fetchData(requestUrl, callback);
      },
    },
  };
