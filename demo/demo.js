$(function() {

  getTweet = new GetTweet({widget:'347876295008460801', callbackFn:updateExample});

  function logTest () {
    console.log('test');
  }
  function updateExample() {
    var tweet = getTweet.tweet;

    if(tweet.html.indexOf('<') !== -1) {
      tweet.html = tweet.html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    tweet.html = "'" + tweet.html + "'";
    $('.string').eq(0).empty().append(tweet.html);

    $('.boolean').empty().append(tweet.isRT.toString());

    tweet.link = "'" + tweet.link + "'";
    $('.string').eq(1).empty().append(tweet.link);

    tweet.name = "'" + tweet.name + "'";
    $('.string').eq(2).empty().append(tweet.name);

    tweet.pic = "'" + tweet.pic + "'"
    $('.string').eq(3).empty().append(tweet.pic);

    tweet.text = "'" + tweet.text + "'";
    $('.string').eq(4).empty().append(tweet.text);

    $('.number').empty().append(tweet.time);

    tweet.user = "'" + tweet.user + "'";
    $('.string').eq(5).empty().append(tweet.user);
  }

});
