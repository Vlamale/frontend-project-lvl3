import axios from 'axios';
import differenceBy from 'lodash/differenceBy';
import { getRssProxyLink, parseXml } from './utils';
import { getPostsFromXml } from './xml2Js';

function watchRssUpdates(state, delay) {
  setInterval(() => {
    const { feeds } = state;
    feeds.forEach(({ url, id }) => {
      axios.get(getRssProxyLink(url))
        .then((response) => {
          const xmlString = response.data.contents;
          const $xml = parseXml(xmlString);
          const posts = getPostsFromXml($xml, id);
          const postsFromFeed = state.posts.filter((post) => post.feedId === id);
          const newPosts = differenceBy(posts, postsFromFeed, 'url');

          state.posts.push(...newPosts);
        })
        .catch((err) => {
          /* eslint-disable no-console */
          console.error(err);
          /* eslint-enable no-console */
        });
    });
  }, delay);
}

export default watchRssUpdates;
