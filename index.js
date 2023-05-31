const express = require('express');
const fs = require('fs');
const app = express();

function serveFile(filePath, res, contentType, statusCode) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(statusCode, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

app.get('/', (req, res) => {
  serveFile('./index.html', res, 'text/html', 200);
})

app.get('/about.html', (req, res) => {
  serveFile('./about.html', res, 'text/html', 200);
});

app.get('/contact-me.html', (req, res) => {
  serveFile('./contact-me.html', res, 'text/html', 200);
});

app.get('/style.css', (req, res) => {
  serveFile('./style.css', res, 'text/css', 200);
});

// catch all middleware
app.use((req, res) => {
  serveFile('./404.html', res, 'text/html', 404);
});

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});



