import React, { useEffect, useState } from 'react';

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
    1: 'Get%20Started',
    2: 'Example'
  });

  return (
    <Carousel
      isLoop={false}
      hasIndexBoard='topRight'
      hasSizeButton='bottomLeft'
      hasMediaButton='bottomRight'
      hasDotButtons='bottom'
      hasThumbnails={false}
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
          with lazy loading, preloading, pinch to zoom, touch swiping, mouse
          dragging, maximization, thumbnails, keyboard navigation, accessibility
          and velocity detection.
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
        <div className='vertical-separator'>
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
  const [dynamicImages, setDynamicImages] = useState([]);

  useEffect(() => {
    setDynamicImages(images);
    return () => {};
  }, [setDynamicImages]);

  return (
    <div className='carousel-page'>
      <div className='carousel-page-header-container'>
        <header className='carousel-page-header'>
          <h1>react-gallery-carousel</h1>
        </header>
      </div>

      <section className='section' aria-labelledby='example1'>
        <header className='section-header'>
          <h2 id='example1'>Example 1</h2>
          <p>Example with user-managed slides.</p>
        </header>
        <div className='carousel-container short'>
          {/*basic carousel example with user-managed slides */}
          <PackageIntroductionCarousel exampleCode={basicCarouselExampleCode} />
        </div>
      </section>

      <section className='section' aria-labelledby='example2'>
        <header className='section-header'>
          <h2 id='example2'>Example 2</h2>
          <p>
            Default example with images (with lazy loading and preloading; touch
            swiping and mouse dragging on the carousel; touch swiping, mouse
            dragging and wheel scrolling on the thumbnails; touch swipe down to
            exit the maximized carousel; and keyboard navigation).
          </p>
        </header>
        <div className='carousel-container'>
          {/*basic carousel example*/}
          <Carousel images={images} />
        </div>
      </section>

      <section className='section' aria-labelledby='example3'>
        <header className='section-header'>
          <h2 id='example3'>Example 3</h2>
          <p>
            Customized example with images dynamically set in the{' '}
            <code>useEffect()</code> hook (additionally with click to enter and
            exit the maximized carousel; custom widget positions; thumbnails and
            captions for the maximized carousel; and custom styles for the
            non-maximized carousel).
          </p>
        </header>
        <div className='carousel-container'>
          {/*customized carousel example*/}
          <Carousel
            className='framed-carousel'
            images={dynamicImages}
            index={1}
            // isRTL={true}
            isMaximized={false}
            hasSizeButton='topLeft'
            hasMediaButton='topCenter'
            hasIndexBoard='topRight'
            hasSizeButtonAtMax='bottomLeft'
            hasMediaButtonAtMax='bottomCenter'
            hasIndexBoardAtMax='bottomRight'
            hasCaptionsAtMax='top'
            hasThumbnails={false}
            hasThumbnailsAtMax={true}
            shouldMaximizeOnClick={true}
            shouldMinimizeOnClick={true}
            // activeIcon={<span className='icon-text'>x</span>}
            // passiveIcon={<span className='icon-text'>o</span>}
          />
        </div>
      </section>
    </div>
  );
};

export default App;
