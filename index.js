import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Array to store posts
let posts = [];

app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

app.post('/', (req, res) => {
    const new_post = req.body['new_post'];
    posts.push(new_post);
    res.render('index', { posts: posts });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
