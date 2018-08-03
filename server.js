// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

var db = require('./models')

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



////////////////////
//  DATA
///////////////////

var newBookUUID = 18;

////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find()
    .populate('author')
    .exec((err, allBooks) => {
      if(err){console.log(err);}

      res.json(allBooks);
    })
});


// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  let id = req.params.id;
  db.Book.findOne({author: 'author0'})
  .populate('author')
  .exec((err, book) => {
    if(err){console.log(err);}

    res.json(book);
});
});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  var newBook = new db.Book({
    title: req.body.title,
    image: req.body.image,
    releaseDate: req.body.releaseDate,
  });

  // this code will only add an author to a book if the author already exists
  db.Author.findOne({name: req.body.author}, function(err, author){
    if(findOne === true){newBook.author = author;}
    // add newBook to database
    else{
      var newAuthor = new db.Author({
        name: req.body.name,
        alive: req.body.alive,
        image: req.body.image,
      });
    newAuthor.save();
    newBook.author = newAuthor;
    newBook.save();
  }
    newBook.save(function(err, book){
      if (err) {
        console.log("create error: " + err);
      }
      console.log("created ", book.title, "and author ", book.author);
      res.json(book);
    });
});

// update book
app.put('/api/books/:id', function(req,res){
// get book id from url params (`req.params`)
  console.log(req);
  let id = parseInt(req.params.id);

  db.Book.findOneAndUpdate(id, req.body, {new: true}, (err, newBook) => {
    if(err){
      console.log(err);
    }
    else{
      res.json(newBook);
    }
  })
});

// delete book
app.delete('/api/books/:id', function(req, res) {
  // get book id from url params (`req.params`)
  let bookId = req.params.id;
  db.Book.findOneAndRemove({ _id:bookId }, (err, deleteBook) =>{
    if (err){
      console.log(err);
    }
    res.json(deleteBook);
    });
  });

app.listen(process.env.PORT || 3000, function () {
  console.log('Book app listening at http://localhost:3000/');
});
