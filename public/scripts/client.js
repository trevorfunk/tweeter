/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
 {
   "user": {
     "name": "Newton",
     "avatars": "https://i.imgur.com/73hZDYK.png",
     "handle": "@SirIsaac"
   },
   "content": {
     "text": "If I have seen further it is by standing on the shoulders of giants"
   },
   "created_at": 1657921520225
 },
 {
   "user": {
     "name": "Descartes",
     "avatars": "https://i.imgur.com/nlhLi3I.png",
     "handle": "@rd"
   },
   "content": {
     "text": "Je pense , donc je suis"
   },
   "created_at": 1658007920225
 }
]


const createTweetElement = (tweetObj) => {

 const newTweet =
` <article>
        <header class="tweet-head">
          <div class="user-id">
            <img class="avatar" src=${tweetObj.user.avatars}>
            <span class="username">${tweetObj.user.name}</span> 
          </div>
          <div class="user-tag">
            <span>${tweetObj.user.handle}</span>
          </div>
        </header>
        <span class="tweet-content">${tweetObj.content.text}</span>
        <footer class="tweet-footer">
          <span class="date">${tweetObj.created_at}</span>
          <span class="icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></i></span>
        </footer>
       </article>
       `;
       return newTweet;
};

$(document).ready(function() {
const renderTweets = (arrayOfTweetObjs) => {
for (const obj of arrayOfTweetObjs) {
 $('.tweet-container').append(createTweetElement(obj));
 }
};
renderTweets(tweetData);
})
