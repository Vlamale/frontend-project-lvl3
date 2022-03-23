import axios from 'axios';
import differenceBy from 'lodash/differenceBy';
import { getRssProxyLink, parseXml } from './utils';
import { getPostsFromXml } from './xml2Js';

/* eslint-disable no-param-reassign */
function watchRssUpdates(state, delay, timeoutId) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  if (state.feeds.length === 0) {
    timeoutId = setTimeout(() => watchRssUpdates(state, delay, timeoutId), delay);
    return;
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
      const newPosts = differenceBy(posts, postsFromFeed, 'url');

      state.posts.push(...newPosts);
    })
    .catch((err) => {
      const [status, key] = err.message.split(':');
      state.rssForm.status = key ? status : 'error';
      state.rssForm.feedbackMessage = state.i18nextInstance.t(key || 'form.errors.unknownError');
    }));

  Promise.all(promises)
    .then(() => {
      timeoutId = setTimeout(() => watchRssUpdates(state, delay, timeoutId), delay);
    });
}
/* eslint-enable no-param-reassign */

export default watchRssUpdates;
