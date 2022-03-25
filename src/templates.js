function getListStructure($container, title) {
  $container.innerHTML = '';

  const $title = document.createElement('h2');
  $title.classList.add('text-center', 'mb-4');
  $title.textContent = title;

  const $list = document.createElement('ul');
  $list.classList.add('list-group');

  return { $title, $list };
}

export function createFeedsTemplate({ feeds, $container, i18nextInstance }) {
  const feedListTitle = i18nextInstance.t('feedList.title');
  const { $title, $list } = getListStructure($container, feedListTitle);

  feeds.forEach(({ title, description }) => {
    const $feed = document.createElement('li');
    $feed.classList.add('list-group-item', 'text-center');

    const $title = document.createElement('h4');
    $title.classList.add('mb-1', 'fw-normal', 'fs-4');
    $title.textContent = title;

    const $description = document.createElement('p');
    $description.classList.add('mb-1', 'fw-light');
    $description.textContent = description;

    $feed.append($title, $description);
    $list.append($feed);
  });

  $container.append($title, $list);
}

export function createPostsTemplate({ posts, $container, i18nextInstance }) {
  const postListTitle = i18nextInstance.t('postList.title');
  const { $title, $list } = getListStructure($container, postListTitle);

  posts.forEach((postData) => {
    const $post = document.createElement('li');
    $post.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    $post.dataset.id = postData.id;

    const $link = document.createElement('a');
    $link.classList.add('mb-1', 'fs-5', 'w-75', 'text-break', 'post-title', postData.viewed ? 'fw-normal' : 'fw-bold');
    $link.textContent = postData.title;
    $link.href = postData.url;

    const $button = document.createElement('button');
    $button.classList.add('btn', 'btn-outline-primary', 'h-100');
    $button.setAttribute('type', 'button');
    $button.textContent = i18nextInstance.t('postList.showPostBtnText');
    $button.dataset.action = 'showModal';
    $button.dataset.postId = postData.id;

    $post.append($link, $button);
    $list.append($post);
  });

  $container.append($title, $list);
}
