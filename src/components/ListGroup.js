import React from 'react';

const ListGroup = props => {

  const { items, onStatusSelect, selectedStatus } = props;


  return (<div>
    <ul className="list-group">
      {items.map(item => {
        return (
          <li
            onClick={() => onStatusSelect(item)}
            key={item.id}
            className={item.name === selectedStatus.name ? "list-group-item active" : "list-group-item"}>{item.name}
          </li>
        )
      })}
    </ul>
  </div>
  )
}

export default ListGroup;