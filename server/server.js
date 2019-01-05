import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';



const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Questioner app is live at http://127.0.0.1:${port}`);
});

export default app;