import express from 'express';

const app = express()
const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/newpage', (req,res) => {
  res.send('Hello this page is newpage')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

