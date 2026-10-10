const express = require('express');
const studentRoutes = require('./studentRoutes');

const app = express();

app.use(express.json());
app.use('/students', studentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});