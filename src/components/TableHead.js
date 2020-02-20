import React, { Component } from 'react';


class TableHead extends Component {

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc'
    }

    this.props.onSort(sortColumn)
  }

  render() {
    return (
      <thead>
        <tr>
          <th onClick={() => this.raiseSort('name')}>Name</th>
          <th onClick={() => this.raiseSort('phone')}>Phone</th>
          <th onClick={() => this.raiseSort('zip')}>Zip</th>
          <th onClick={() => this.raiseSort('vin')}>VIN</th>
          <th onClick={() => this.raiseSort('status')}>Status</th>
          <th>Action</th>
          <th></th>
        </tr>
      </thead>
    )
  }
}

export default TableHead;