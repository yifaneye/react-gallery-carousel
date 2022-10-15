import React from 'react';
import GitHubButton from 'react-github-btn';

const Footer = () => {
  return (
    <footer className='section'>
      <div className='action-container'>
        <strong>react-gallery-carousel (v0.3.0)</strong>
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
        <p>
          Mobile-friendly Carousel with batteries included (supporting touch,
          mouse emulation, lazy loading, thumbnails, fullscreen, RTL, keyboard
          navigation and customisations).
        </p>
        <div>
          <a href='https://yifanai.com/rgc'>Demo</a>
          <span> / </span>
          <a href='https://github.com/yifaneye/react-gallery-carousel'>
            GitHub
          </a>
          <span> / </span>
          <a href='https://www.npmjs.com/package/react-gallery-carousel'>npm</a>
          <span> / </span>
          <a href='https://github.com/yifaneye/react-gallery-carousel#installation'>
            Documentation
          </a>
          <div>
            <small>(The first version was published on 31st March 2021.)</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
