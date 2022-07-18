$(document).ready(function(event) {
 
 $('#tweet-text').keyup(function() {

  let charCount = $(this).val().length;

  if (charCount <= 140) {
   $(this)
    .closest(".new-tweet")
    .find(".counter")
    .text(140 - charCount)
    .removeClass("invalid-count")
  } else {
  $(this)
   .closest(".new-tweet")
   .find(".counter")
   .text(140 - charCount)
   .addClass("invalid-count")
  }
 });
});