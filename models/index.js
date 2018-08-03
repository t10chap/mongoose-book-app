var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/book-app", { useNewUrlParser: true });

const BookModel = require("./book.js");
const AuthorModel = require("./author.js");

module.exports = {
  Book: BookModel,
  Author: AuthorModel,
}
