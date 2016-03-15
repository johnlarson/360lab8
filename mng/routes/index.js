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
	var db = conn.db.db('lab8');
	db.collection('comments', function(err, comments) {
		comments.find(function(err, items) {
			items.toArray(function(err, arr) {
				res.send(arr);
			});
		});
	});
});

router.post('/comments/', function(req, res) {
	var conn = mng.connection;
	var db = conn.db.db('lab8');
	var args = req.body;
	var name = args.name;
	var comment = args.comment;
	var addable = { name: name, comment: comment };
	db.collection('comments', function(err, comments) {
		comments.insert(addable);
		res.send({ success: true });
	});
});

router.get('/obj/', function(req, res) {
	var conn = mng.connection;
	var db = conn.db.db('lab8');
	db.collection('objs', function(err, objs) {
		objs.find(function(err, items) {
			items.toArray(function(err, arr) {
				res.send(arr);
			});
		});
	});
});

router.post('/obj/', function(req, res) {
	var conn = mng.connection;
	var db = conn.db.db('lab8');
	var obj = req.body;
	db.collection('objs', function(err, objs) {
		objs.insert(obj);
		res.send({ success: true });
	});
});

module.exports = router;
