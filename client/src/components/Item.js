import React, { useEffect, useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import ItemDescription from './ItemDescription';
import ItemShipping from './ItemShipping';

function Item(props) {
  const [item, setItem] = useState({});
  const { id } = props.match.params;

  useEffect(()=>{
    axios.get(`http://localhost:3333/items/${id}`)
      .then(res=>{
        setItem(res.data);
      });
  }, []);

  if (!item) {
    return <h2>Loading item data...</h2>;
  }

  const handleEdit = () => {
    // To Do an Edit:
    // 1. Capture an edit click.
    // 2. Redirect to update form page.
    props.history.push(`/item-update/${id}`);
    // 3. Support editing update form.
    // 4. Click the update button.
    // 5. Redirect to the item page we are updating. 

  }

  const handleDelete = () => {
    axios.delete(`http://localhost:3333/items/${id}`)
      .then(res => {
        props.setItems(res.data);
        // props.deleteItem(id)
        props.history.push('/item-list');
      })
      .catch(err => {
        console.error(err);
      })
  }
  // To Do a Delete:
  // 1. Capture a click on the delete button.
  // 2. Do a delete axios call on the current item.
  // 3. Update local state to reflect the deleted item.
  // 4. Redirect to the item list page.


  return (
    <div className="item-wrapper">
      <div className="item-header">
        <div className="image-wrapper">
          <img src={item.imageUrl} alt={item.name} />
        </div>
        <div className="item-title-wrapper">
          <h2>{item.name}</h2>
          <h4>${item.price}</h4>
        </div>
      </div>
      <nav className="item-sub-nav">
        <NavLink exact to={`/item-list/${item.id}`}>
          the story
        </NavLink>
        <NavLink to={`/item-list/${item.id}/shipping`}>shipping</NavLink>
      </nav>
      <Route
        exact
        path="/item-list/:id"
        render={props => <ItemDescription {...props} item={item} />}
      />
      <Route
        path="/item-list/:id/shipping"
        render={props => <ItemShipping {...props} item={item} />}
      />
      <button onClick={handleEdit} className="md-button">
        Edit
      </button>
      <button onClick={handleDelete} className="md-button">
        Delete
      </button>
    </div>
  );
}

export default Item;
