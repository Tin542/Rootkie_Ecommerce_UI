
import React, { Component } from "react";
import Rating from "@material-ui/lab/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import "../assets/ProductList.css";

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

      page: 0,
    };
  }

  componentDidMount() {
    this.getData(this.state.page);
  }

  getData(page) {
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
      .get(`http://localhost:9999/BookStore/admin/search-book?keyword=${this.state.searchValue}`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            isSearch: true,
            _products: response.data.data.Books,
          });
          this.showPageList(response.data);
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

  showSearchPageList(response) {
    var list = [];
    for (let i = 0; i < response.data.totalPages; i++) {
      list.push(i);
    }
    if (list.length > 1) {
      this.setState({ searchPageList: list });
      console.log("list search page: " + list);
    }
  }

  changeSearchPage(page) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(`http://localhost:9999/BookStore/admin/search-book?page=${page}`, {
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

  render() {
    const { loading, _products, pageList, searchPageList } = this.state;

    if (!loading) {
      return <h1>loading...</h1>;
    }
    return (
      <>
        <div class="wrap">
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
                    <th>rate</th>
                    <th>Add To Cart</th>
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
                      <td>
                        <Rating
                          name="half-rating-read"
                          defaultValue={item.rate}
                          readOnly
                        />
                      </td>
                      <td>
                        <button className="btn-add-cart">Add</button>
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
                pageList.map((page, index) => (
                  <a key={index} onClick={() => this.getData(page)}>
                    {page + 1}
                  </a>
                ))}
              {this.state.isSearch === true &&
                searchPageList.map((page, index) => (
                  <a key={index} onClick={() => this.changeSearchPage(page)}>
                    {page + 1}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
