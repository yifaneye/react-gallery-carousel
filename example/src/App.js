import React from 'react';

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const PackageIntroductionCarousel = ({ exampleCode }) => {
  return (
    <Carousel
      isLoop={false}
      widgetsShadow={true}
      arrowButtons={true}
      sizeButtons='topLeft'
      indexBoard='topRight'
      indicatorButtons={false}
      shouldCloseOnSwipeDown={false}
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
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
        <p>or</p>
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
  const imageIDs = Array(160)
    .fill(1)
    .map((_, i) => i + 1);
  const images = imageIDs.map((imageID) => ({
    src: `https://placedog.net/800/640?id=${imageID}`,
    alt: `Dog No. ${imageID}`,
    thumbnail: `https://placedog.net/80/64?id=${imageID}`
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
        thumbnails={true}
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
