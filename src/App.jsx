import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Product } from './components/Product';
import { FilterByOwnerId } from './components/FilterByOwner';
import { SearchByInput } from './components/SearchByInput';

const allProducts = productsFromServer.map(product => {
  const category =
    categoriesFromServer.find(cat => cat.id === product.categoryId) || null;
  const user = category
    ? usersFromServer.find(u => u.id === category.ownerId) || null
    : null;

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const [query, setQuery] = React.useState('');

  const resetFilters = e => {
    e.preventDefault();
    setSelectedUserId(null);
    setQuery('');
  };

  const visibleProducts = allProducts.filter(product => {
    const matchesUser =
      selectedUserId === null || product.user?.id === selectedUserId;
    const matchesQuery = product.name
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    return matchesUser && matchesQuery;
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <FilterByOwnerId
              users={usersFromServer}
              selectedUserId={selectedUserId}
              onSelectUser={setSelectedUserId}
            />

            <SearchByInput query={query} onQueryChange={setQuery} />

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className="button mr-2 my-1"
                  href="#/"
                >
                  {category.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>User</th>
                </tr>
              </thead>

              <tbody>
                {visibleProducts.map(product => (
                  <Product key={product.id} product={product} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
