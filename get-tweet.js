/*
 * get-tweet.js v0.2.1 by Jimmy King
 * Licensed under The MIT License
 * Issues and feature requests at:
 * https://github.com/jking90/get-tweet
 */

var getTweet = function () {

  return {
    please: function(widget, callbackFn, howMany, name) {
      if (typeof howMany === 'string') {
        name = howMany;
      }
      
      if (typeof name != 'string') {
        name = 'gtDefault';
      }

      if ((typeof howMany != 'number') ||
         (howMany < 2) || (howMany > 20)) {
        howMany = 1;
      }

      getTweet[name] = {
        id: widget,
        callback: callbackFn,
        numTweets: howMany
      }

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
        hereYouGo(tweets, name);
      } else {
        var tweet = tweets[0];
        hereYouGo(tweet, name);
      }
    }
  }

  function hereYouGo (out, name) {
    if (Array.isArray(out)) {
      getTweet[name].tweets = out,
      getTweet[name].tweet  = out[0];
    } else {
      getTweet[name].tweet  = out;
    }

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