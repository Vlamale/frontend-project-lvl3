function pageClickHandler(state, event) {
  switch (event.target.dataset.action) {
    case 'showModal': {
      const post = state.posts.find((p) => p.id === event.target.dataset.postId);

      post.viewed = true;
      state.showModalWithData = {
        elementId: post.id,
        title: post.title,
        description: post.description,
        url: post.url,
      };

      break;
    }
    case 'closeModal':
      state.showModalWithData = null;

      break;

    default:
      break;
  }
}

export default pageClickHandler;
