import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./AdminNavbar";
import axios from "axios";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _author: [],
      isload: false,
      pageList: [],

      searchValue: "",
      searchPageList: [],
      isSearch: false,

      action: "ADD ITEM", //UPDATE ITEM
      authorID: "",
      authorName: "",
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
      .get(`http://localhost:9999/BookStore/admin/author`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            _author: response.data.data.authors,
          });
          console.log(this.state._author);
          this.showPageList(response.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
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
      .get(`http://localhost:9999/BookStore/admin/author?page=${page}`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            _author: response.data.data.authors,
          });
          this.showPageList(response.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
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
        `http://localhost:9999/BookStore/admin/author?keyword=${this.state.searchValue}`,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            isSearch: true,
            _author: response.data.data.authors,
          });
          this.showSearchPageList(response.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
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
        `http://localhost:9999/BookStore/admin/author?keyword=${this.state.searchValue}&page=${currentPage}`,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            isSearch: true,
            _author: response.data.data.authors,
          });
          this.showSearchPageList(response.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
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
  };

  addItem = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    var author = {
      authorName: this.state.authorName,
    };
    axios
      .post(`http://localhost:9999/BookStore/admin/add-author`, author, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.successCode);
          this.loadData();
          this.setState({
            isSearch: false,
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
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
      .get(`http://localhost:9999/BookStore/home/author/${cateID}`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            authorID: response.data.data.authorID,
            authorName: response.data.data.authorName,
            isDelete: response.data.data.delete,
            action: "UPDATE ITEM",
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
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
      authorID: this.state.authorID,
      authorName: this.state.authorName,
      delete: this.state.isDelete,
    };
    axios
      .put(
        `http://localhost:9999/BookStore/admin/update-author/${this.state.authorID}`,
        category,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.successCode);
          this.loadData();
          this.setState({
            isSearch: false,
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
        }
      });
  };

  deleteItem = (e, cateID) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .put(
        `http://localhost:9999/BookStore/admin/delete-author/${cateID}`,
        null,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.successCode);
          this.loadData();
          this.setState({
            isSearch: false,
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
        }
      });
  };

  render() {
    const { loading, _author, pageList, searchPageList } = this.state;

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
              <Form>
                <h1>{this.state.action}</h1>

                <div className="form-group">
                  <label>Author Name</label>
                  <Input
                    type="text"
                    name="authorName"
                    className="form-control"
                    onChange={this.setParams}
                    value={this.state.authorName}
                    validations={[required]}
                  />
                </div>
                {this.state.action === "UPDATE ITEM" && (
                  <div className="form-group">
                    <label>Deleted</label>
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
              </Form>
            </div>

            <div className="col-md-9">
              <h1>List Author</h1>
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
                  <button
                    type="submit"
                    onClick={(this.setState.action = "ADD ITEM")}>
                    <a>Add Publisher </a>
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
                  {_author.map((author) => (
                    <tr key={author.authorID}>
                      <td>{author.authorID}</td>
                      <td>{author.authorName}</td>
                      <td>{author.createDate}</td>
                      <td>{author.updateDate}</td>
                      <td>{author.delete ? "true" : "false"}</td>
                      <td>
                        <button
                          style={{ color: "blue" }}
                          onClick={(e) =>
                            this.getUpdateCategory(e, author.authorID)
                          }>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          style={{ color: "red" }}
                          onClick={(e) => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this item?"
                              )
                            )
                              this.deleteItem(e, author.authorID);
                          }}>
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
