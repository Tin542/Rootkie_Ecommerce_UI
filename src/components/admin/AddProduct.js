import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import Navbar from "./AdminNavbar";
import "../assets/AddProduct.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const short = (value) => {
  if (value.length < 2) {
    return (
      <div className="alert alert-danger" role="alert">
        this field required atleast 2 chars !!
      </div>
    );
  }
};

const number = (value) => {
  var reg = new RegExp("^[0-9]+$");
  if (!reg.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        bookName required atleast 2 chars !!
      </div>
    );
  }
};
export default class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listCategory: [],

      book_name: "",
      bookDescription: "",
      bookPrice: 0,
      image: "",
      quantity: 0,
      categoryName: "",
      publisher: "",
      publish_year: 0,
      author: "",
    };
  }

  componentDidMount() {
    this.loadCategory();
  }

  loadCategory() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(`http://localhost:9999/BookStore/home/category`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            listCategory: response.data.data,
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.errorCode !== null) {
            alert(err.response.data.errorCode);
          }
        }
      });
  }

  setParams = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value });
  };

  addBook(e) {
    e.preventDefault();
    var book = {
        book_name: this.state.book_name,
        bookDescription: this.state.bookDescription,
        bookPrice: this.state.bookPrice,
        categoryName: this.state.categoryName,
        author: this.state.author,
        publisher: this.state.publisher,
        publish_year: this.state.publish_year,
        image: this.state.image,
        quantity: this.state.quantity,
    };
    console.log(book);
    axios.post("http://localhost:9999/BookStore/admin/add-book/", book)
    .then(response => {
      if (response.status === 200) {
          console.log(response);
          alert(response.data.successCode);
      }else{
        console.log(response);
      }
  })
  .catch((err) => {
    console.log(err);
    alert(err.response.data.errorCode);
  });
    return book;
  }

  render() {
    return (
      <div>
        <Navbar />
        <Form class="login">
          <div class="login-screen">
            <div class="app-title">
              <h1>Add Product</h1>
            </div>
            <div class="control-group">
              <Input
                type="text"
                placeholder="Enter book name"
                name="book_name"
                class="login-field"
                id="book-name"
                value={this.state.bookName}
                onChange={this.setParams}
                validations={[required, short]}
              />
            </div>
            <label class="login-field-icon fui-user" for="book-name"></label>

            <div class="control-group">
              <Input
                type="text"
                placeholder="Enter book description"
                name="bookDes"
                class="login-field"
                id="book-des"
                value={this.state.bookDescription}
                onChange={this.setParams}
                validations={[required, short]}
              />
            </div>
            <label class="login-field-icon fui-user" for="book-des"></label>

            <div class="control-group">
              <Input
                type="text"
                placeholder="Enter book Price"
                name="bookPrice"
                class="login-field"
                id="book-price"
                value={this.state.bookPrice}
                onChange={this.setParams}
                validations={[required, short]}
              />
            </div>
            <label class="login-field-icon fui-user" for="book-price"></label>

            <div class="control-group">
              <Input
                type="text"
                placeholder="Enter Author"
                name="bookAuth"
                class="login-field"
                id="book-author"
                value={this.state.author}
                onChange={this.setParams}
                validations={[required, short]}
              />
            </div>
            <label class="login-field-icon fui-user" for="book-author"></label>

            <div class="control-group">
              <Input
                type="text"
                placeholder="Enter Publisher"
                name="publisher"
                class="login-field"
                id="book-publisher"
                value={this.state.publisher}
                onChange={this.setParams}
                validations={[required, short]}
              />
            </div>
            <label
              class="login-field-icon fui-user"
              for="book-publisher"></label>

            <div class="control-group">
              <Input
                type="text"
                placeholder="Enter Publish Year"
                name="publishYear"
                class="login-field"
                id="book-publisher"
                value={this.state.publish_year}
                onChange={this.setParams}
                validations={[required, short]}
              />
            </div>
            <label
              class="login-field-icon fui-user"
              for="book-publisher"></label>

            <div class="control-group">
              <Input
                type="text"
                placeholder="Enter Quantity"
                name="quantity"
                class="login-field"
                id="book-quantity"
                value={this.state.quantity}
                onChange={this.setParams}
                validations={[required, short]}
              />
            </div>
            <label
              class="login-field-icon fui-user"
              for="book-quantity"></label>

            <div class="control-group">
              <Input
                type="text"
                placeholder="Enter Image URL"
                name="image"
                class="login-field"
                id="book-img"
                value={this.state.image}
                onChange={this.setParams}
                validations={[required, short]}
              />
            </div>
            <label
              class="login-field-icon fui-user"
              for="book-img"></label>

            <select
              name="subject"
              id="subject_input"
              value={this.state.categoryName}
              name="categoryName"
              onChange={this.setParams}>
              <option hidden selected>
                Categories
              </option>
              {this.state.listCategory.map((item) => (
                <option key={item.categoryID} value={item.categoryName}>
                  {item.categoryName}
                </option>
              ))}
            </select>
                <hr/>
            <Input
              class="btn btn-primary"
              onClick={this.addBook}
              type="submit"
              value="Add Book"
            />
            <Link to="/admin">Back to admin page</Link>
          </div>
        </Form>
      </div>
    );
  }
}
