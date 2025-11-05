import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const PORT = process.env.PORT || 3210;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});