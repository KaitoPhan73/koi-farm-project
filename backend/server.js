const express = require('express');
const connectDB = require('./src/config/db');
const router = require('./src/routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swaggerOptions');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', router);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Swagger Docs are available at http://localhost:${PORT}/api-docs`
  );
});
