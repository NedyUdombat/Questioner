import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/v1/index';


const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: 'Hi there! Welcome to our Questioner api! Visit /api/v1 for the Version 1 of out api' });
});

app.use('/api/v1', router);

app.get('*', (req, res) => res.status(404).json({
  status: 404,
  message: 'The page you are looking for does not exist',
}));

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  app.listen(port, () => {
    console.log(`Questioner app is live at http://127.0.0.1:${port}`);
  });
} else {
  app.listen(port);
}
export default app;
