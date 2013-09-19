# getTweet
#### A script for loading a user's latest tweet(s) without the Twitter API

### Usage:
To get the tweet run the followng:

```javascript
var myTweets = new GetTweet({
  widget: '1234567890', // Twitter widget ID number
  howMany: 5, // Number of tweets to load (1-20) - default is 1.
  callbackFn: myFunction // Function to execute after tweets have been fetched
});
```

Once that's been run, the tweet(s) will be available as an object at `myTweets.tweets`. It is an array of objects that look like this:

```javascript
myTweets.tweets[0] = {
  html: "string", // HTML from the tweet 
  isRT: false, // Boolean indicates whether this is a retweet
  link: "https://twitter.com/user/statuses/[...]", // Permalink to tweet
  name: "Full Name", // Full name of user
  pic:  "https://si0.twimg.com/profile_images/[...]_normal.jpeg", // URL for user's profile picture
  text: "string", // Text from tweet (no links)
  time: 1371501240000, // Number of milliseconds since January 1, 1970, 00:00:00 UTC
  user: "@user" // User's screen name
}
```

The first tweet (most recent) in the array is also available at `myTweets.tweet`.


### Help:
You can get any twitter user's ID number by creating a [Twitter widget](https://twitter.com/settings/widgets). Type in the desired username in the configuration settings and click the blue "Create Widget" button. The widget's ID number will be in the `data-widget-id` attribute of the `<a>` in the generated code.
