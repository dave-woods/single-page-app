const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

app.use(express.static(__dirname + '/src'));

app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'src', 'index.html'));
});

app.listen(port, function() {
	console.log(`The app is listening on port ${port}.`);
});
