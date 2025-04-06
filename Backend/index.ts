import express from 'express';
import router  from './src/routes/food.ts';
import path from 'path';
import cors from 'cors';

// console.log('__dirname:', __dirname); // should now work
// console.log('path.join:', path.join(__dirname, 'test.txt'));


const app = express();
app.use(express.json({ limit: '10mb' }));

const PORT = 3000;
app.use(cors()); // <-- add this

app.use(express.json());
app.use('/api/food', router);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});