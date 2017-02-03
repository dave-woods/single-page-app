const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

app.use(express.static('src'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
	console.log(__dirname);
});

app.listen(port, function() {
	console.log(`The app is listening on port ${port}.`);
});
