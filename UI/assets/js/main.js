const upVoteBtn = document.querySelector('.up-vote-btn');
const downVoteBtn = document.querySelector('.down-vote-btn');

// const rsvpIcon = document.querySelector('.fa-calendar-check');
let upVoteAmount = document.querySelector('.up-vote-amount');
let downVoteAmount = document.querySelector('.down-vote-amount');
const commentContainer = document.querySelector('.comment-div');

let toggleState = 0;
let voteCheck = 0;
let upVoteCount = 1;
let downVoteCount = 1;

// upvote funtion
function upVote() {
  upVoteAmount = Number(upVoteAmount);
  voteCheck += 1;
  if (voteCheck % 2 !== 0) {
    upVoteAmount += 1;
    const newUpVoteAmount = document.querySelector('.up-vote-amount');
    newUpVoteAmount.textContent = upVoteAmount;
  } else if (voteCheck % 2 === 0) {
    upVoteAmount -= 1;
    const newUpVoteAmount = document.querySelector('.up-vote-amount');
    newUpVoteAmount.textContent = upVoteAmount;
  }
}
upVoteBtn.onclick = () => {
  console.log(12);
  // if (downVoteCount % 2 !== 0) {
  //   upVote();
  // } else {
  //   return;
  // }
  //
  // upVoteCount += 1;
};


// downvote funtion
function downVote() {
  downVoteAmount = Number(downVoteAmount);
  voteCheck += 1;
  if (voteCheck % 2 !== 0) {
    downVoteAmount += 1;
    const newDownVoteAmount = document.querySelector('.down-vote-amount');
    newDownVoteAmount.textContent = downVoteAmount;
  } else if (voteCheck % 2 === 0) {
    downVoteAmount -= 1;
    const newDownVoteAmount = document.querySelector('.down-vote-amount');
    newDownVoteAmount.textContent = downVoteAmount;
  }
}
downVoteBtn.onclick = () => {
  if (upVoteCount % 2 !== 0) {
    downVote();
  } else {
    return;
  }
  downVoteCount += 1;
};

// toggle display of comment input form
const comment = () => {
  if (toggleState === 0) {
    commentContainer.classList.remove('d-none');
    commentContainer.classList.add('d-block');
    toggleState = 1;
  } else {
    commentContainer.classList.add('d-none');
    commentContainer.classList.remove('d-block');
    toggleState = 0;
  }
};
