import _ from 'lodash';

export function getFeedFromXml($xml) {
  const id = _.uniqueId('feed_');

  return {
    title: $xml.querySelector('title').textContent,
    description: $xml.querySelector('description').textContent,
    id,
  };
}

export function getPostsFromXml($xml, feedId) {
  const $posts = $xml.querySelectorAll('item');
  const posts = [];

  $posts.forEach(($post) => {
    const id = _.uniqueId('post_');
    const postData = {
      title: $post.querySelector('title').textContent,
      description: $post.querySelector('description').textContent,
      url: $post.querySelector('link').textContent,
      id,
      feedId,
      viewed: false,
    };

    posts.push(postData);
  });

  return posts;
}
