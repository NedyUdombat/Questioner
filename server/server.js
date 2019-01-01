import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const router = express.Router(); 

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api/v1/', router);

app.listen(port, () => {
  console.log(`App is strolling at http://localhost:${port}`);
});

export default app;
