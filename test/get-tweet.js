/* jshint newcap: false */

suite('get-tweet', function () {
    
  var widgetID = '347876295008460801',
      opts,
      getTweet;

  setup(function () {
    opts = {
      widget: widgetID,
      callbackFn: function () {
        return;
      }
    };

    getTweet = GetTweet(opts);
  });

  test('constructor', function () {
    assert.instanceOf(getTweet, GetTweet);
  });

  test('initVars', function () {
    var tOpts = getTweet.options;

    assert.strictEqual(tOpts.callbackFn, opts.callbackFn);
    assert.strictEqual(tOpts.howMany, 1);
    assert.strictEqual(tOpts.widget, opts.widget);
  });

  test('createProcess', function () {
    assert.typeOf(GetTweet.instances[getTweet.id], 'function');
  });

  test('injectScript', function () {
    var scriptSrc = getTweet.scriptElem.src,
        expectedSrc = 'http://cdn.syndication.twimg.com/widgets/timelines/' + getTweet.options.widget + '?&lang=en&callback=GetTweet.instances.' + getTweet.id + '&suppress_response_codes=true&rnd=';
    scriptSrc = scriptSrc.replace(/(.+=)[\.\d]+$/, '$1');

    assert.strictEqual(scriptSrc, expectedSrc);
  });

  test('hereYouGo', function () {
    var testVar = 0;

    getTweet.tweets = [0, 1, 2];
    
    getTweet.options.callbackFn = function () {
      testVar++;
    };

    getTweet.hereYouGo();

    assert.strictEqual(getTweet.tweets[0], getTweet.tweet);
    assert.strictEqual(testVar, 1);
  });

  test('process', function () {

    var data = {
      body: '<div><div class="stream"><ol class="h-feed"><li class="tweet"><a class="u-url permalink" href="https://twitter.com/iamdevloper/statuses/380285502580338688" data-datetime="2013-09-18T11:01:43+0000"></a><div><a class="u-url profile" href="https://twitter.com/iamdevloper"><img src="https://si0.twimg.com/profile_images/2170966625/56CD5565-6B71-4DBB-84D3-24258DED9FF2_normal"><span class="full-name"><span class="p-name">I Am Devloper</span></span><span class="p-nickname">@<b>iamdevloper</b></span></a></div><div class="e-entry-content"><p class="e-entry-title">Bringing a knife to a gun fight is like bringing PHP to a modern web stack.</p><div class="retweet-credit"><i class="ic-rt"></i>Retweeted by <a class="profile h-card" href="https://twitter.com/jimmyking" title="@jimmyking on Twitter">Jimmy King</a></div></div></li></ol></div></div>'
    };

    GetTweet.process(data, getTweet);
    var tweet = getTweet.tweets[0];

    assert.strictEqual(tweet.name, 'I Am Devloper');
    assert.strictEqual(tweet.user, '@iamdevloper');
    assert.isTrue(tweet.isRT);
    assert.strictEqual(tweet.link, 'https://twitter.com/iamdevloper/statuses/380285502580338688');
    assert.strictEqual(tweet.pic,  'https://si0.twimg.com/profile_images/2170966625/56CD5565-6B71-4DBB-84D3-24258DED9FF2_normal');
    assert.strictEqual(tweet.text, 'Bringing a knife to a gun fight is like bringing PHP to a modern web stack.');
    // This passes in the browser, but tweet.time is
    // `NaN` in PhantomJS
    //assert.strictEqual(tweet.time, 1379502103000);
  });

});
