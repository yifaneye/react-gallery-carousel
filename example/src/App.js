import React from 'react';

import Carousel from 'react-gallery-carousel';
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
  const kittenImageSizes = [
    900,
    800,
    700,
    600,
    500,
    400,
    900,
    800,
    700,
    600,
    500,
    400,
    800,
    700,
    600,
    500,
    400
  ];
  const images = kittenImageSizes.map((kittenImageSize) => ({
    src: `https://placekitten.com/${kittenImageSize}/${kittenImageSize}`,
    alt: `Kitten of size ${kittenImageSize} pixels`
  }));

  const basicCarouselExampleCode = `<Carousel images={images} lazy loop style={{ height: '40vh' }} />`;

  return (
    <div
      style={{
        maxWidth: '1440px',
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
        speed={0.1} // 0.1 pixels per millisecond
        threshold={0.1} // 10% of image width
        transitionMin={500} // 500 milliseconds of minimum transition duration
        interval={5000} // 5000 milliseconds auto play interval
        fit={'contain'}
        className='framed'
        auto
        loop
        rtl
        controls
      />
    </div>
  );
};

export default App;
