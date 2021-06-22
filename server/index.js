const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');


app.use(express.static(path.join(__dirname, '../build/drupal-api-frontend')));
app.get('*', (req, res) => {
    const dist = path.join(__dirname, '../dist/drupal-api-frontend/index.html');
    res.sendFile(dist);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
