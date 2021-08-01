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
      _publisher: [],
      isload: false,
      pageList: [],

      searchValue: "",
      searchPageList: [],
      isSearch: false,

      action: "ADD ITEM", //UPDATE ITEM
      PublisherID: "",
      PublisherName: "",
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
      .get(`http://localhost:9999/BookStore/admin/publisher`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            _publisher: response.data.data.publishers,
          });
          console.log(this.state._publisher);
          this.showPageList(response.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message)
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
      .get(`http://localhost:9999/BookStore/admin/publisher?page=${page}`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            _publisher: response.data.data.publishers,
          });
          this.showPageList(response.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message)
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
        `http://localhost:9999/BookStore/admin/publisher?keyword=${this.state.searchValue}`,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            isSearch: true,
            _publisher: response.data.data.publishers,
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
        `http://localhost:9999/BookStore/admin/publisher?keyword=${this.state.searchValue}&page=${currentPage}`,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: true,
            isSearch: true,
            _publisher: response.data.data.publishers,
          });
          this.showSearchPageList(response.data);
        }
      })
      .catch((err) => {
        if (err.response) {
         alert(err.response.data.message)
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
    var publisher = {
        publisherName: this.state.PublisherName,
    };
    axios
      .post(`http://localhost:9999/BookStore/admin/add-publisher`, publisher, {
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
      .get(
        `http://localhost:9999/BookStore/home/publisher/${cateID}`,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            PublisherID: response.data.data.publisherID,
            PublisherName: response.data.data.publisherName,
            isDelete: response.data.data.delete,
            action: "UPDATE ITEM",
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message)
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
        publisherID: this.state.PublisherID,
        publisherName: this.state.PublisherName,
      delete: this.state.isDelete
    };
    axios
      .put(
        `http://localhost:9999/BookStore/admin/update-publisher/${this.state.PublisherID}`,
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
          alert(err.response.data.message)
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
        `http://localhost:9999/BookStore/admin/delete-publisher/${cateID}`,
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
          alert(err.response.data.message)
        }
      });
  };

  render() {
    const { loading, _publisher, pageList, searchPageList } = this.state;

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
                <label>Publisher Name</label>
                <Input
                  type="text"
                  name="PublisherName"
                  className="form-control"
                  onChange={this.setParams}
                  value={this.state.PublisherName}
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
                    onClick={(e) => {
                      if (window.confirm('Are you sure you wish to update this item?')) this.updateItem(e)
                    }}>
                    EDIT
                  </button>
                  
                )}
              </div>
              </Form>
            </div>
            

            <div className="col-md-9">
              <h1>List Publisher</h1>
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
                  {_publisher.map((publisher) => (
                    <tr key={publisher.publisherID}>
                      <td>{publisher.publisherID}</td>
                      <td>{publisher.publisherName}</td>
                      <td>{publisher.createDate}</td>
                      <td>{publisher.updateDate}</td>
                      <td>{publisher.delete ? "true" : "false"}</td>
                      <td>
                        <button
                          style={{ color: "blue" }}
                          onClick={(e) =>
                            this.getUpdateCategory(e, publisher.publisherID)
                          }>
                          <FontAwesomeIcon icon={faEdit} />
                          
                        </button>
                        <button
                          style={{ color: "red" }}
                          onClick={(e) =>{
                            if (window.confirm('Are you sure you wish to delete this item?')) this.deleteItem(e, publisher.publisherID)} 
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
