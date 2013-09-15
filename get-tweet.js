/*
 * get-tweet.js v0.1 by Jimmy King
 * Licensed under The MIT License
 * Issues and feature requests at:
 * https://github.com/jking90/get-tweet
 */


function GetTweet (usrOpts) {
  if (this instanceof GetTweet === false) {
    return new GetTweet(usrOpts);
  }

  this.initVars(usrOpts);
  this.createProcess();
  this.injectScript();
}

GetTweet.noInstances = 0;
GetTweet.instances = {};

// Parse tweets from widget
GetTweet.process = function (data, instance) {
  var fakeAPI = document.createElement('div');
  instance.tweets = [];

  fakeAPI.innerHTML = data.body;

  for (var i = 0; i < instance.options.howMany; i++) {

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

    instance.tweets.push(thisTweet);
  }

  instance.hereYouGo();
};

GetTweet.prototype.initVars = function(usrOpts) {
  var defaults = {
    callbackFn: null,
    howMany: 1,
    widget: null
  };

  this.options = {};

  for (var key in defaults) {
    if (usrOpts.hasOwnProperty(key)) {
      this.options[key] = usrOpts[key];
    } else {
      this.options[key] = defaults[key];
    }
  }

  // Test arguments
  if (typeof this.options.callbackFn !== 'function') {
    console.log('%cYour callback must be a function', 'color: red;');
    return;
  } 

  if ((typeof this.options.howMany !== 'number') ||
      (this.options.howMany < 2) || (this.options.howMany > 20)) {
    this.options.howMany = defaults.howMany;
  }

  if (typeof this.options.widget !== 'string') {
    console.log('%cThe widget ID number must be passed as a string.', 'color: red;');
    return;
  }
};

// Create callback for Twitter
GetTweet.prototype.createProcess = function () {
  this.id = 'id_' + GetTweet.noInstances++;
  var self = this;
  GetTweet.instances[this.id] = function(data) {
    GetTweet.process(data, self);
  };
};

// Fetch the timeline from the Twitter widget
GetTweet.prototype.injectScript = function () {
  var script = document.createElement('script');
  script.id = 'get-tweet-' + this.id;
  script.src = '//cdn.syndication.twimg.com/widgets/timelines/' + this.options.widget + '?&lang=en&callback=GetTweet.instances.' + this.id + '&suppress_response_codes=true&rnd=' + Math.random();
  document.getElementsByTagName('head')[0].appendChild(script);
};

// Deliver tweets & trigger callback
GetTweet.prototype.hereYouGo = function () {
  this.tweet = this.tweets[0];
  this.options.callbackFn(this);
};
