import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));




let posts = [];

app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

app.post('/', (req, res) => {
    const { author_name, article_name, new_post } = req.body;
    const post = {
        id: uuidv4(),
        author_name,
        article_name,
        new_post,
        date: new Date()
    };
    posts.push(post);
    res.render('index', { posts: posts });
});

app.post('/delete/:id', (req, res) => {
    const postId = req.params.id;
    posts = posts.filter(post => post.id !== postId);
    res.render('index', { posts: posts });
});

app.get('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts.find(p => p.id === postId);
    res.render('edit', { post: post });
});
app.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts.find(p => p.id === postId);
  
    res.render('post', { post });
  });
  
app.post('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const { author_name, article_name, new_post } = req.body;
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        posts[postIndex] = { id: postId, author_name, article_name, new_post };
    }
    res.redirect('/');
});


app.get('/documentation',(req,res) =>{

res.render('docs')
})

app.get('/about', (req,res) =>{

    res.render('about');
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
