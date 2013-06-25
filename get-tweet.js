/*
 * get-tweet.js v0.2 by Jimmy King
 * Licensed under The MIT License
 * Issues and feature requests at:
 * https://github.com/jking90/get-tweet
 */

var getTweet = function () {
  var numTweets,
      callbackFn;

  return {
    please: function(id, callback, howMany) {
      var src = '//cdn.syndication.twimg.com/widgets/timelines/' + id + '?&lang=en&callback=getTweet.process&suppress_response_codes=true&rnd=',
          fakeAPI = '<script src="' + src + Math.random() + '"></script>';

      if ($('script[src^="' + src + '"]').length === 0) {
        $('head').eq(0).append(fakeAPI);
      }

      callbackFn = callback;

      if (howMany) {
        numTweets = howMany;
      }
    },

    process: function(data) {
      var $fakeAPI = $('<div class="fake-api"></div>')
          tweets = [];

      $fakeAPI.append(data.body);

      if ((typeof numTweets != 'number') ||
         (numTweets < 2) || (numTweets > 20)) {
        numTweets = 1;
      }

      for (i = 0; i < numTweets; i++) {
        var $thisTweet = $fakeAPI.children('.root').children('.stream').children('.h-feed').children('.h-entry[data-tweet-id]').eq(i),
            $tweetContent = $thisTweet.children('.e-entry-content').children('.e-entry-title'),
            $userInfo = $thisTweet.children('.h-card').children('.profile');

        thisTweet = {
          html: $tweetContent.html(),
          link: $thisTweet.children('.permalink').attr('href'),
          name: $userInfo.children('.full-name').text().trim(),
          pic: $userInfo.children('img').attr('src'),
          text: $tweetContent.text(),
          time: Date.parse($thisTweet.children('.permalink').data('datetime')),
          user: $userInfo.children('.p-nickname').text()
        }

        tweets.push(thisTweet);
      }

      if (tweets.length > 1) {
        hereYouGo(tweets, callbackFn);
      } else {
        var tweet = tweets[0];
        hereYouGo(tweet, callbackFn);
      }
    }
  }
  
  function hereYouGo (out, callback) {
    if (Array.isArray(out)) {
      getTweet.tweets = out,
      getTweet.tweet  = out[0];
    } else {
      getTweet.tweet  = out;
    }
    callback();
  }
}();
