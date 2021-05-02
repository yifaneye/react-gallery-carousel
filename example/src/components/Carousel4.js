import React, { useEffect, useState } from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const Carousel3 = ({ images }) => {
  const [dynamicImages, setDynamicImages] = useState([]);

  useEffect(() => {
    setDynamicImages(images);
    return () => {};
  }, [setDynamicImages, images]);

  return (
    <section className='section' aria-labelledby='example4'>
      <header className='section-header'>
        <h2 id='example4'>
          Example 4: Customized carousel with dynamic images{' '}
          <small>(available from v0.1.1)</small>
        </h2>
        <p>
          This example has images dynamically set in the{' '}
          <code>useEffect()</code> hook. This customized example additionally
          has <strong>click to enter and exit the maximized carousel</strong>;
          custom initial index; custom widget positions; custom thumbnails,
          custom dot buttons and captions for the maximized carousel; custom
          active and passive dot buttons; and custom styles for the
          non-maximized carousel.{' '}
          <a href='https://github.com/yifaneye/react-gallery-carousel/blob/master/example/src/components/Carousel4.js'>
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
  );
};

export default Carousel3;
