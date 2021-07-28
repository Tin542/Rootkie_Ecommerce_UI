import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Modal from "react-modal";
import axios from "axios";

import "../assets/AdminProductList.css";

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
export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      _products: [],
      pageList: [],

      searchValue: "",
      searchPageList: [],
      isSearch: false,

      _categories: [],

      searchByCateValue: "",
      category_ID: "",
      searchByCatePageList: [],
      isSearchByCate: false,

      page: 0,

      bookID: 0,
      book_name: "",
      bookDescription: "",
      bookPrice: "",
      categoryName: "",
      author: "",
      publisher: "",
      publish_year: 0,
      isDelete: false,
      quantity: 0,
      image: "",

      modalIsOpen: false,
    };
  }

  componentDidMount() {
    this.getData();
    this.getCategory();
  }
  componentWillMount() {
    Modal.setAppElement("body");
  }

  getCategory() {
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
            _categories: response.data.data,
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
  getData() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(`http://localhost:9999/BookStore/admin/book`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            _products: response.data.data.Books,
          });
          this.showPageList(response.data);
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
  showPageList(response) {
    var list = [];
    for (let i = 0; i < response.data.totalPages; i++) {
      list.push(i);
    }
    if (list.length > 1) {
      this.setState({ pageList: list });
      console.log("list page: " + list);
    }
  }
  changePage(page) {
    console.log("current page", page);
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(`http://localhost:9999/BookStore/admin/book?page=${page}`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            _products: response.data.data.Books,
          });
          this.showPageList(response.data);
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
  searchProduct = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(
        `http://localhost:9999/BookStore/admin/search-book?keyword=${this.state.searchValue}`,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            isSearch: true,
            isSearchByCate: false,
            _products: response.data.data.Books,
          });
          this.showSearchPageList(response.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.errorCode !== null) {
            alert("Book not found !");
          }
        }
      });
  };
  showSearchPageList = (response) => {
    var list = [];
    for (let i = 0; i < response.data.totalPages; i++) {
      list.push(i);
    }
    if (list.length > 1) {
      this.setState({ searchPageList: list });
      console.log("list search page: " + list);
    }
  };
  changeSearchPage(page) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(
        `http://localhost:9999/BookStore/admin/search-book?keyword=${this.state.searchValue}&page=${page}`,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            _products: response.data.data.Books,
          });
          this.showPageList(response.data);
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
  searchByCategory(cateID, cateName) {
    this.setState({ category_ID: cateID, searchByCateValue: cateName });
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    console.log(cateID);
    axios
      .get(
        `http://localhost:9999/BookStore/admin/search-book?keyword=${cateID}`,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            isSearchByCate: true,
            isSearch: false,
            _products: response.data.data.Books,
          });
          this.showSearchCatePageList(response.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.errorCode !== null) {
            alert("No Book exist in category !");
          }
        }
      });
  }
  showSearchCatePageList(response) {
    var list = [];
    for (let i = 0; i < response.data.totalPages; i++) {
      list.push(i);
    }
    if (list.length > 0) {
      this.setState({ searchByCatePageList: list });
      console.log("list search by cate page: " + list);
    }
  }
  changeSearchPageByCate(page) {
    this.setState({ page: page });
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    console.log(page);
    axios
      .get(
        `http://localhost:9999/BookStore/admin/search-book?keyword=${this.state.category_ID}&page=${page}`,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            isSearchByCate: true,
            isSearch: false,
            _products: response.data.data.Books,
          });
          this.showSearchCatePageList(response.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.errorCode !== null) {
            alert("Book not found !");
          }
        }
      });
  }
  deleteItem = (e, BookID) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };

    axios
      .put(
        `http://localhost:9999/BookStore/admin/delete-book/${BookID}`,
        null,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.successCode);
          this.loadData();
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.errorCode !== null) {
            alert(err.response.data.errorCode);
          }
        }
      });
  };
  updateItem = (e, BookID) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };

    var books = {
      book_name: this.state.book_name,
      bookDescription: this.state.bookDescription,
      bookPrice: this.state.bookPrice,
      categoryName: this.state.categoryName,
      author: this.state.author,
      publisher: this.state.publisher,
      publish_year: this.state.publish_year,
      image: this.state.image,
      quantity: this.state.quantity,
      delete: this.state.isDelete,
    };
    console.log(books);
    axios
      .put(
        `http://localhost:9999/BookStore/admin/update-book/${BookID}`,
        books,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.successCode);
          this.setState({
            modalIsOpen: false,
          });
          this.loadData();
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.errorCode !== null) {
            alert(err.response.data.errorCode);
          }
        }
      });
  };

  openModal = (pID) => {
    this.setState({
      modalIsOpen: true,
    });
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(`http://localhost:9999/BookStore/home/get-book-by-id/${pID}`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            bookID: response.data.data.id,
            book_name: response.data.data.book_name,
            bookDescription: response.data.data.bookDescription,
            bookPrice: response.data.data.bookPrice,
            categoryName: response.data.data.categoryName,
            author: response.data.data.author,
            publisher: response.data.data.publisher,
            publish_year: response.data.data.publish_year,
            isDelete: response.data.data.delete,
            quantity: response.data.data.quantity,
            image: response.data.data.image,
          });
        }
        console.log(response.data.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.errorCode !== null) {
            alert("Book not found !");
          }
        }
      });
  };
  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  onchangeCheckbox = () => {
    this.setState({
      isDelete: !this.state.isDelete,
    });
  };
  render() {
    const {
      loading,
      _products,
      pageList,
      searchPageList,
      _categories,
      searchByCatePageList,
    } = this.state;

    if (!loading) {
      return <h1>loading...</h1>;
    }
    return (
      <>
        <div className="grid-container">
          <div class="row">
            <div class="search">
              <input
                type="text"
                class="searchTerm"
                placeholder="What are you looking for?"
                name="searchValue"
                value={this.state.searchValue}
                onChange={this.setParams}
                id="searchValue"
              />
              <button
                type="submit"
                class="searchButton"
                onClick={(e) => this.searchProduct(e)}>
                <li>
                  <FontAwesomeIcon icon={faSearch} />
                </li>
              </button>
            </div>

            <details open>
              <summary>
                Category:{" "}
                {this.state.searchByCateValue !== "" && (
                  <a>{this.state.searchByCateValue}</a>
                )}
              </summary>
              <ul>
                {_categories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      this.searchByCategory(
                        `${category.categoryID}`,
                        `${category.categoryName}`
                      )
                    }>
                    <a href="#">{category.categoryName}</a>
                  </li>
                ))}
              </ul>
            </details>
            <Link to={"/addProduct"}>
              <button className="add_button">Add Book</button>
            </Link>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <table className="table" style={{ width: "150%" }}>
                  <thead>
                    <tr>
                      <th>image</th>
                      <th>Name</th>
                      <th>Descripton</th>
                      <th>Price</th>
                      <th>Rate</th>
                      <th>Category</th>
                      <th>Author</th>
                      <th>Publisher</th>
                      <th>Publish year</th>
                      <th>Create date</th>
                      <th>Update date</th>
                      <th>isDelete</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_products.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="product_image">
                            <img
                              src={item.image}
                              alt="Book"
                              style={{ width: "100%" }}
                            />
                          </div>
                        </td>
                        <td>{item.book_name}</td>
                        <td>{item.bookDescription}</td>
                        <td>{item.bookPrice} VND</td>
                        <td>{item.rate}</td>
                        <td>{item.categoryName}</td>
                        <td>{item.author}</td>
                        <td>{item.publisher}</td>
                        <td>{item.publish_year}</td>
                        <td>{item.createDate}</td>
                        <td>{item.updateDate}</td>
                        <td>{item.delete ? "true" : "false"}</td>
                        <td>
                          <button
                            style={{ color: "blue" }}
                            onClick={() => this.openModal(item.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            style={{ color: "red" }}
                            onClick={(e) => this.deleteItem(e, item.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="center">
              <div class="pagination">
                {this.state.isSearch === false &&
                  this.state.isSearchByCate === false &&
                  pageList.map((page, index) => (
                    <a key={index} onClick={() => this.changePage(page)}>
                      {page + 1}
                    </a>
                  ))}
                {this.state.isSearch === true &&
                  searchPageList.map((page, index) => (
                    <a key={index} onClick={() => this.changeSearchPage(page)}>
                      {page + 1}
                    </a>
                  ))}
                {this.state.isSearchByCate === true &&
                  searchByCatePageList.map((page, index) => (
                    <a
                      key={index}
                      onClick={() => this.changeSearchPageByCate(page)}>
                      {page + 1}
                    </a>
                  ))}
              </div>
            </div>
          </div>

          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}>
            <button onClick={this.closeModal}>Close</button>
            <div>
              <Form class="login">
                <div class="login-screen">
                  <div class="app-title">
                    <h1>Update Product</h1>
                  </div>
                  <div class="control-group">
                    <Input
                      type="text"
                      placeholder="Enter book name"
                      name="book_name"
                      class="login-field"
                      id="book-name"
                      value={this.state.book_name}
                      onChange={this.setParams}
                      validations={[required, short]}
                    />
                  </div>
                  <label
                    class="login-field-icon fui-user"
                    for="book-name"></label>

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
                  <label
                    class="login-field-icon fui-user"
                    for="book-des"></label>

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
                  <label
                    class="login-field-icon fui-user"
                    for="book-price"></label>

                  <div class="control-group">
                    <Input
                      type="text"
                      placeholder="Enter Author"
                      name="author"
                      class="login-field"
                      id="book-author"
                      value={this.state.author}
                      onChange={this.setParams}
                      validations={[required, short]}
                    />
                  </div>
                  <label
                    class="login-field-icon fui-user"
                    for="book-author"></label>

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
                      name="publish_year"
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
                  

                  <select
                    name="categoryName"
                    id="subject_input"
                    value={this.state.categoryName}
                    name="categoryName"
                    onChange={this.onChangeCategoryName}>
                    <option hidden selected>
                      Categories
                    </option>
                    {this.state._categories.map((item) => (
                      <option key={item.categoryID} value={item.categoryName}>
                        {item.categoryName}
                      </option>
                    ))}
                  </select>
                  <label
                    class="login-field-icon fui-user"
                    for="book-img"></label>

                  <div className="form-group">
                    <label>Delete</label>
                    <input
                      type="checkbox"
                      checked={this.state.isDelete}
                      onChange={this.onchangeCheckbox}
                      name="isDelete"
                    />
                  </div>
                  <hr />
                  <Input
                    class="btn btn-primary"
                    onClick={(e) => this.updateItem(e, this.state.bookID)}
                    type="submit"
                    value="Update Book"
                  />
                </div>
              </Form>
            </div>
          </Modal>
        </div>
      </>
    );
  }
}
