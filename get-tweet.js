/*
 * get-tweet.js v0.2.2 by Jimmy King
 * Licensed under The MIT License
 * Issues and feature requests at:
 * https://github.com/jking90/get-tweet
 */

var getTweet = function () {

  return {
    please: function(widget, howMany, name, callbackFn) {

      // Test arguments
      if (arguments.length < 2) {
        console.log('%cYou must pass a value for `widget` and `callbackFn`.', 'color: red;');
        return;
      } else if (arguments.length === 2) {
        callbackFn = howMany,
        howMany = 1,
        name = 'gtDefault';
      } else if (arguments.length === 3) {
        callbackFn = name;

        if (typeof howMany === 'string') {
          name = howMany;
        }
      }

      if (typeof name != 'string') {
        name = 'gtDefault';
      }

      if ((typeof howMany != 'number') ||
         (howMany < 2) || (howMany > 20)) {
        howMany = 1;
      }

      if (typeof widget != 'string') {
        console.log('%cThe widget ID number must be passed as a string.', 'color: red;');
        return;
      }

      // Check for existing timeline object
      if (getTweet[name] ||
         (getTweet.tweet && name === 'gtDefault')) {
        if (name === 'gtDefault') {
          console.log('%cYou must pass a value for `name` if you are running `getTweet` more than once.', 'color: red;');
        } else {
          console.log('%cYou cannot use the same `name` more than once', 'color: red;');
        }
        return;
      }

      // Create timeline object
      getTweet[name] = {
        id: widget,
        callback: callbackFn,
        numTweets: howMany
      }

      // Create callback
      getTweet.process[name] = function(data) {
        getTweet.process(data, name);
      }

      var src = '//cdn.syndication.twimg.com/widgets/timelines/' + getTweet[name].id + '?&lang=en&callback=getTweet.process.' + name + '&suppress_response_codes=true&rnd=',
          script = '<script src="' + src + Math.random() + '"></script>';

      if ($('script[src^="' + src + '"]').length === 0) {
        $('head').eq(0).append(script);
      }
    },

    process: function(data, name) {
      var $fakeAPI = $('<div class="fake-api"></div>').append(data.body),
          tweets = [];

      for (i = 0; i < getTweet[name].numTweets; i++) {
        var $thisTweet = $fakeAPI.children('.root').children('.stream').children('.h-feed').children('.h-entry[data-tweet-id]').eq(i),
            $tweetContent = $thisTweet.children('.e-entry-content').children('.e-entry-title'),
            $userInfo = $thisTweet.children('.h-card').children('.profile');

        thisTweet = {
          html: $tweetContent.html(), // HTML from the tweet
          isRT: new Boolean($thisTweet.children('.e-entry-content').children('.retweet-credit').length).valueOf(), // Boolean indicates whether this is a retweet
          link: $thisTweet.children('.permalink').attr('href'), // Permalink to tweet
          name: $userInfo.children('.full-name').text().trim(), // Full name of user
          pic:  $userInfo.children('img').attr('src'), // URL for user's profile picture
          text: $tweetContent.text(), // Text from tweet (no links)
          time: Date.parse($thisTweet.children('.permalink').data('datetime')), // Number of milliseconds since January 1, 1970, 00:00:00 UTC
          user: $userInfo.children('.p-nickname').text() // User's screen name
        }

        tweets.push(thisTweet);
      }

      hereYouGo(tweets, name);
    }
  }

  function hereYouGo (out, name) {
    getTweet[name].tweets = out,
    getTweet[name].tweet  = out[0];

    if (name === 'gtDefault') {
      getTweet.tweet  = getTweet.gtDefault.tweet,
      getTweet.tweets = getTweet.gtDefault.tweets;

      getTweet.gtDefault.callback();

      getTweet.gtDefault = {},
      delete getTweet.gtDefault;
    } else {
      getTweet[name].callback();
    }
    
  }
}();