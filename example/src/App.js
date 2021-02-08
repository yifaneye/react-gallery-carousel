import React from 'react';

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const imageIDs = Array(160)
  .fill(1)
  .map((_, i) => i + 1);
const images = imageIDs.map((imageID) => ({
  src: `https://placedog.net/800/640?id=${imageID}`,
  alt: `Dog No. ${imageID}. Dogs are domesticated mammals, not natural wild animals. They were originally bred from wolves. They have been bred by humans for a long time, and were the first animals ever to be domesticated.`,
  thumbnail: `https://placedog.net/80/64?id=${imageID}`
}));

const PackageIntroductionCarousel = ({ exampleCode }) => {
  return (
    <Carousel
      isLoop={false}
      widgetsShadow={true}
      indexBoard='topRight'
      sizeButtons='bottomLeft'
      mediaButtons='bottomRight'
      indicatorButtons='bottom'
      shouldSwipeOnMouse={false} // for selecting text
      shouldMinimizeOnSwipeDown={false} // for overflow scrolling
      style={{ height: '40vh', userSelect: 'text' }}
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
        <code>{exampleCode}</code>
      </div>
      <div
        style={{
          height: 'calc(100% - 40px)',
          width: 'calc(100% - 100px)',
          margin: 'auto'
        }}
      >
        <Carousel
          images={images}
          sizeButtons={false}
          style={{ height: '100%' }}
        />
      </div>
    </Carousel>
  );
};

const App = () => {
  const basicCarouselExampleCode = `<Carousel images={images} style={{ height: '40vh' }}`;

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
      <Carousel images={images} style={{ height: '60vh' }} />

      {/*customized carousel example*/}
      <Carousel
        images={images}
        isRTL={true}
        isLoop={false}
        objectFit={'contain'}
        transitionDurationMin={300} // 300 milliseconds of minimum transition duration
        transitionDurationMax={900} // 900 milliseconds of minimum transition duration
        caption='top'
        sizeButtons={false}
        mediaButtons='bottomLeft'
        indexBoard='bottomRight'
        className='framed'
        style={{ height: '700px' }}
      />
    </div>
  );
};

export default App;
