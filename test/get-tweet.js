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
    assert.isTrue(false);
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
