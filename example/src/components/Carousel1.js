import React from 'react';
import TwoWayMap from '../utils/TwoWayMap';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const Carousel1 = () => {
  const indexToTitle = new TwoWayMap({
    0: 'Introduction',
    1: 'Get%20Started',
    2: 'Usage'
  });

  return (
    <section className='section' aria-labelledby='example1'>
      <header className='section-header'>
        <h2 id='example1'>
          Example 1: Customized carousel with user-managed slides{' '}
          <a href='https://yifanai.com/rgc1'>code</a>
        </h2>
        <p>
          This example has custom elements in slides (user-managed slides) using
          the <code>children</code> prop; and custom widget positions.
        </p>
      </header>
      <div className='carousel-container short'>
        <Carousel
          isLoop={false}
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
          // onIndexChange={({ curIndex }) => {
          //   const title = indexToTitle.get(curIndex);
          //   window.history.replaceState(
          //     undefined,
          //     undefined,
          //     `#${title}`
          //   );
          //   document.title = `${title} | react-gallery-carousel`;
          // }} // this callback can be set to update the document title and URL hash on index update
          style={{ userSelect: 'text' }}
        >
          <div className='text-slide'>
            <h3>Introduction</h3>
            <p>
              <strong>react-gallery-carousel</strong> is a mobile-friendly
              dependency-free React carousel component with support for touch,
              mouse dragging, lazy loading, thumbnails, modal, keyboard
              navigation, RTL and pinch to zoom.
            </p>
            <a href='https://yifanai.com/rgc'>Demo</a>
            <span> / </span>
            <a href='https://github.com/yifaneye/react-gallery-carousel'>
              GitHub
            </a>
            <span> / </span>
            <a href='https://www.npmjs.com/package/react-gallery-carousel'>
              npm
            </a>
            <span> / </span>
            <a href='https://github.com/yifaneye/react-gallery-carousel#installation'>
              Documentation
            </a>
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
            <h3>Usage</h3>
            <p>The default carousel shown below as example 2 is created by:</p>
            <code>{'<Carousel images={images} />'}</code>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Carousel1;
