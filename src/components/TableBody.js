import React, { Component } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';


class TableBody extends Component {

  constructor() {
    super()
  }

  render() {
    const { customers, handleDelete } = this.props;
    let buttonStatus;

    return (
      <tbody>
        {customers.map((customer, i) => {
          if (customer.status === 'inactive') {
            buttonStatus = 'btn btn-sm btn-secondary'
          } else if (customer.status === 'active') {
            buttonStatus = 'btn btn-sm btn-primary'
          } else if (customer.status === 'progress') {
            buttonStatus = 'btn btn-sm btn-danger'
          } else {
            buttonStatus = 'btn btn-sm btn-success'
          }

          return (<tr key={i}>
            <td>{customer.name}</td>
            <td>{customer.phone}</td>
            <td>{customer.zip}</td>
            <td>{customer.vin}</td>
            <td><button type="button"
              className={buttonStatus}>{customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}</button>
            </td>
            <td><FaPencilAlt style={{ color: "blue", cursor: 'pointer' }} /></td>
            <td onClick={() => handleDelete(customer)}><MdDelete style={{ color: "red", cursor: 'pointer' }} /></td>
          </tr>
          )
        })}
      </tbody>
    )
  }

}

export default TableBody;