window.addEventListener('load', () => {
  const token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  };
  fetch('http://127.0.0.1:8080/api/v1/comments/user', options)
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      let output = '';
      if (res.status === 404) {
        output = ` <h1 class="text-center" style="margin-top:20%;"> ${res.message} </h1>`;
        const meetupContainer = document.querySelector('.section');
        meetupContainer.innerHTML = output;
      } else {
        const amounts = document.querySelectorAll('.amount');
        amounts.forEach((amount) => {
          const newAmount = amount;
          newAmount.innerHTML = res.data.length;
        });
        res.data.forEach((comment) => {
          fetch(`http://127.0.0.1:8080/api/v1/questions/${comment.question_id}`, options)
            .then(response => response.json())
            .then((response) => {
              console.log(response);
              output += `<div class="question-card">
                <div class="card-header details">
                  <div class="d-flex">
                    <img src="assets/images/placeholder.png" alt="Meetup Image" class="profile-image">
                    <div class="">
                      <p>${res.userDetails.fullname}</p>
                      <p class="f-14 text-grey">@${res.userDetails.username}</p>
                      <div class="d-flex">
                        <p class="f-12 text-grey"><i>replying to:@${response.user.username}'s question on &nbsp;</i></p>
                        <p class="f-12 truncate"><i> "${response.question.body}" </i></p>
                      </div>
                    </div>
                  </div>
                  <div class="">
                    <p class="f-14 text-grey time-posted">Commented : ${moment(comment.created_on, 'YYYYMMDD').fromNow()}</p>
                  </div>
                </div>
                <div class="card-body question">
                  <p>Comment: ${comment.comment}</p>
                </div>
                <div class="card-footer actions">
                  <div class="w-25  h-100 d-flex justify-content-start align-items-center">
                      <button type="button" class="btn bg-transparent p-0 d-flex comment-btn">
                        <i class="fas fa-comment f-24"></i>
                      </button>
                      <span class="amount">8</span>
                  </div>
                </div>
                <div class="bg-white d-none comment-div">
                  <form>
                    <div class="d-flex justify-content-center ">
                      <textarea class="w-100" rows="3" maxlength="150" name="question" placeholder="Type your comment here (150 characters max)"></textarea>
                    </div>
                    <div class="d-flex justify-content-end">
                      <button type="submit" class="btn btn-blue">comment</button>
                    </div>
                  </form>
                </div>
              </div>`;
              const meetupContainer = document.querySelector('#comments');
              meetupContainer.innerHTML = output;
            })
            .catch(error => console.log(error));
        });
      }
    });
});
