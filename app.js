const express = require('express');
const app = express();
const path = require('path');
const {v4 :uuidv4} = require('uuid');
uuidv4();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')))



// app.use((req,res) => {
     // console.log('yeah, you found me')
     // res.send('hello , we got you');
     // res.send({color:'red'});
    // res.send("<h1>Hello I'm header</h1>")
// })



// app.get('/home',(req,res) => {
//     console.log('hello this is get')
//     res.send('this is home page. wellcome to homepage')
// })

// app.get('/about' ,(req,res) =>{
//     console.log('this is about page')
//     res.send('this is about page.')
// })

// app.get('/r/:subreddit', (req,res) => {
//     const {subreddit}  = req.params;
//     res.send(`this is ${subreddit} subpage`)
//     console.log(req.params);
// })

// // always use this under every thing. * means all we can only send one and it done.
// app.get('*', (req,res) => {
//     res.send('404 please check your url');
// })

app.set('view engine' ,'ejs');
app.set('views', path.join(__dirname,'/views'))

app.get('/',(req,res) => {
    res.render('home.ejs')
})

// app.get('/rand',(req,res) => {
//     const num = Math.floor(Math.random() * 10);
//     res.render('home', { num })
// })

// app.get('/about/:sub' , (req,res) => {
//     const {sub} = req.params;
//     res.render('home', {sub});
//     console.log(sub);
// });


// app.get('/cat',(req,res) => {
    //const cats = [
        //'blue','rokect','monty','tom','Stephanie','Winston'
        //]
        //res.render('home', {cats})
// })

// const redditData = require('./views/data.json');

// app.get('/:sub' , (req,res) => {
//     const { sub } = req.params;
//     const data = redditData[sub];
//     console.log(data);
//     if(data) {
//         res.render('home',{...data});
//     }else {
//         res.send('<h1>Not found, this is a error msg!</h1>')
//     }
// }) 


// app.use(express.urlencoded({extended:true}));
// app.use(express.json());

// app.get('/tacos' , (req,res) => {
//     res.send('get / tacos response')
// });  

// app.post('/tacos' , (req , res) => {
//     const {meat,qty} = (req.body);
//     res.send(`oK, this is your results ${meat} ${qty}`)
// })

// Get /Comment - list all Comment
// Post /Comment - create a new Comment
// Get /Comment/:id -get one comment (using ID)
// Patch /comment/:id - update one comment
// Delete /comment/:id - destroy one comment

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('public', path.join(__dirname,'public'));
app.set('view engine','ejs')


let comments = [ 
    {
        id : uuidv4(),
        username:'Todd',
        comment :'lol that is so funny'
    },
    {
        id :uuidv4(),
        username:'Skyler',
        comment :'I like to go birdwatching with my dog'
    },
    {
        id: uuidv4(),
        username:'Sk8erBoi',
        comment :'Plz delete your account,Todd'
    },
    {
        id :uuidv4(),
        username:'onlysayswoof',
        comment :'woof woof woof'
    }
]

app.get('/comment' ,(req ,res) => {
    res.render('../public/comments/index', {comments} )
})

app.get('/comment/new',(req,res) => {
    res.render('../public/comments/new');
})

app.post('/comment',(req,res) => {
    const { username, comment } = req.body;
    comments.push({username,comment,id : uuidv4()}) ;
    res.redirect('/comment')
})

app.get('/comment/:id',(req,res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('../public/comments/show' , { comment })
})

app.get('/comment/:id/edit', (req,res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('../public/comments/edit', { comment })
})

app.patch('/comment/:id', (req,res) => {
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c=> c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comment');
})

app.delete('/comment/:id', (req,res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comment');
})














app.listen(3000, () => {
    console.log(`Hi, I'm listening on port 3000`)
})

