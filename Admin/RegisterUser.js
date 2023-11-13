import React, { Component } from 'react';
import Navbar from './Navbar';
import { toast, ToastContainer } from 'react-toastify';


class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showModal: false,
      editedUser: null,
      editedUserData: {
        id: '',
        username: '',
        name: '',
        password: '',
        email: '',
        phone: '',
        country: '',
        address: '',
        gender: '',
      },
    };
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  fetchAllUsers() {
    fetch('http://localhost:8000/user/all')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data });
      })
      .catch((error) => {
        console.error('Error fetching users: ' + error);
      });
  }

  deleteUser(username) {
    fetch(`http://localhost:8000/user/${username}`, {
      method: 'DELETE',
    })
      .then(() => {
        this.closeEditModal();
        this.fetchAllUsers();
        toast.success('User deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting user: ' + error);
        toast.error('Error deleting user');
      });
  }

  openEditModal(user) {
    this.setState({ showModal: true, editedUser: user, editedUserData: { ...user } });
  }

  closeEditModal() {
    this.setState({ showModal: false, editedUser: null });
  }

  handleEditInputChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      editedUserData: {
        ...prevState.editedUserData,
        [name]: value,
      },
    }));
  }

  saveChanges() {
    // Send a PUT request to your server to update the user data
    fetch(`http://localhost:8000/user/${this.state.editedUser.username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.editedUserData),
    })
      .then(() => {
        this.closeEditModal();
        this.fetchAllUsers();
        toast.success('User updated successfully');
      })
      .catch((error) => {
        console.error('Error updating user: ' + error);
        toast.error('Error updating user');
      });
  }

  render() {
    return (
      <>
        <div>
          <Navbar />
        </div>
        <div>
          <h1 className="text-center">Registered Users</h1>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Password</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.password}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.country}</td>
                  <td>{user.address}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button
                      onClick={() => this.deleteUser(user.username)}
                      className="btn btn-danger mx-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => this.openEditModal(user)}
                      className="btn btn-primary mx-2"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {this.state.showModal && this.state.editedUser && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-center">Edit User</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => this.closeEditModal()}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <input
                        type="hidden"
                        className="form-control"
                        name="id"
                        value={this.state.editedUserData.id}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label>Username:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={this.state.editedUserData.username}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label>Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={this.state.editedUserData.name}
                        onChange={(e) => this.handleEditInputChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Password:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="password"
                        value={this.state.editedUserData.password}
                        onChange={(e) => this.handleEditInputChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.editedUserData.email}
                        onChange={(e) => this.handleEditInputChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={this.state.editedUserData.phone}
                        onChange={(e) => this.handleEditInputChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Country:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={this.state.editedUserData.country}
                        onChange={(e) => this.handleEditInputChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Address:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={this.state.editedUserData.address}
                        onChange={(e) => this.handleEditInputChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Gender:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="gender"
                        value={this.state.editedUserData.gender}
                        onChange={(e) => this.handleEditInputChange(e)}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.closeEditModal()}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.saveChanges()}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
      </>
    );
  }
}

export default RegisterUser;
