

const newPost = (post) => {
  // const setOptions = {
  //   method: 'POST',
  //   body: JSON.stringify(post),
  //   header: new Headers({
  //     'Content-Type': 'application/json',
  //   }),
  // };

  // return fetch('https://andela-questioner-app.herokuapp.com/api/v1/meetups/upcoming')
  //   .then(res => res.json())
  //   .then(res => console.log(res))
  //   .catch(error => console.log(error));
};

// const post = {
//   title: 'Pretty little fears',
//   body: 'Now can you tell me like it is',
//   userId: 1,
// };


const logger = () => {
  // const formData = new FormData(document.querySelector('#signup'));
  // for (const pair of formData.entries()) {
  //   console.log(pair[0], pair[1]);
  // }

  return fetch('http://127.0.0.1:8080/api/v1/meetups/upcoming')
    .then(res => res.json())
    .then((posts) => {
      console.log(posts);
    });
  // newPost(post);
};
