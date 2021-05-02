import React from 'react';
import GitHubButton from 'react-github-btn';

const Footer = () => {
  return (
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
          <a href='https://www.npmjs.com/package/react-gallery-carousel'>npm</a>
          <div>
            <small>(The first version was published on 31st March 2021.)</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
