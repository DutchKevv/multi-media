const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port = 3100
const SocialPost = require("social-post-api");
const API_KEY = "X6N4E8R-1P94BNN-PFE1WV9-FTMJ301";
const social = new SocialPost(API_KEY);
const { join } = require('path');
const Reddit = require('reddit')

const reddit = new Reddit({
    username: 'religioncoin',
    password: 'GeileMuntjes01',
    appId: '-RiNpwsHbVdbs8JLu_M83Q',
    appSecret: 'AkpnWFPH9LLnEk2T6sDENJSFGrCXKg',
    //   userAgent: 'MyApp/1.0.0 (http://example.com)'
});

// console.log(reddit)

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'html', 'post.html'));
})

app.post('/post', async (req, res) => {

    const body = req.body;

    console.log('content', body.content)

    try {

        // Submit a link to the /r/BitMidi subreddit
        const redditRes = await reddit.post('/api/submit', {
            sr: body.channel,
            kind: 'self',
            // resubmit: true,
            body: body.content,
            text: body.content,
            title: body.title,
            url: 'https://religioncoin.info'
        });

        console.log(redditRes)

        res.send({ url: redditRes.json.data.url });
    } catch (error) {
        res.send(error);
    }


});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
