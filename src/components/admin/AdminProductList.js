import React, { Component } from 'react'
import axios from "axios"

export default class AdminProductList extends Component {
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
    };
  }

  componentDidMount() {
    this.getData();
    this.getCategory();
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
      .get(`http://localhost:9999/BookStore/home/book`, {
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
    console.log("current page",page)
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(`http://localhost:9999/BookStore/home/book?page=${page}`, {
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
        `http://localhost:9999/BookStore/home/search-book?keyword=${this.state.searchValue}`,
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
      .get(
        `http://localhost:9999/BookStore/home/search-book?keyword=${this.state.searchValue}&page=${page}`,
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
        `http://localhost:9999/BookStore/home/search-book?keyword=${cateID}`,
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
        `http://localhost:9999/BookStore/home/search-book?keyword=${this.state.category_ID}&page=${page}`,
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
  render() {
    return (
      <div>
        Manage Product
      </div>
    )
  }
}

