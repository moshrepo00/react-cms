const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');


app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    const dist = path.join(__dirname, '../build/index.html');
    res.sendFile(dist);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
