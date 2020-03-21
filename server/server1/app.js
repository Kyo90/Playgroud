const express = require('express');

const app = express();

app.use(express.static('public'));

app.listen(3003, () => {
  console.log('Listening on prot 3003')
})



