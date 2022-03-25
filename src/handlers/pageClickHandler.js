function pageClickHandler(state, event) {
  switch (event.target.dataset.action) {
    case 'showModal': {
    //   const post = state.posts.find((post) => post.id === event.target.dataset.postId);
    //   post.viewed = true;
      /* eslint-disable no-console */
      console.log(state.posts);
      console.log(event.target.dataset.postId);
      /* eslint-enable no-console */
      let postData;
      state.posts.forEach((post) => {
        if (post.id === event.target.dataset.postId) {
          post.viewed = true;
          postData = { ...post };
        }
      });

      state.showModalWithData = {
        elementId: postData.id,
        title: postData.title,
        description: postData.description,
        url: postData.url,
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
