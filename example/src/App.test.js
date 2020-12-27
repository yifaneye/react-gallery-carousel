import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const observe = jest.fn();
  window.IntersectionObserver = jest.fn(function () {
    this.observe = observe;
  });
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
