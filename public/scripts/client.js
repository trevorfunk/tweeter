/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetInput) => {
 const tweetTime = timeago.format(tweetInput.created_at);
  const $tweet = $(`<section class="tweet-container">
 <article>
        <header class="tweet-head">
          <div class="user-id">
            <img class="avatar" src=${tweetInput.user.avatars}>
            <span class="username">${tweetInput.user.name}</span> 
          </div>
          <div class="user-tag">
            <span>${tweetInput.user.handle}</span>
          </div>
        </header>
        <span class="tweet-content">${tweetInput.content.text}</span>
        <footer class="tweet-footer">
          <span class="date">${tweetTime}</span>
          <span class="icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></i></span>
        </footer>
       </article>`);

  return $tweet;
};
// RENDER TWEETS
const renderTweets = (tweets) => {
 const container = $('.tweet-container').empty();
  for (const tweet of tweets) {
    container.prepend(createTweetElement(tweet));
  }
};

//TWEETS FROM DATA
$(document).ready(function() {
 loadTweets();
 $('#tweet-form').on("submit", function(event) {
   event.preventDefault();

   const input = $(this).serialize();

   $.post('/tweets', input)
     .then(() => {
       loadTweets();
     });
  });
});

const loadTweets = () => {
 $.get('tweets')
   .then(tweetData => {
     renderTweets(tweetData);
   });
};