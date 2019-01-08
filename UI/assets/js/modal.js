const launchModal = (id) => {
  document.querySelector(`#${id}`).style.display = 'block';
};

const closeModal = (id) => {
  document.querySelector(`#${id}`).style.display = 'none';
};

// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = 'none';
//   }
// };
