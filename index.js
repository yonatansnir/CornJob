const express = require('express');
const CornJob = require('node-cron');

const app = express();

app.listen(
    process.env.port || 5050,
    console.log('Server Is Running...')
)

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/static/index.html')
})

const firestore = require('./db.config').firestore;


CornJob.schedule('* * * * *', () => {
    firestore.doc('appData/appData')
    .get().then(data => console.log(data.id, data.data().gym));
})
