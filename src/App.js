import React, { Component } from 'react';
import { getCustomers } from './List/customer';
import { paginate } from './utils/paginate';



import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import AddButton from './components/AddButton';
import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import Pagination from './components/Pagination';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      pageSize: 4,
      currentPage: 1
    }
  }

  async componentDidMount() {
    const customers = await getCustomers();
    this.setState({
      customers
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

  render() {

    const { pageSize, currentPage, customers: allCustomers } = this.state;

    const customers = paginate(allCustomers, currentPage, pageSize);

    return (<main className="container">
      <AddButton />
      <table className="table">
        <TableHead />
        <TableBody handleDelete={this.handleDelete}
          customers={customers}
        />
      </table>
      <Pagination itemsCount={allCustomers.length}
        pageSize={pageSize}
        onPageChange={this.onPageChange}
        currentPage={currentPage}
      />
    </main>)
  }
}



export default App;
