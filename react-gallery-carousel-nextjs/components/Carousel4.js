import React, { useEffect, useState } from 'react';
import Carousel from 'react-gallery-carousel';

const Carousel4 = ({ images }) => {
  const [dynamicImages, setDynamicImages] = useState([]);

  useEffect(() => {
    setDynamicImages(images);
  }, [setDynamicImages, images]);

  return (
    <section className='section' aria-labelledby='example4'>
      <header className='section-header'>
        <h2 id='example4'>
          Example 4: Customized carousel with dynamic images{' '}
          <small>(available from v0.1.1)</small>{' '}
          <a href='https://yifanai.com/rgc4'>code</a>
        </h2>
        <p>
          This example has images dynamically set in the{' '}
          <code>useEffect()</code> hook. This customized example additionally
          has <strong>click to enter and exit the maximized carousel</strong>;
          custom initial index; custom widget positions; custom thumbnails,
          custom dot buttons and captions for the maximized carousel; custom
          active and passive dot buttons; and custom styles for the
          non-maximized carousel.
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
          hasThumbnailsAtMax
          thumbnailWidth='15%'
          thumbnailHeight='15%'
          shouldMaximizeOnClick
          shouldMinimizeOnClick
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

export default Carousel4;
