import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const updateUserProfile = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${payload.id}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getUserPosts = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const usersPosts = Object.values(data).filter((item) => item.rare_user_id.uid === uid);
      resolve(usersPosts);
    })
    .catch(reject);
});

const viewUserPosts = (id) => new Promise((resolve, reject) => {
  Promise.all([getSingleUser(id), getUserPosts(id)])
    .then(([userObject, userPostsArray]) => {
      resolve({ ...userObject, posts: userPostsArray });
    })
    .catch((error) => reject(error));
});

const viewUserDetails = (id) => new Promise((resolve, reject) => {
  Promise.all([getSingleUser(id), viewUserPosts(id)])
    .then(([userObject, userPostsArray]) => {
      resolve({ ...userObject, posts: userPostsArray });
    }).catch((error) => reject(error));
});

export {
  getUsers,
  getSingleUser,
  createUser,
  updateUserProfile,
  getUserPosts,
  viewUserDetails,
  viewUserPosts,
};
