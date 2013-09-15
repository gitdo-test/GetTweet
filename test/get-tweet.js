suite('get-tweet', function () {
    
  test('constructor', function () {
    var opts = {
      widget: '1234',
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
      widget: '1234'
    };

    function callback () {
      assert.strictEqual(get_tweet.options, opts);
    }

    var get_tweet = GetTweet(opts);
    opts.howMany = 1;
  });

  test('createProcess', function () {
    assert.isTrue(false);
  });

  test('injectScript', function () {
    assert.isTrue(false);
  });

  test('hereYouGo', function () {
    assert.isTrue(false);
  });

  test('process', function () {
    assert.isTrue(false);
  });

});
