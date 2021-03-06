import React from 'react';
import renderer from 'react-test-renderer';
import Carousel from '../Carousel';
const { describe, it, expect } = global;

const imageIDs = Array(6)
  .fill(1)
  .map((_, i) => i + 1);
const images = imageIDs.map((imageID) => {
  return {
    src: `https://placedog.net/8${imageID}0/6${imageID}0?id=${imageID}`,
    alt: `Dog No. ${imageID}. Dogs are domesticated mammals, not natural wild animals. They were originally bred from wolves. They have been bred by humans for a long time, and were the first animals ever to be domesticated.`,
    thumbnail: `https://placedog.net/8${imageID}/6${imageID}?id=${imageID}`
  };
});

// snapshot testing
describe('Carousel', () => {
  it('is truthy', () => {
    expect(Carousel).toBeTruthy();
  });

  global.IntersectionObserver = function () {
    return {
      observe: () => {},
      disconnect: () => {}
    };
  };

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {}
    })
  });

  it('renders the same as snapshot', () => {
    const component = renderer.create(<Carousel images={images} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can be maximized and renders the same as snapshot', () => {
    const component2 = renderer.create(
      <Carousel images={images} isMaximized />
    );
    const tree2 = component2.toJSON();
    expect(tree2).toMatchSnapshot();
  });
});
