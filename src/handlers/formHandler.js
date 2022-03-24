import axios from 'axios';
import * as yup from 'yup';
import { getFeedFromXml, getPostsFromXml } from '../xml2Js.js';
import { getRssProxyLink, parseXml } from '../utils.js';

function formHandler({ state, i18nextInstance }, event) {
  event.preventDefault();

  state.rssForm.status = 'waiting';
  state.rssForm.feedbackMessage = '';

  const urlSchema = yup
    .string()
    .url()
    .required()
    .notOneOf(state.feedUrls);

  const data = new FormData(event.target);
  const dataUrl = data.get('url');

  urlSchema
    .validate(dataUrl)
    .then((url) => {
      state.rssForm.url = url;

      return axios.get(getRssProxyLink(url))
        .catch((err) => {
          err.message = 'error:form.errors.networkError';

          throw err;
        });
    })
    .then((response) => {
      const xmlString = response.data.contents;
      const $xml = parseXml(xmlString);
      const feed = getFeedFromXml($xml);
      const posts = getPostsFromXml($xml, feed.id);

      feed.url = state.rssForm.url;
      state.feeds.push(feed);
      state.posts.push(...posts);
      state.rssForm.status = 'success';
      state.rssForm.feedbackMessage = i18nextInstance.t('form.successfullyLoaded');
      state.feedUrls.push(state.rssForm.url);
    })
    .catch((err) => {
      const [status, key] = err.message.split(':');

      state.rssForm.status = key ? status : 'error';
      state.rssForm.feedbackMessage = i18nextInstance.t(key || 'form.errors.unknownError');
    });
}

export default formHandler;
