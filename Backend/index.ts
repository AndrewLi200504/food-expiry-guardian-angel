import express from 'express';
import router  from './src/routes/food.ts';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/food', router);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});