import React, { useEffect, useState } from 'react';

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import TwoWayMap from './utils/TwoWayMap';
import GitHubButton from 'react-github-btn';

const imageIDs = Array(30) // the maximum is currently 149
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
      hasIndexBoard='topRight'
      hasMediaButton={false}
      hasMediaButtonAtMax='bottomLeft'
      hasSizeButton='bottomRight'
      hasDotButtons='bottom'
      hasThumbnails={false}
      shouldSwipeOnMouse={false} // for selecting text
      shouldMinimizeOnSwipeDown={false} // for vertical overflow scrolling
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
          react-gallery-carousel is a mobile-friendly dependency-free React
          carousel component with support for touch, mouse dragging, lazy
          loading, thumbnails, modal, keyboard navigation, RTL and pinch to
          zoom.
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
          <p>
            A mobile-friendly dependency-free React carousel component with
            support for touch, mouse dragging, lazy loading, thumbnails, modal,
            keyboard navigation, RTL and pinch to zoom.
          </p>
          <div className='star-button-container'>
            <GitHubButton
              href='https://github.com/yifaneye/react-gallery-carousel'
              data-size='large'
              data-show-count='true'
              aria-label='Star yifaneye/react-gallery-carousel on GitHub'
            >
              Star
            </GitHubButton>
          </div>
        </header>
      </div>

      <section className='section' aria-labelledby='example1'>
        <header className='section-header'>
          <h2 id='example1'>
            Example 1: Customized carousel with user-managed slides
          </h2>
          <p>
            This example has callback set to update the document title and URL
            hash on index update; and custom widget positions.{' '}
            <a
              href='https://github.com/yifaneye/react-gallery-carousel/blob/master/example/src/App.js#L29'
              target='_blank'
              rel='noopener noreferrer'
            >
              See the code
            </a>
          </p>
        </header>
        <div className='carousel-container short'>
          <PackageIntroductionCarousel exampleCode={basicCarouselExampleCode} />
        </div>
      </section>

      <section className='section' aria-labelledby='example2'>
        <header className='section-header'>
          <h2 id='example2'>Example 2: Default carousel with images</h2>
          <p>
            A default carousel example has lazy loading and preloading (the 2
            adjacent images on either side of the current image); touch swiping
            and mouse dragging on the carousel; touch swiping, mouse dragging
            and wheel scrolling on the thumbnails; touch swipe down to exit the
            maximized carousel; and keyboard navigation.{' '}
            <a
              href='https://github.com/yifaneye/react-gallery-carousel/blob/master/example/src/App.js#L152'
              target='_blank'
              rel='noopener noreferrer'
            >
              See the code
            </a>
          </p>
        </header>
        <div className='carousel-container'>
          <Carousel images={images} />
        </div>
      </section>

      <section className='section' aria-labelledby='example3'>
        <header className='section-header'>
          <h2 id='example3'>
            Example 3: Default carousel with images and with right-to-left (RTL)
          </h2>
          <p>
            A default carousel example has lazy loading and preloading; touch
            swiping and mouse dragging on the carousel; touch swiping, mouse
            dragging and wheel scrolling on the thumbnails; touch swipe down to
            exit the maximized carousel; and keyboard navigation.{' '}
            <a
              href='https://github.com/yifaneye/react-gallery-carousel/blob/master/example/src/App.js#L176'
              target='_blank'
              rel='noopener noreferrer'
            >
              See the code
            </a>
          </p>
        </header>
        <div className='carousel-container'>
          <Carousel images={images} isRTL={true} />
        </div>
      </section>

      <section className='section' aria-labelledby='example4'>
        <header className='section-header'>
          <h2 id='example4'>
            Example 4: Customized carousel with dynamic images
          </h2>
          <p>
            This example has images dynamically set in the{' '}
            <code>useEffect()</code> hook. This customized example additionally
            has <strong>click to enter and exit the maximized carousel</strong>;
            custom initial index; custom widget positions; custom thumbnails,
            custom dot buttons and captions for the maximized carousel; custom
            active and passive dot buttons; and custom styles for the
            non-maximized carousel.{' '}
            <a
              href='https://github.com/yifaneye/react-gallery-carousel/blob/master/example/src/App.js#L203'
              target='_blank'
              rel='noopener noreferrer'
            >
              See the code
            </a>
          </p>
        </header>
        <div className='carousel-container'>
          <Carousel
            className='framed-carousel'
            images={dynamicImages}
            index={2}
            isMaximized={false}
            hasSizeButton={false}
            hasMediaButton={false}
            hasIndexBoard={false}
            hasLeftButton={false}
            hasRightButton={false}
            hasCaptionsAtMax='top'
            hasDotButtonsAtMax='bottom'
            hasThumbnails={false}
            hasThumbnailsAtMax={true}
            thumbnailWidth={'15%'}
            thumbnailHeight={'15%'}
            shouldMaximizeOnClick={true}
            shouldMinimizeOnClick={true}
            activeIcon={
              <span className='icon-text' role='img' aria-label='active'>
                🔳
              </span>
            }
            passiveIcon={
              <span className='icon-text' role='img' aria-label='passive'>
                🔲
              </span>
            }
          />
        </div>
      </section>
      <footer className='section'>
        <div className='action-container'>
          <div className='star-button-container'>
            <GitHubButton
              href='https://github.com/yifaneye/react-gallery-carousel'
              data-size='large'
              data-show-count='true'
              aria-label='Star yifaneye/react-gallery-carousel on GitHub'
            >
              Star
            </GitHubButton>
          </div>
          <div>
            <a href='https://yifanai.com/rgc'>Demo</a>
            <span> / </span>
            <a href='https://github.com/yifaneye/react-gallery-carousel'>
              GitHub
            </a>
            <span> / </span>
            <a href='https://www.npmjs.com/package/react-gallery-carousel'>
              npm
            </a>
            <div>
              <small>
                (The first version was published on 31st March 2021.)
              </small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
