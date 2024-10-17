const express = require('express');
const connectDB = require('./src/config/db');
const router = require('./src/routes/productRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swaggerOptions');

const app = express();

app.use(express.json());

connectDB();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/koi-farm', router); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
