import React from 'react';
import GitHubButton from 'react-github-btn';

const Header = () => {
  return (
    <div className='carousel-page-header-container'>
      <header className='carousel-page-header'>
        <h1>react-gallery-carousel</h1>
        <p>
          Mobile-friendly Carousel with batteries included (supporting touch,
          mouse emulation, lazy loading, thumbnails, fullscreen, RTL, keyboard
          navigation and customisations).
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
  );
};

export default Header;
