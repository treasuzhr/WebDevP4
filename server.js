require('dotenv').config();
const app = require('./src/app');

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});