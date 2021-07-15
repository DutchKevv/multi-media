const SocialPost = require("social-post-api");
const API_KEY = "X6N4E8R-1P94BNN-PFE1WV9-FTMJ301"; 
const social = new SocialPost(API_KEY);

// fuck m
social.post({
    post: "One more time", // content
    platforms: ["twitter", "facebook", "linkedin"]
}).catch(error => {
    // on error, send SMS / EMAIL to Wytze, Kewin, Indy
})
