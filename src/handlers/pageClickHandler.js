function pageClickHandler(state, event) {
  switch (event.target.dataset.action) {
    case 'showModal': {
      const post = state.posts.find((post) => post.id === event.target.dataset.postId);
      /* eslint-disable no-console */
      console.log(state.posts);
      //   console.log(state);
      console.log(event.target.dataset.postId);
      /* eslint-enable no-console */
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
