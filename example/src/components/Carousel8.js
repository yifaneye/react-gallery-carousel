import React, { useRef } from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { Button } from 'react-responsive-button';

const Carousel8 = ({ images }) => {
  const carouselRef = useRef(null);

  return (
    <section className='section' aria-labelledby='example8'>
      <header className='section-header'>
        <h2 id='example8'>
          Example 8: Default carousel with custom elements{' '}
          <small>(available from v0.4.0)</small>{' '}
          <a href='https://yifanai.com/rgc8'>code</a>
        </h2>
        <p>
          To use custom elements, set the widget props (e.g.{' '}
          <code>hasLeftButton</code>, <code>hasRightButton</code>) to{' '}
          <code>false</code>, then pass the custom elements to the{' '}
          <code>elements</code> prop.
        </p>
      </header>
      <div className='carousel-container'>
        <Carousel
          ref={carouselRef}
          images={images}
          isMaximized={false}
          hasSizeButton={false}
          hasMediaButton={false}
          hasIndexBoard={false}
          hasLeftButton={false}
          hasRightButton={false}
          elements={
            <>
              <Button
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  transform: 'translateY(-50%)',
                  borderRadius: 0
                }}
                aria-label='Go to the slide on the left'
                onClick={() => carouselRef.current.goLeft()}
              >
                <span
                  className='icon-text'
                  role='img'
                  aria-label='left'
                  style={{
                    fontSize: 'min(50px, 5vw)'
                  }}
                >
                  ⬅️
                </span>
              </Button>
              <Button
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%)',
                  borderRadius: 0
                }}
                aria-label='Go to the slide on the right'
                onClick={() => carouselRef.current.goRight()}
              >
                <span
                  className='icon-text'
                  role='img'
                  aria-label='right'
                  style={{
                    fontSize: 'min(50px, 5vw)'
                  }}
                >
                  ➡️
                </span>
              </Button>
            </>
          }
        />
      </div>
    </section>
  );
};

export default Carousel8;
