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

const year = (value) => {
  var reg = /^[0-9]+$/;
  if (!reg.test(value) || value < 1800 || value > 2021) {
    return (
      <div className="alert alert-danger" role="alert">
        Year must be number and must from 1800 !!
      </div>
    );
  }
};

const number = (value) => {
  var reg = /^[0-9]+$/;
  if (!reg.test(value) || value < 1) {
    return (
      <div className="alert alert-danger" role="alert">
        must be number and bigger than 0 !!
      </div>
    );
  }
};

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategoryName = this.onChangeCategoryName.bind(this);

    this.state = {
      listCategory: [],
      listPublisher:[],
      listAuthor: [],

      book_name: "",
      bookDescription: "",
      bookPrice: 0,
      image: "",
      quantity: 0,
      categoryName: "",
      publisher: "",
      publish_year: 0,
      author: [],
    };
  }

  componentDidMount() {
    this.loadCategory();
    this.loadPublisher();
    this.loadAuthor();
  }

  loadAuthor() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(`http://localhost:9999/BookStore/home/author`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            listAuthor: response.data.data,
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.message !== null) {
            alert(err.response.data.message);
          }
        }
      });
  }

  loadPublisher() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(`http://localhost:9999/BookStore/home/publisher`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            listPublisher: response.data.data,
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.message !== null) {
            alert(err.response.data.message);
          }
        }
      });
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
          if (err.response.data.message !== null) {
            alert(err.response.data.message);
          }
        }
      });
  }

  setParams = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value });
  };

  onChangeCategoryName = (e) => {
    this.setState({ 
      categoryName: e.target.value,
    });
  }

  onchangePublisher = (e) => {
    this.setState({
      publisher: e.target.value,
    })
  }

  onchangeAuthor = (e) => {
    this.setState({
      author: e.target.value,
    })
  }

  addBook = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    var books = {
      book_name: this.state.book_name,
      bookDescription: this.state.bookDescription,
      bookPrice: this.state.bookPrice,
      categoryName:this.state.categoryName,
      authorName: [this.state.author],
      publisherName: this.state.publisher,
      publish_year: this.state.publish_year,
      image: this.state.image,
      quantity: this.state.quantity,
    };
    console.log(books)
    axios
      .post(`http://localhost:9999/BookStore/admin/add-book`, books, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.successCode);
        }
      })
      .catch((err) => {
        alert(err.message)
      });
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
                name="bookDescription"
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
                validations={[required, number]}
              />
            </div>
            <label class="login-field-icon fui-user" for="book-price"></label>

            <div class="control-group">
              <Input
                type="text"
                placeholder="Enter Publish Year"
                name="publish_year"
                class="login-field"
                id="book-publisher"
                value={this.state.publish_year}
                onChange={this.setParams}
                validations={[required, year]}
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
                validations={[required, number]}
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
              onChange={this.onChangeCategoryName}>
              <option hidden selected>
                Categories
              </option>
              {this.state.listCategory.map((item) => (
                <option key={item.categoryID} value={item.categoryName}>
                  {item.categoryName}
                </option>
              ))}
            </select>

            <select
              name="subject"
              id="subject_input"
              value={this.state.publisher}
              name="publisher"
              onChange={this.onchangePublisher}>
              <option hidden selected>
                Publisher
              </option>
              {this.state.listPublisher.map((item) => (
                <option key={item.publisherID} value={item.publisherName}>
                  {item.publisherName}
                </option>
              ))}
            </select>
            <select
              name="subject"
              id="subject_input"
              value={this.state.author}
              name="author"
              onChange={this.onchangeAuthor}>
              <option hidden selected>
                Author
              </option>
              {this.state.listAuthor.map((item) => (
                <option key={item.authorID} value={item.authorName}>
                  {item.authorName}
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
