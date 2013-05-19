var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost',27017,{auto_reconnect: true});
db = new Db('blogdb', server);

db.open(function(err, db) {
	if(!err) {
		console.log("Connected to 'postdb' database");
		db.collection('posts', {strict: true}, function(err,collection){
			if(err) {
				console.log("The 'posts' collection doesn't exist. Creating it with sampel data");
				populateDB();
			}
		});
	}
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving post: ' + id);
    db.collection('posts', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('posts', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addPost = function(req, res) {
    var post = req.body;
    console.log('Adding post: ' + JSON.stringify(wine));
    db.collection('posts', function(err, collection) {
        collection.insert(post, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

 
exports.updatePost = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating Post: ' + id);
    console.log(JSON.stringify(wine));
    db.collection('posts', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, post, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating post: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(post);
            }
        });
    });
}
 
exports.deletePost = function(req, res) {
    var id = req.params.id;
    console.log('Deleting post: ' + id);
    db.collection('posts', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var posts = [
    {
        title: "CHATEAU DE SAINT COSME",
        author: "Prabhat",
        publishedAt: new Date('05-15-2013'),
		intro: "Please visit [emberJS](http://emberjs.com/) for more details",
		extended: "[Mavuno](http://mavuno.co.in)"
    },
    {
        title: "Lets check this out",
        author: "Prabhat",
        publishedAt: new Date('05-19-2013'),
		intro: "Please visit [nodeJS](http://nodejs.org/) for more details",
		extended: "[Mavuno](http://mavuno.co.in)"
    }];
 
    db.collection('posts', function(err, collection) {
        collection.insert(posts, {safe:true}, function(err, result) {});
    });
 
};