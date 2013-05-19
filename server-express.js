var express = require('express'),
	posts = require('./routes/post');

var app = express();

app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

app.get('/posts', posts.findAll);
app.get('/posts/:id', posts.findById);
app.post('/posts', posts.addPost);
app.put('/posts/:id',posts.updatePost);
app.delete('/posts/:id',posts.deletePost);

app.listen(3000);
console.log('Listening on port 3000...');