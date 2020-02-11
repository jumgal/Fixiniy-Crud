import React, { Component } from 'react';
import { getCustomers } from './List/customer';

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
      customers: []
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

  render() {
    return (<main className="container">
      <AddButton />
      <table className="table">
        <TableHead />
        <TableBody handleDelete={this.handleDelete}
          customers={this.state.customers}
        />
      </table>
      <Pagination />
    </main>)
  }
}



export default App;
