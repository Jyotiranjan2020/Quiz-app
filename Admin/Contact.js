import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Navbar from './Navbar';


class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      editingContact: null,
    };
  }

  componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts() {
    axios
      .get('http://localhost:8000/api/contact/')
      .then((response) => {
        this.setState({ contacts: response.data });
      })
      .catch((error) => {
        console.error('Error fetching contacts: ' + error);
      });
  }

  deleteContact(id) {
    axios
      .delete(`http://localhost:8000/api/contact/${id}`)
      .then(() => {
        toast.success('Contact deleted successfully');
        this.fetchContacts();
      })
      .catch((error) => {
        console.error('Error deleting contact: ' + error);
        toast.error('Failed to delete contact');
      });
  }

  editContact(contact) {
    this.setState({ editingContact: contact });
  }

  saveChanges(updatedContact) {
    axios
      .put(`http://localhost:8000/api/contact/${updatedContact.id}`, updatedContact)
      .then(() => {
        toast.success('Contact updated successfully');
        this.setState({ editingContact: null });
        this.fetchContacts();
      })
      .catch((error) => {
        console.error('Error updating contact: ' + error);
        toast.error('Failed to update contact');
      });
  }

  render() {
    return (<>
    <div>
        <Navbar/>
    </div>
      <div className="container mt-4">
        <h2 className='text-center'>Contact List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((contact) => (
              <tr key={contact.id}>
                <td>
                  {this.state.editingContact?.id === contact.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.editingContact.name}
                      onChange={(e) =>
                        this.setState((prevState) => ({
                          editingContact: {
                            ...prevState.editingContact,
                            name: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    contact.name
                  )}
                </td>
                <td>{contact.email}</td>
                <td>
                  {this.state.editingContact?.id === contact.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.editingContact.message}
                      onChange={(e) =>
                        this.setState((prevState) => ({
                          editingContact: {
                            ...prevState.editingContact,
                            message: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    contact.message
                  )}
                </td>
                <td>
                  {this.state.editingContact?.id === contact.id ? (
                    <button
                      className="btn btn-success mx-2"
                      onClick={() => this.saveChanges(this.state.editingContact)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => this.editContact(contact)}
                    >
                      Edit <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => this.deleteContact(contact.id)}
                  >
                    Delete <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div></>
    );
  }
}

export default ContactList;
