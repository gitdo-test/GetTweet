/*
 * get-tweet.js v0.1 by Jimmy King
 * Licensed under The MIT License
 * Issues and feature requests at:
 * https://github.com/jking90/get-tweet
 */

var getTweet = (function () {

  function GetTweet (widget, howMany, name, callbackFn) {
  
    if (!this.instanceOf(GetTweet)) {
      return new GetTweet.apply(this, arguments);
    }
  
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
    GetTweet.process[name] = function(data) {
      GetTweet.process(data, name);
    }

    // Fetch the timeline from the Twitter widget
    var script = document.createElement('script');
    script.src = '//cdn.syndication.twimg.com/widgets/timelines/' + widget + '?&lang=en&callback=getTweet.process.' + name + '&suppress_response_codes=true&rnd=' + Math.random();
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  GetTweet.prototype.hereYouGo = function (out, name) {
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
  };

  GetTweet.process = function (data, name) {
    var fakeAPI = document.createElement('div'),
        tweets = [];

    fakeAPI.innerHTML = data.body;

    for (i = 0; i < getTweet[name].numTweets; i++) {

      var thisTweet = fakeAPI.getElementsByClassName('tweet')[i],
          tweetContent = thisTweet.getElementsByClassName('e-entry-title')[0],
          userInfo = thisTweet.getElementsByClassName('u-url profile')[0];

      thisTweet = {
        html: tweetContent.innerHTML, // HTML from the tweet
        isRT: new Boolean(thisTweet.getElementsByClassName('retweet-credit').length).valueOf(), // Boolean indicates whether this is a retweet
        link: thisTweet.getElementsByClassName('permalink')[0].href, // Permalink to tweet
        name: userInfo.getElementsByClassName('full-name')[0].innerText.replace(/^\s+|\s+$/g,''), // Full name of user
        pic:  userInfo.getElementsByTagName('img')[0].src, // URL for user's profile picture
        text: tweetContent.innerText, // Text from tweet (no links)
        time: Date.parse(thisTweet.getElementsByClassName('permalink')[0].dataset.datetime), // Number of milliseconds since January 1, 1970, 00:00:00 UTC
        user: userInfo.getElementsByClassName('p-nickname')[0].innerText // User's screen name
      }

      tweets.push(thisTweet);
    }

    this.hereYouGo(tweets, name);
  };
}());
