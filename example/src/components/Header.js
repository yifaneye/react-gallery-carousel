import React from 'react';
import GitHubButton from 'react-github-btn';

const Header = () => {
  return (
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
  );
};

export default Header;
