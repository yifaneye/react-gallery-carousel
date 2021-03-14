import React from 'react';

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import TwoWayMap from './utils/twoWayMap';

const imageIDs = Array(100)
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
    0: 'Introduction',
    1: 'Get Started',
    2: 'Example'
  });

  return (
    <Carousel
      isLoop={false}
      widgetsHasShadow={true}
      hasIndexBoard='topRight'
      hasSizeButton='bottomLeft'
      hasMediaButton='bottomRight'
      hasDotButtons='bottom'
      shouldSwipeOnMouse={false} // for selecting text
      shouldMinimizeOnSwipeDown={false} // for overflow scrolling
      index={Number(
        indexToTitle.getReversed(window.location.hash.replace('#', ''))
      )}
      onIndexChange={({ curIndex }) => {
        const title = indexToTitle.get(curIndex);
        window.location.hash = title;
        document.title = title;
      }}
      style={{ width: '100%', height: '200px', userSelect: 'text' }}
    >
      <div>
        <h1>react-gallery-carousel</h1>
        <p>
          Carousel component with support for lazy loading, velocity detection,
          pinch zoom, touch swiping, mouse dragging, keyboard navigation, full
          screen mode and thumbnails.
        </p>
        <a href='https://www.npmjs.com/package/react-gallery-carousel'>npm</a>
        <span> / </span>
        <a href='https://github.com/yifaneye/react-gallery-carousel'>GitHub</a>
      </div>
      <div>
        <h2>Get Started</h2>
        <code>npm install react-gallery-carousel --save</code>
        <span>or</span>
        <code>yarn add react-gallery-carousel</code>
      </div>
      <div>
        <h2>Example</h2>
        <p>The basic carousel shown below is created by:</p>
        <code>{exampleCode}</code>
      </div>
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
          index={10}
          isRTL={true}
          isMaximized={false}
          hasCaptions={false}
          hasCaptionsAtMax='bottom'
          hasDotButtons='bottom'
          hasDotButtonsAtMax={false}
          hasThumbnails={false}
          hasThumbnailsAtMax={true}
          // activeIcon={<span className='text'>x</span>}
          // passiveIcon={<span className='text'>o</span>}
          className='framed'
        />
      </div>

      {/*control-less carousel example*/}
      <div style={{ width: '100%', height: '60vh' }}>
        <Carousel
          images={images}
          index={20}
          autoplay={false}
          hasMediaButton={false}
          hasSizeButton={false}
          hasArrowButtons={false}
          hasIndexBoard={false}
          hasIndexBoardAtMax={'topCenter'}
          hasCaptionsAtMax={'bottom'}
          shouldMaximizeOnClick={true}
          shouldMinimizeOnClick={true}
        />
      </div>
    </div>
  );
};

export default App;
