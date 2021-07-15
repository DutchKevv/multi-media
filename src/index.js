const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port = 3100
const { join } = require('path');
const Reddit = require('reddit')

const reddit = new Reddit({
    username: 'religioncoin',
    password: 'GeileMuntjes01',
    appId: '-RiNpwsHbVdbs8JLu_M83Q',
    appSecret: 'AkpnWFPH9LLnEk2T6sDENJSFGrCXKg'
});

// console.log(reddit)

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'html', 'post.html'));
})

app.post('/post', async (req, res) => {

    const body = req.body;

    console.log('content', body.content)


    // REDIT CODE
    try {
        // Submit to a specific schannel 
        // TODO - use AI to find crypto channels
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

    // FB CODE
    // TODO -
    // TIKTOK CODE
    // TODO -
    // TWITTER CODE
    // TODO -

});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
