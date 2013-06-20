var getTweet = function () {
  var tweet = {},
      callbackFn;

  return {
    please: function(id, callback) {
      var fakeAPI = '<script src="//cdn.syndication.twimg.com/widgets/timelines/' + id + '?&lang=en&callback=getTweet.process&suppress_response_codes=true&rnd=' + Math.random() + '"></script>'
      $('head').eq(0).append(fakeAPI);
      callbackFn = callback;
    },
    
    process: function(data) {
      var $fakeAPI = $('<div class="fake-api"></div>');
      $fakeAPI.append(data.body);
      var $latestTweet = $fakeAPI.children('.root').children('.stream').children('.h-feed').children('.h-entry[data-tweet-id]').eq(0),
          $tweetContent = $latestTweet.children('.e-entry-content').children('.e-entry-title'),
          $userInfo = $latestTweet.children('.h-card').children('.profile');

      tweet = {
        html: $tweetContent.html(),
        time: Date.parse($latestTweet.children('.permalink').data('datetime')),
        link: $latestTweet.children('.permalink').attr('href'),
        user: $userInfo.children('.p-nickname').text(),
        text: $tweetContent.text(),
        name: $userInfo.children('.full-name').text().trim(),
        pic: $userInfo.children('img').attr('src')
      }

      hereYouGo (tweet, callbackFn);
    }
  }
  
  function hereYouGo (obj, callback) {
    getTweet.tweet = obj;
    callback();
  }
}();