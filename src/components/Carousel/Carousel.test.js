import React from 'react';
import renderer from 'react-test-renderer';
import Carousel from '../Carousel';

test('Carousel renders correctly', () => {
  const kittenImageSizes = [900, 800, 700];
  const images = kittenImageSizes.map((kittenImageSize) => ({
    src: `https://placekitten.com/${kittenImageSize}/${kittenImageSize}`,
    alt: `Kitten of size ${kittenImageSize} pixels`
  }));

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

  const component = renderer.create(<Carousel images={images} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
