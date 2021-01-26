import React from 'react';

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const PackageIntroductionCarousel = ({ exampleCode }) => {
  return (
    <Carousel
      arrowButtons={true}
      sizeButtons='topLeft'
      indexBoard='topRight'
      indicatorButtons={false}
      style={{ height: '20vh' }}
    >
      <div>
        <img
          className='_Image-module__image__t1897'
          src='https://placekitten.com/500/500'
          alt='Kitten of size 500 pixels'
          aria-label='Kitten of size 500 pixels'
          title='Kitten of size 500 pixels'
          loading='lazy'
        />
      </div>
      <div>
        <img
          className='_Image-module__image__t1897'
          src='https://placekitten.com/500/500'
          alt='Kitten of size 500 pixels'
          aria-label='Kitten of size 500 pixels'
          title='Kitten of size 500 pixels'
          loading='lazy'
        />
      </div>
      <div>
        <img
          className='_Image-module__image__t1897'
          src='https://placekitten.com/500/500'
          alt='Kitten of size 500 pixels'
          aria-label='Kitten of size 500 pixels'
          title='Kitten of size 500 pixels'
          loading='lazy'
        />
      </div>
    </Carousel>
  );
};

const App = () => {
  const kittenImageSizes = [
    500,
    510,
    520,
    530,
    540,
    550,
    560,
    570,
    580,
    590,
    600,
    610,
    620,
    630,
    640,
    650,
    660,
    670,
    680,
    690
  ];
  const images = kittenImageSizes.map((kittenImageSize) => ({
    src: `https://placekitten.com/${kittenImageSize}/${kittenImageSize}`,
    alt: `Kitten of size ${kittenImageSize} pixels`
  }));

  const basicCarouselExampleCode = `<Carousel images={images} style={{ height: '40vh' }} />`;

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
      <Carousel images={images} style={{ height: '40vh' }} />

      {/*customized carousel example*/}
      <Carousel
        images={images}
        isRTL
        isLoop
        lazyLoad
        objectFit={'contain'}
        autoPlay
        autoPlayPaused
        autoPlayInterval={5000} // 5000 milliseconds auto play interval
        swipeThreshold={0.1} // 10% of image width
        transitionSpeed={1} // 1 pixels per millisecond
        transitionDurationMin={300} // 300 milliseconds of minimum transition duration
        transitionDurationMax={700} // 700 milliseconds of minimum transition duration
        arrowButtons={true}
        mediaButtons='bottomLeft'
        sizeButtons='bottomRight'
        indexBoard='bottomCenter'
        indicatorButtons={false}
        thumbnails={false}
        className='framed'
        style={{ height: '40vh' }}
      />
    </div>
  );
};

export default App;
