/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Escape Function
const escapeText = function (str) {
 let div = document.createElement("div");
 div.appendChild(document.createTextNode(str));
 return div.innerHTML;
};

const createTweetElement = (tweetInput) => {
 const safeHTML = escapeText(tweetInput.content.text);
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
        <span class="tweet-content">${safeHTML}</span>
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
 $('.error-messages').hide()
 loadTweets();
 $('#tweet-form').on("submit", function(event) {
   event.preventDefault();

   const tweetVal = $('#tweet-text').val();

   if (tweetVal === '') {
    $('.error-messages').text('Oh no! your tweet is empty').slideDown(1000)
    return;
   };

   if (tweetVal.length > 140) {
    $('.error-messages').text('Sorry, tweets must be 140 characters or less').slideDown(1000)
    return;
   }

   const input = $(this).serialize();

   $.post('/tweets', input)
     .then(() => {
      $('.error-messages').slideUp(1000);
      loadTweets();
     })
     .catch((err) => {
      console.log(err.message);
     })
  });
});

const loadTweets = () => {
 $.get('tweets')
   .then(tweetData => {
     renderTweets(tweetData);
   });
};