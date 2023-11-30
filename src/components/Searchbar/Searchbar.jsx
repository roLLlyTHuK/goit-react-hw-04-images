import React, {Component} from 'react';
import { Icon } from '@iconify/react';

export class Searchbar extends Component {
  state = {
      query: '',
    };
  
  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm " onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <Icon icon="mdi:magnify" width="28" height="28" />
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}


