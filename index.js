// const express = require('express')
// const path = require('path')
const PORT = 3000
// // const PORT = process.env.PORT || 5001

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .get('/cool', (req, res) => res.send(cool()))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'J1r2niYOhoV8+axCGVV6dRBZgvF9dG82txDNYb7yq7uh2FSO/EzLHveCa3UBk/CxbgFfREVBFpx0v9B7Z+aM/XklJFIO8hQt1ftq15Ns6MMEVo9VevdPFNjtXAbHG2sagc3TSpVkp6PAgUCNJHU6QgdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'f3c39f102dd65ae195f4c24276fe69b3'
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

app.get('/',(req,res)=>{
  res.send("<html><body><h1>hello world</h1></body></html>")
})

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

var server = app.listen(PORT,()=>{
  console.log('server is listening on port :'+ PORT );
});