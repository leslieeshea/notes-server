const express = require('express');
const cors = require('cors');
const mongoConnection = require('./middleware/mongoose-connection');

const app = express();

app.use(cors());

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());
app.use('/api/v1/notes', mongoConnection, require('./routes/notes'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
