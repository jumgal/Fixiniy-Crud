import React, { Component } from 'react';

import { getCustomers } from '../List/customer';
import { paginate } from '../utils/paginate';
import { getStatus } from '../List/status';
import { Router, Switch } from 'react-router-dom';


import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import _ from 'lodash';

import AddButton from './AddButton';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Pagination from './Pagination';
import ListGroup from './ListGroup';


class Customers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      pageSize: 4,
      currentPage: 1,
      status: [],
      currentStatus: 'active',
      sortColumn: {
        path: 'name',
        order: 'asc'
      }
    }
  }

  componentDidMount() {
    const customers = getCustomers();
    const status = [{ id: '', name: 'Current Status' },
    ...getStatus()]

    this.setState({
      customers,
      status
    })
  }

  handleDelete = customer => {

    const customers = [...this.state.customers.filter(c => c.name !== customer.name)]
    this.setState({
      customers
    })
  }

  onPageChange = page => {
    this.setState({
      currentPage: page
    })
  }

  handleStatus = status => {
    this.setState({
      currentStatus: status,
      currentPage: 1
    })
  }

  handleSort = sortColumn => {
    this.setState({
      sortColumn
    })
  }

  render() {


    const { pageSize, currentPage, customers: allCustomers, currentStatus } = this.state;

    const filtered = currentStatus && currentStatus.id ? allCustomers.filter(c => c.id === currentStatus.id) : allCustomers;

    const sorted = _.orderBy(filtered, [this.state.sortColumn.path], [this.state.sortColumn.order])

    const customers = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-sm-6 col-md-4 col-lg-2">
          <AddButton />
          <ListGroup items={this.state.status}
            selectedStatus={currentStatus}
            onStatusSelect={this.handleStatus}
          />
        </div>
        <div className="col-sm-6 col-md-8 col-lg-10">
          <table className="table">
            <TableHead onSort={this.handleSort} sortColumn={this.state.sortColumn} />
            <TableBody handleDelete={this.handleDelete}
              customers={customers}
            />
          </table>
          <Pagination itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.onPageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    )
  }
}


export default Customers;