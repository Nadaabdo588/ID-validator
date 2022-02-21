const express = require("express");
const app= express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/ids', require('./routes/api/ids'))


const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`server running on port ${PORT}`));