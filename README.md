# getTweet
#### A bit of jQuery for loading a users latest tweet without the Twitter API

### Usage:
To get the tweet run `getTweet.please(id, callback);`. Where `id` is the user ID number and `callback` is the function to execute after the tweet has been fetched. Once that's been run, the tweet will be publicly available as an object at `getTweet.tweet`. It will look like this:

```javascript
getTweet.tweet = {
  html: "string", // HTML from the tweet 
  link: "https://twitter.com/user/statuses/[...]", // Permalink to tweet
  name: "Full Name", // Full name of user
  pic:  "https://si0.twimg.com/profile_images/[...]_normal.jpeg", // URL for user's profile picture
  text: "string", // Text from tweet (no links)
  time: 1371501240000, // Number of milliseconds since January 1, 1970, 00:00:00 UTC
  user: "@user" // User's screen name
}
```

### Help:
You can get any twitter user's ID number by creating a [Twitter widget](https://twitter.com/settings/widgets). Type in the desired username in the configuration settings and click the blue "Create Widget" button. The user's ID number will be in the `data-widget-id` attribute of the `<a>` in the generated code.

### Dependancies:
  - jQuery
