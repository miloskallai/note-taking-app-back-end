const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`The server is up and running on port: ${PORT}`);
});
