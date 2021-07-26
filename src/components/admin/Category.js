import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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

      action: "ADD ITEM",

      page: 0,
    };
  }

  componentDidMount() {
    this.loadData(this.state.page, this.state.searchValue);
  }

  loadData(page, searchValue) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    };
    axios
      .get(
        `http://localhost:9999/BookStore/admin/category?page=${page}&keyword=${searchValue}`,
        {
          headers,
        }
      )
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

  render() {
    const { loading, _categories, pageList, searchValue } = this.state;

    if (!loading) {
      return <h1>loading...</h1>;
    }
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h1>{this.state.action}</h1>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name=""
                  className="form-control"
                  onChange={this.setParams}
                  value={this.state.searchValue}
                />
              </div>

              {/* <div className="form-group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={
                    this.state.action == "ADD ITEM"
                      ? this.addItem
                      : this.updateItem
                  }>
                  Add
                </button>
              </div> */}
            </div>

            <div className="col-md-9">
              <h1>List Category</h1>
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
                  <button type="submit" onClick={() => this.loadData(this.state.page, searchValue)}>
                    <FontAwesomeIcon icon={faSearch} />
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
                  </tr>
                </thead>
                <tbody>
                  {_categories.map((category) => (
                    <tr key={category.categoryID}>
                      <td>{category.categoryID}</td>
                      <td>{category.categoryName}</td>
                      <td>{category.createDate}</td>
                      <td>{category.updateDate}</td>
                      {/* <td>
                        <label
                          className="badge badge-warning"
                          onClick={() => this.Edit(item, index)}>
                          modify
                        </label>
                      </td>
                      <td>
                        <label
                          className="badge badge-danger"
                          onClick={() => this.deleteItem(item.name)}>
                          remove
                        </label>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="center">
                <div className="pagination">
                  {pageList.map((page, index) => (
                    <a
                      key={index}
                      onClick={() => this.loadData(page, searchValue)}>
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
