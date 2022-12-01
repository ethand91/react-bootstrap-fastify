const posts = require('./../data/posts');

const getPostHandler = (req, res) => {
  const { id } = req.params;

  const post = posts.filter((post) => {
    return post.id === id;
  })[0];

  if (!post) {
    return res.status(404).send({
      error: 'Post not found'
    });
  }

  return res.send(post);
};

const getPostsHandler = (req, res) => {
  res.send(posts);
};

const addPostHandler = (req, res) => {
  const { title, body } = req.body;

  const id = posts.length + 1;
  posts.push({ id, title, body });

  res.send('ok');
};

const updatePostHandler = (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;

  const post = posts.filter((post) => {
    return post.id === id;
  })[0];

  if (!post) {
    return res.status(404).send(new Error('Post does not exist'));
  }

  post.title = title;
  post.body = body;

  return res.send('Post updated');
};

const deletePostHandler = (req, res) => {
  const { id } = req.params;

  const postIndex = posts.findIndex((post) => {
    return post.id === id
  });

  if (!postIndex) {
    return res.status(404).send(new Error('Post does not exist'));
  }

  posts.splice(postIndex, 1);

  return res.send('Post deleted');
};

module.exports = {
  addPostHandler,
  getPostHandler,
  getPostsHandler,
  updatePostHandler,
  deletePostHandler
};
