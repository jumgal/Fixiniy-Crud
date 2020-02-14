import React, { Component } from 'react';
import { getCustomers } from './List/customer';
import { paginate } from './utils/paginate';
import { getStatus } from './List/status';



import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import AddButton from './components/AddButton';
import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import Pagination from './components/Pagination';
import ListGroup from './components/ListGroup';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      pageSize: 4,
      currentPage: 1,
      status: [],
      currentStatus: 'active'
    }
  }

  componentDidMount() {
    const customers = getCustomers();
    const status = [{ name: 'Current Status' },
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

  render() {


    const { pageSize, currentPage, customers: allCustomers, currentStatus } = this.state;

    const filtered = currentStatus && currentStatus.id ? allCustomers.filter(c => c.id === currentStatus.id) : allCustomers;

    const customers = paginate(filtered, currentPage, pageSize);

    return (<div className="row">
      <div className="col-sm-6 col-md-4 col-lg-2">
        <AddButton />
        <ListGroup items={this.state.status}
          selectedStatus={currentStatus}
          onStatusSelect={this.handleStatus}
        />
      </div>
      <div className="col-sm-6 col-md-8 col-lg-10">
        <table className="table">
          <TableHead />
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



export default App;
