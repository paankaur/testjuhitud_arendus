import express from 'express';
import todoRoutes from './routes/todo.routes.js';
import connectDB from './mongodb/mongodb.connect.js';
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/todos', todoRoutes);
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;