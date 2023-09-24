import React from "react";

const List = ({ items, removeItem, viewItem, view }) => {
  return (
      <div className="grocery-list">
        {items.map((item) => {
          const { id, title, value } = item;
          return (
            
            <article key={id} className="grocery-item">
              <p className="title">{title}</p>
              <input className="title" disabled="disabled" type={view ? 'text' : 'password'}
              value={value}/>
              <div className="btn-container">
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => viewItem()}
                >
                  view
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => removeItem(id)}
                >
                  delete
                </button>
              </div>
            </article>
          );
        })}
      </div>
  );
};

export default List;
