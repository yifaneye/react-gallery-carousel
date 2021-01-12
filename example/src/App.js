import React from 'react';

import { Carousel } from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const PackageIntroductionCarousel = ({ exampleCode }) => {
  return (
    <Carousel style={{ height: '20vh' }}>
      <div>
        <h1>react-gallery-carousel</h1>
        <p>
          Customizable, lightweight, dependency-free React carousel component
          with support for touch swiping and lazy loading
        </p>
        <a href='https://www.npmjs.com/package/react-gallery-carousel'>npm</a>
        <span> / </span>
        <a href='https://github.com/yifaneye/react-gallery-carousel'>GitHub</a>
      </div>
      <div>
        <h2>Get Started</h2>
        <code>npm install react-gallery-carousel --save</code>
        <p>or</p>
        <code>yarn add react-gallery-carousel</code>
      </div>
      <div>
        <h2>Example</h2>
        <p>The basic carousel shown below:</p>
        <code>
          {/*<pre>{exampleCode}</pre>*/}
          {exampleCode}
        </code>
      </div>
    </Carousel>
  );
};

const App = () => {
  const kittenImageSizes = [900, 800, 700, 600, 500, 400];
  const images = kittenImageSizes.map((kittenImageSize) => ({
    src: `https://placekitten.com/${kittenImageSize}/${kittenImageSize}`,
    alt: `Kitten of size ${kittenImageSize} pixels`
  }));

  const basicCarouselExampleCode = `<Carousel images={images} lazy loop style={{ height: '40vh' }} />`;

  return (
    <div
      style={{
        maxWidth: 'min(100vh, 1440px)',
        margin: '0 auto'
      }}
    >
      {/*basic carousel example with self-managed slides */}
      <PackageIntroductionCarousel exampleCode={basicCarouselExampleCode} />

      {/*basic carousel example*/}
      <Carousel images={images} lazy loop style={{ height: '40vh' }} />

      {/*advanced carousel example*/}
      <Carousel
        images={images}
        speed={1500} // 1500 px per second
        threshold={0.1} // 10% of image width
        interval={1} // second auto play interval
        fit={'contain'}
        lazy
        auto
        loop
        rtl
        controls
        style={{
          height: '40vh',
          border: '10px solid #bbb',
          overflow: 'hidden',
          borderRadius: 20,
          willChange: 'transform',
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          boxSizing: 'border-box'
        }}
      />
    </div>
  );
};

export default App;
