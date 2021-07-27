import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./AdminNavbar";
import axios from "axios";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _categories: [],
      isload: false,
      pageList: [],

      searchValue: "",
      searchPageList: [],
      isSearch: false,

      action: "ADD ITEM", //UPDATE ITEM
      categoryID: "",
      categoryName: "",
      isDelete: false,

      page: 0,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(`http://localhost:9999/BookStore/admin/category`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            _categories: response.data.data.Categories,
          });
          console.log(this.state._categories);
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
    if (list.length > 0) {
      this.setState({ pageList: list });
      console.log("list page: " + list);
    }
  }
  changePage(page) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(`http://localhost:9999/BookStore/admin/category?page=${page}`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            _categories: response.data.data.Categories,
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
  searchCategory = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(
        `http://localhost:9999/BookStore/admin/category?keyword=${this.state.searchValue}`,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            isSearch: true,
            _categories: response.data.data.Categories,
          });
          this.showSearchPageList(response.data);
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
  showSearchPageList(response) {
    var list = [];
    for (let i = 0; i < response.data.totalPages; i++) {
      list.push(i);
    }
    if (list.length > 0) {
      this.setState({ searchPageList: list });
      console.log("list searh page: " + list);
    }
  }
  changeSearchPage(currentPage) {
    this.setState({ page: currentPage });
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(
        `http://localhost:9999/BookStore/admin/category?keyword=${this.state.searchValue}&page=${currentPage}`,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            isSearch: true,
            _categories: response.data.data.Categories,
          });
          this.showSearchPageList(response.data);
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

  onchangeCheckbox = () => {
    this.setState({
      isDelete: !this.state.isDelete,
    });
  }

  addItem = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    var category = {
      categoryName: this.state.categoryName,
    };
    axios
      .post(`http://localhost:9999/BookStore/admin/add-category`, category, {
        headers,
      })
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

  getUpdateCategory = (e, cateID) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };

    axios
      .get(
        `http://localhost:9999/BookStore/home/get-category-by-id/${cateID}`,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            categoryID: response.data.data.categoryID,
            categoryName: response.data.data.categoryName,
            isDelete: response.data.data.delete,
            action: "UPDATE ITEM",
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
  };

  updateItem = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    var category = {
      categoryID: this.state.categoryID,
      categoryName: this.state.categoryName,
      delete: this.state.isDelete
    };
    axios
      .put(
        `http://localhost:9999/BookStore/admin/update-category/${this.state.categoryID}`,
        category,
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

  deleteItem = (e, cateID) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    var category = {
      categoryID: this.state.categoryID,
      categoryName: this.state.categoryName,
    };
    axios
      .put(
        `http://localhost:9999/BookStore/admin/delete-category/${cateID}`,
        category,
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

  render() {
    const { loading, _categories, pageList, searchPageList } = this.state;

    if (!loading) {
      return <h1>loading...</h1>;
    }
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            {/* update/add form */}
            <div className="col-md-3">
              <h1>{this.state.action}</h1>
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  name="categoryName"
                  className="form-control"
                  onChange={this.setParams}
                  value={this.state.categoryName}
                />
              </div>
              {this.state.action === "UPDATE ITEM" && (
                <div className="form-group">
                  <label>Delete</label>
                  <input
                    type="checkbox"
                    checked={this.state.isDelete}
                    onChange={this.onchangeCheckbox}
                    name="isDelete"
                  />
                </div>
              )}
              <hr />
              <div className="form-group">
                {this.state.action == "ADD ITEM" && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => this.addItem(e)}>
                    Add
                  </button>
                )}
                {this.state.action == "UPDATE ITEM" && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => this.updateItem(e)}>
                    EDIT
                  </button>
                  
                )}
              </div>
            </div>

            <div className="col-md-9">
              <h1>List Category</h1>
              {/*  search form */}
              <div class="search-container">
                <form>
                  <input
                    type="text"
                    placeholder="Search..."
                    name="searchValue"
                    value={this.state.searchValue}
                    onChange={this.setParams}
                    style={{ width: "40%", height: "30px" }}
                  />
                  <button type="submit" onClick={(e) => this.searchCategory(e)}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                  <button type="submit" onClick={this.setState.action = "ADD ITEM"}  >
                    <a>Add Category </a>
                  </button>
                </form>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Create Date</th>
                    <th>Update Date</th>
                    <th>Deleted</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {_categories.map((category) => (
                    <tr key={category.categoryID}>
                      <td>{category.categoryID}</td>
                      <td>{category.categoryName}</td>
                      <td>{category.createDate}</td>
                      <td>{category.updateDate}</td>
                      <td>{category.delete ? "true" : "false"}</td>
                      <td>
                        <button
                          style={{ color: "blue" }}
                          onClick={(e) =>
                            this.getUpdateCategory(e, category.categoryID)
                          }>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          style={{ color: "red" }}
                          onClick={(e) =>
                            this.deleteItem(e, category.categoryID)
                          }>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="center">
                <div className="pagination">
                  {this.state.isSearch === false &&
                    pageList.map((page, index) => (
                      <a key={index} onClick={() => this.changePage(page)}>
                        {page + 1}
                      </a>
                    ))}

                  {this.state.isSearch === true &&
                    searchPageList.map((page, index) => (
                      <a
                        key={index}
                        onClick={() => this.changeSearchPage(page)}>
                        {page + 1}
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
