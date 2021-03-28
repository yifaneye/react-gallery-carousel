import React from 'react';

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import TwoWayMap from './utils/TwoWayMap';

const imageIDs = Array(172)
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
      <div>
        <h1>react-gallery-carousel</h1>
        <p>
          Dependency-free React carousel component with support for lazy
          loading, pinch zoom, touch swiping, mouse dragging, velocity
          detection, maximization, thumbnails, keyboard navigation and
          accessibility.
        </p>
        <a href='https://www.npmjs.com/package/react-gallery-carousel'>npm</a>
        <span> / </span>
        <a href='https://github.com/yifaneye/react-gallery-carousel'>GitHub</a>
      </div>
      <div>
        <h2>Get Started</h2>
        <code>npm install react-gallery-carousel --save</code>
        <div>
          <span>or</span>
        </div>
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
  const basicCarouselExampleCode = `<Carousel images={images} style={{ height: '300px' }} />`;

  return (
    <div className='carousels-container'>
      <div className='carousel-container short'>
        {/*basic carousel example with user-managed slides */}
        <PackageIntroductionCarousel exampleCode={basicCarouselExampleCode} />
      </div>

      <div className='carousel-container'>
        {/*basic carousel example*/}
        <Carousel images={images} />
      </div>

      <div className='carousel-container'>
        {/*customized carousel example*/}
        <Carousel
          className='framed-carousel'
          images={images}
          index={99}
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
