var express = require('express');
var router = express.Router();
var mng = require('mongoose');

mng.connect('mongodb://localhost');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/comments/', function(req, res) {
	var conn = mng.connection;
	var db = conn.db('mng');
	db.collection('comments', function(err, comments) {
		comments.find(function(err, items) {
			items.toArray(function(err, arr) {
				res.send(arr);
			});
		});
	});
});

router.post('/comments/', function(req, res) {
	console.log('in');
	var conn = mng.connection;
	console.log('conn:', conn);
	var db = conn.db('mng');
	console.log('GOT DB!!!!!!');
	console.log('db:', db);
	var name = req.query.name;
	console.log('name:', name);
	var comment = req.query.comment;
	console.log('comment:', comment);
	var addable = { name: name, comment: comment };
	console.log('addable:', addable);
	db.collection('comments', function(err, comments) {
		console.log('comments:', comments);
		comments.insert(addable);
		console.log('made it through');
	});
});

module.exports = router;
