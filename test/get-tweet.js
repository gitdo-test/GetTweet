suite('get-tweet', function () {
    
  var widgetID = '347876295008460801';

  test('constructor', function () {
    var opts = {
          widget: widgetID,
          callbackFn: function () {
            return;
          }
        },
        get_tweet = GetTweet(opts);

    assert.instanceOf(get_tweet, GetTweet);
  });

  test('initVars', function () {
    var opts = {
          callbackFn: callback,
          howMany: null,
          widget: widgetID
        };

    function callback () {
      var tOpts = get_tweet.options;
      chai.assert.strictEqual(tOpts.callbackFn, opts.callbackFn);
      chai.assert.strictEqual(tOpts.howMany, opts.howMany);
      chai.assert.strictEqual(tOpts.widget, opts.widget);
    }

    var get_tweet = GetTweet(opts);
    opts.howMany = 1;
  });

  test('createProcess', function () {
    var opts = {
          widget: widgetID,
          callbackFn: callback
        },
        get_tweet = GetTweet(opts);

    function callback () {
      assert.typeOf(GetTweet.instances[get_tweet.id], 'function');
    };
  });

  test('injectScript', function () {
    var opts = {
          widget: widgetID,
          callbackFn: callback
        },
        get_tweet = GetTweet(opts);

    function callback () {
      var scriptSrc = document.getElementById('get-tweet-' + get_tweet.id).src,
          expectedSrc = 'http://cdn.syndication.twimg.com/widgets/timelines/' + get_tweet.options.widget + '?&lang=en&callback=GetTweet.instances.' + get_tweet.id + '&suppress_response_codes=true&rnd=';
      scriptSrc = scriptSrc.split('=');
      scriptSrc.pop();
      scriptSrc = scriptSrc.join('=');
      scriptSrc += '=';

      assert.strictEqual(scriptSrc, expectedSrc);
    };
  });

  test('hereYouGo', function () {
    var opts = {
          widget: widgetID,
          callbackFn: callback
        },
        get_tweet = GetTweet(opts);

    function callback () {
      assert.strictEqual(get_tweet.tweets[0], get_tweet.tweet);
    };
  });

  test('process', function () {
    var opts = {
          widget: widgetID,
          callbackFn: callback
        },
        get_tweet = GetTweet(opts);

    function callback () {
      var tweet = get_tweet.tweets[0];
      if (!tweet.isRT) {
        assert.strictEqual(tweet.name, 'Jimmy King');
        assert.strictEqual(tweet.user, 'jimmyking');
      } else {
        assert.notStrictEqual(tweet.name, 'Jimmy King');
        assert.notStrictEqual(tweet.user, 'jimmyking');
      }
    }
  });

});
