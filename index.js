import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID for unique identifiers

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
    const { author_name, article_name, new_post } = req.body;
    const post = {
        id: uuidv4(), // Assigning a unique ID to each post
        author_name,
        article_name,
        new_post
    };
    posts.push(post);
    res.render('index', { posts: posts });
});

app.post('/delete/:id', (req, res) => {
    const postId = req.params.id;
    posts = posts.filter(post => post.id !== postId);
    res.render('index', { posts: posts });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
