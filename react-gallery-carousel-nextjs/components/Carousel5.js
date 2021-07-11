import React, { useRef } from 'react';
import Carousel from 'react-gallery-carousel';
import { Button } from 'react-responsive-button';

const Carousel5 = ({ images }) => {
  const carouselRef = useRef(null);

  return (
    <section className='section' aria-labelledby='example5'>
      <header className='section-header'>
        <h2 id='example5'>
          Example 5: Default carousel with imperative handlers{' '}
          <small>(available from v0.2.0)</small>{' '}
          <a href='https://yifanai.com/rgc5'>code</a>
        </h2>
        <p>
          To customize the carousel in a declarative manner, pass the props
          (e.g. <code>isAutoPlaying</code>, <code>isMaximized</code>,{' '}
          <code>index</code>). To customize the carousel in an imperative
          manner, use the following handlers (on the ref):
        </p>
        <div>
          <div className='buttons'>
            <div className='button-container'>
              <Button
                aria-label='Start the autoplay on the carousel'
                onClick={() => carouselRef.current.play()}
              >
                play()
              </Button>
            </div>
            <div className='button-container'>
              <Button
                aria-label='Pause the autoplay on the carousel'
                onClick={() => carouselRef.current.pause()}
              >
                pause()
              </Button>
            </div>
            <div className='button-container'>
              <Button
                aria-label='Toggle the autoplay on the carousel'
                onClick={() => carouselRef.current.toggleIsPlaying()}
              >
                toggleIsPlaying()
              </Button>
            </div>
          </div>
          <div className='buttons'>
            <div className='button-container'>
              <Button
                style={{ backgroundColor: 'purple' }}
                aria-label='Maximize the carousel'
                onClick={() => carouselRef.current.maximize()}
              >
                maximize()
              </Button>
            </div>
            <div className='button-container'>
              <Button
                style={{ backgroundColor: 'purple' }}
                aria-label='Minimize the carousel'
                onClick={() => carouselRef.current.minimize()}
              >
                minimize()
              </Button>
            </div>
            <div className='button-container'>
              <Button
                style={{ backgroundColor: 'purple' }}
                aria-label='Toggle the maximization state on the carousel'
                onClick={() => carouselRef.current.toggleIsMaximized()}
              >
                toggleIsMaximized()
              </Button>
            </div>
          </div>
          <div className='buttons'>
            <div className='button-container'>
              <Button
                style={{ backgroundColor: 'blue' }}
                aria-label='Go to the slide on the left in the carousel'
                onClick={() => carouselRef.current.goLeft()}
              >
                goLeft()
              </Button>
            </div>
            <div className='button-container'>
              <Button
                style={{ backgroundColor: 'blue' }}
                aria-label='Go to the slide on the right in the carousel'
                onClick={() => carouselRef.current.goRight()}
              >
                goRight()
              </Button>
            </div>
            <div className='button-container'>
              <Button
                style={{ backgroundColor: 'blue' }}
                aria-label='Go to slide No.0 in the carousel'
                onClick={() => carouselRef.current.goToIndex(0)}
              >
                goToIndex(0)
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className='carousel-container'>
        <Carousel ref={carouselRef} images={images} />
      </div>
    </section>
  );
};

export default Carousel5;
