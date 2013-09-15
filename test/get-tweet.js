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
      widget: widgetID
    };

    function callback () {
      assert.strictEqual(get_tweet.options, opts);
    }

    var get_tweet = GetTweet(opts);
    opts.howMany = 1;
  });

  test('createProcess', function () {
    var opts = {
      widget: widgetID,
      callbackFn: function () {
        assert.typeOf(GetTweet.instances[get_tweet.id], 'function');
      }
    },
    get_tweet = GetTweet(opts);
  });

  test('injectScript', function () {
    var opts = {
      widget: widgetID,
      callbackFn: function () {
        var scriptSrc = document.getElementsByTagName('script')[GetTweet.noInstances - 1].src,
            expectedSrc = 'http://cdn.syndication.twimg.com/widgets/timelines/' + get_tweet.options.widget + '?&lang=en&callback=GetTweet.instances.' + get_tweet.id + '&suppress_response_codes=true&rnd=';
        scriptSrc = scriptSrc.split('=');
        scriptSrc.pop();
        scriptSrc.join('=');
        scriptSrc += '=';

        assert.srictEqual(scriptSrc, expectedSrc);
      }
    },
    get_tweet = GetTweet(opts);
  });

  test('hereYouGo', function () {
    assert.isTrue(false);
  });

  test('process', function () {
    assert.isTrue(false);
  });

});
