import React from 'react';

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const PackageIntroductionCarousel = ({ exampleCode }) => {
  return (
    <Carousel
      arrowButtons={true}
      sizeButtons='topLeft'
      indexBoard='topRight'
      indicatorButtons={false}
      style={{ height: '20vh' }}
    >
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
      <div>
        <img
          className='_Image-module__image__t1897'
          src='https://placekitten.com/500/500'
          alt='Kitten of size 500 pixels'
          aria-label='Kitten of size 500 pixels'
          title='Kitten of size 500 pixels'
          loading='lazy'
        />
      </div>
    </Carousel>
  );
};

const App = () => {
  const kittenImageSizes = [
    500,
    510,
    520,
    530,
    540,
    550,
    560,
    570,
    580,
    590,
    600,
    610,
    620,
    630,
    640,
    650,
    660,
    670,
    680,
    690
  ];
  const images = kittenImageSizes.map((kittenImageSize) => ({
    src: `https://placekitten.com/${kittenImageSize}/${kittenImageSize}`,
    alt: `Kitten of size ${kittenImageSize} pixels`
  }));

  const basicCarouselExampleCode = `<Carousel images={images} style={{ height: '40vh' }} />`;

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
      <Carousel images={images} style={{ height: '40vh' }} />

      {/*customized carousel example*/}
      <Carousel
        images={images}
        isRTL
        isLoop
        lazyLoad
        objectFit={'contain'}
        autoPlay
        autoPlayPaused
        autoPlayInterval={5000} // 5000 milliseconds auto play interval
        swipeThreshold={0.1} // 10% of image width
        transitionSpeed={1} // 1 pixels per millisecond
        transitionDurationMin={300} // 300 milliseconds of minimum transition duration
        transitionDurationMax={700} // 700 milliseconds of minimum transition duration
        arrowButtons={true}
        thumbnails={false}
        mediaButtons='bottomLeft'
        sizeButtons='bottomRight'
        indexBoard='bottomCenter'
        indicatorButtons={false}
        widgetsShadow={false}
        className='framed'
        style={{ height: '40vh' }}
      />
    </div>
  );
};

export default App;
