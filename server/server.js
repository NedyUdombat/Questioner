import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/v1/index';
import Upload from './middlewares/ImageUpload';


const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Hi there! Welcome to our Questioner api! Visit /api/v1 for the Version 1 of our api' });
});


app.post('/api/images', (req, res) => {
  console.log("yeah");
});
// app.post('/api/images', Upload.single('file'));
// (req, res) => {
//   console.log(req.file) // to see what is returned to you
//   const image = {};
//   image.url = req.file.url;
//   image.id = req.file.public_id;
//   Image.create(image) // save image information in database
//     .then(newImage => res.json(newImage))
//     .catch(err => console.log(err));
// }
// );

app.use('/api/v1', router);

app.all('*', (req, res) => res.status(404).json({
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
