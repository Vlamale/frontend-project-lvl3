import axios from 'axios';
import _ from 'lodash';
import { getRssProxyLink, parseXml } from './utils.js';
import { getPostsFromXml } from './xml2Js.js';

function watchRssUpdates({ state, i18nextInstance, delay }, tId) {
  let timeoutId = tId;

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  const promises = state.feeds.map(({ url, id }) => axios.get(getRssProxyLink(url))
    .catch((err) => {
      err.message = 'error:form.errors.networkError';

      throw err;
    })
    .then((response) => {
      const xmlString = response.data.contents;
      const $xml = parseXml(xmlString);
      const posts = getPostsFromXml($xml, id);
      const postsFromFeed = state.posts.filter((post) => post.feedId === id);
      const newPosts = _.differenceBy(posts, postsFromFeed, 'url');

      state.posts.push(...newPosts);
    })
    .catch((err) => {
      const [status, key] = err.message.split(':');

      state.rssForm.status = key ? status : 'error';
      state.rssForm.feedbackMessage = i18nextInstance.t(key || 'form.errors.unknownError');
    }));

  Promise.all(promises)
    .then(() => {
      const props = {
        state,
        i18nextInstance,
        delay,
      };

      timeoutId = setTimeout(() => watchRssUpdates(props, timeoutId), delay);
    });
}

export default watchRssUpdates;
