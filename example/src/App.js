import React from 'react';

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import TwoWayMap from './utils/twoWayMap';

const imageIDs = Array(160)
  .fill(1)
  .map((_, i) => i + 1);
const images = imageIDs.map((imageID) => {
  const value = (imageID % 2) * 5;
  return {
    src: `https://placedog.net/800/6${value}0?id=${imageID}`,
    alt: `Dog No. ${imageID}. Dogs are domesticated mammals, not natural wild animals. They were originally bred from wolves. They have been bred by humans for a long time, and were the first animals ever to be domesticated.`,
    thumbnail: `https://placedog.net/80/6${value}?id=${imageID}`
  };
});

const PackageIntroductionCarousel = ({ exampleCode }) => {
  const indexToTitle = new TwoWayMap({
    1: 'Introduction',
    2: 'Get Started',
    3: 'Example'
  });

  return (
    <Carousel
      isLoop={false}
      widgetsShadow={true}
      indexBoard='topRight'
      sizeButtons='bottomLeft'
      mediaButtons='bottomRight'
      dotButtons='bottom'
      autoPlayStarted={true}
      shouldSwipeOnMouse={false} // for selecting text
      shouldMinimizeOnSwipeDown={false} // for overflow scrolling
      index={Number(
        indexToTitle.getReversed(window.location.hash.replace('#', ''))
      )}
      onIndexChange={(index) => {
        const title = indexToTitle.get(index);
        window.location.hash = title;
        document.title = title;
      }}
      style={{ width: '100%', height: '40vh', userSelect: 'text' }}
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
        <p>The basic carousel shown below is created by:</p>
        <code>{exampleCode}</code>
      </div>
      {/*<div*/}
      {/*  style={{*/}
      {/*    height: 'calc(100% - 40px)',*/}
      {/*    width: 'calc(100% - 100px)',*/}
      {/*    margin: 'auto'*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Carousel*/}
      {/*    images={images}*/}
      {/*    sizeButtons={false}*/}
      {/*    style={{ height: '100%' }}*/}
      {/*  />*/}
      {/*</div>*/}
    </Carousel>
  );
};

const App = () => {
  const basicCarouselExampleCode = `<Carousel images={images} style={{ height: '60vh' }} />`;

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
      <div style={{ width: '100%', height: '60vh' }}>
        <Carousel images={images} />
      </div>

      {/*customized carousel example*/}
      <div style={{ width: '100%', height: '60vh' }}>
        <Carousel
          images={images}
          isRTL={true}
          isLoop={false}
          objectFit={'contain'}
          caption='top'
          sizeButtons='bottomCenter'
          mediaButtons='bottomLeft'
          indexBoard='bottomRight'
          dotButtons='bottom'
          activeIcon={<span className='text'>x</span>}
          passiveIcon={<span className='text'>o</span>}
          className='framed'
        />
      </div>
    </div>
  );
};

export default App;
