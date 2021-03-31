import React from 'react';

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import TwoWayMap from './utils/TwoWayMap';

const imageIDs = Array(30) // the maximum is currently 172
  .fill(1)
  .map((_, i) => i + 1);
const images = imageIDs.map((imageID) => {
  return {
    src: `https://placedog.net/400/240?id=${imageID}`,
    srcset: `https://placedog.net/400/240?id=${imageID} 400w, https://placedog.net/700/420?id=${imageID} 700w, https://placedog.net/1000/600?id=${imageID} 1000w`,
    sizes: '(max-width: 1000px) 400px, (max-width: 2000px) 700px, 1000px',
    alt: `Dog No. ${imageID}. Dogs are domesticated mammals, not natural wild animals. They were originally bred from wolves. They have been bred by humans for a long time, and were the first animals ever to be domesticated.`,
    thumbnail: `https://placedog.net/100/60?id=${imageID}`
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
        document.title = `${title} | react-gallery-carousel`;
      }}
      style={{ userSelect: 'text' }}
    >
      <div className='text-slide'>
        <h3>Introduction</h3>
        <p>
          react-gallery-carousel is a dependency-free React carousel component
          with support for lazy loading, pinch zoom, touch swiping, mouse
          dragging, velocity detection, maximization, thumbnails, keyboard
          navigation and accessibility.
        </p>
        <a href='https://yifanai.com/rgc'>Demo</a>
        <span> / </span>
        <a href='https://www.npmjs.com/package/react-gallery-carousel'>npm</a>
        <span> / </span>
        <a href='https://github.com/yifaneye/react-gallery-carousel'>GitHub</a>
      </div>
      <div className='text-slide'>
        <h3>Get Started</h3>
        <code>npm install react-gallery-carousel --save</code>
        <div>
          <span>or</span>
        </div>
        <code>yarn add react-gallery-carousel</code>
      </div>
      <div className='text-slide'>
        <h3>Example</h3>
        <p>The basic carousel shown below is created by:</p>
        <code>{exampleCode}</code>
      </div>
    </Carousel>
  );
};

const App = () => {
  const basicCarouselExampleCode = `<Carousel images={images} />`;

  return (
    <div className='carousels-container'>
      <h1>react-gallery-carousel</h1>
      <h2>Example 1:</h2>
      <p>This is a example with user-managed slides</p>
      <div className='carousel-container short'>
        {/*basic carousel example with user-managed slides */}
        <PackageIntroductionCarousel exampleCode={basicCarouselExampleCode} />
      </div>
      <h2>Example 2:</h2>
      <p>This is the default example with images</p>
      <div className='carousel-container'>
        {/*basic carousel example*/}
        <Carousel images={images} />
      </div>
      <h2>Example 3:</h2>
      <p>This is the customized example with images</p>
      <div className='carousel-container'>
        {/*customized carousel example*/}
        <Carousel
          className='framed-carousel'
          images={images}
          index={7}
          // isRTL={true}
          isMaximized={false}
          hasMediaButtonAtMax='bottomLeft'
          hasIndexBoardAtMax='bottomCenter'
          hasSizeButtonAtMax='bottomRight'
          hasCaptionsAtMax='top'
          hasThumbnails={false}
          hasThumbnailsAtMax={true}
          shouldMaximizeOnClick={true}
          shouldMinimizeOnClick={true}
          // activeIcon={<span className='icon-text'>x</span>}
          // passiveIcon={<span className='icon-text'>o</span>}
        />
      </div>
    </div>
  );
};

export default App;
