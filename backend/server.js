const express = require('express');
const connectDB = require('./src/config/db');
const router = require('./src/routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swaggerOptions');
const cors = require('cors');

const app = express();

// Sử dụng cors mặc định để cho phép tất cả các origin
app.use(cors());

app.use(express.json());

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', router);

// Sử dụng PORT là một số, không bao gồm địa chỉ IP
const PORT = process.env.PORT || 3000;

// Sử dụng '0.0.0.0' để lắng nghe trên tất cả các địa chỉ mạng
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Swagger Docs are available at http://localhost:${PORT}/api-docs`
  );
});
