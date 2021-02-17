import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  // since .scrollTo() isn't implemented in JSDOM
  Element.prototype.scrollTo = () => {};

  const observe = jest.fn();
  window.IntersectionObserver = jest.fn(function () {
    this.observe = observe;
  });

  global['IntersectionObserver'] = function () {
    return {
      observe: () => {},
      disconnect: () => {}
    };
  };

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }))
  });

  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
