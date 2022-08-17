const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const morgan = require('morgan');
const { logging } = require('./middleware/logging');

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json()); 
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(logging)

app.use(`/api/v${process.env.API_VERSION}`, require("./routes"));
app.use(`/api/v${process.env.API_VERSION}/assets/images/gallery/upload`, express.static("assets/images/gallery/upload")); 

app.listen(port, () => console.log(`App listening on port http://localhost:${port}!`));