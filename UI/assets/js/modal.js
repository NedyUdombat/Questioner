const launchModal = (id) => {
  document.querySelector(`#${id}`).style.display = 'block';
};

const closeModal = (id) => {
  document.querySelector(`#${id}`).style.display = 'none';
};
