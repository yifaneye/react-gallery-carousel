# react-gallery-carousel

[![npm version][npm-badge]][npm-url]
[![npm downloads][downloads-badge]][npm-url]
[![npm bundle size][size-badge]][npm-url]
[![prettier][prettier-badge]][prettier-url]
[![license][license-badge]][license-url]

[npm-badge]: https://img.shields.io/npm/v/react-gallery-carousel.svg
[npm-url]: https://www.npmjs.com/package/react-gallery-carousel
[downloads-badge]: https://img.shields.io/npm/dm/react-gallery-carousel.svg
[size-badge]: https://badgen.net/bundlephobia/minzip/react-gallery-carousel
[prettier-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-url]: https://github.com/prettier/prettier
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/yifaneye/react-gallery-carousel/blob/master/LICENSE

Mobile-friendly Carousel with batteries included (supporting touch, mouse emulation, lazy loading, thumbnails, fullscreen, RTL, keyboard navigation and customisations).

_The first version was published on 31st March 2021._

![Carousel controlled by finger](https://yifanai.s3-ap-southeast-2.amazonaws.com/rgc/demo_touch.gif)

Try **[Live Demo](https://yifanai.com/rgc)**

## Background

### What problems do other Carousels have?

I have **used and carefully analyzed a lot of carousel/slider components**. I summarized that **their issues** are:
1. Some of them do not move the slide as the user swipes on the slide.
2. Most of them do not support mouse dragging to move to the previous or the next slide. With the ones those support mouse emulation, some of them do not properly handle the case where the mouse leaves the carousel, which allow the user to continuously control the carousel.
3. Most of them do not support keyboard navigation (i.e. left, right and tab key).
4. Most of them cannot be maximized to fullscreen/modal/lightbox. With fullscreen, there is the issue of browser compatibility, i.e. iOS Safari on iPhone does not support the fullscreen API.
5. Most of them do not have an easy solution for building thumbnails. With the ones those have thumbnails, most of the thumbnails cannot be freely scrolled which lead to poor user experience. In addition, most of the thumbnails cannot be lazy loaded.
6. Most of them cannot lazy load (and preload) images. With the ones those can lazy load, most of them have transition that traverses the intermediate images when the user goes to a distant slide, which defeat the purpose of lazy loading.
7. Some of them cannot autoplay. With the ones those can autoplay, they cannot auto pause. For example, when the user hits another tab or goes to another app, the autoplay on those carousels do not pause.
8. Most of them do not respect the reduced motion settings by the user.
9. Most of them disregard the velocity of the swipe and just set a constant transition duration.
10. Some of their carousels will be in different sizes when the images/slides inside are in different sizes. Some of their transitions are bumpy when their images/slides are in different sizes.
11. Most of them do not support custom elements in a slide.
12. Most of them cannot be set to display in Right-to-Left (RTL).
13. Some of them disable pinching to zoom, while some others glitch when pinching with 2 fingers. Besides, when the window is zoomed in, most of them still detect for touch swiping to move to the previous, or the next slide, while the intention of most users in this scenario is panning to see other parts of the current slide.
14. Some of them will cause the slides to stuck its position on window resize or on mobile device orientation change, until another user interaction.
15. Some of them can only have predetermined images (i.e. before the carousel component mounts).
16. Most of them do not provide a solution for fallback image (for when an image is not available).
17. Some of them get zoomed in when the user double taps on the control, while the intention of most users in this scenario is to quickly go to the next after the next slide.
18. Some of them remove the left or right button to indicate that there are no more slides in that direction. However, user is likely to click that spot where the button used to be, which causes undesired behaviours e.g. clicking on a link or button which is also at that spot.
19. Some of them use the method of cloning the first, and the last slide to achieve looping (or infinite mode). I think that method is not great semantically.
20. Some of them cannot distinguish a vertical swipe from a horizontal swipe, so that a not exactly vertical swipe moves the slides slightly horizontally; and a not exactly horizontal swipe moves the (document) page slightly vertically.

### What did I set to achieve?

I wanted to write my own **detail-oriented** and **exquisite** carousel component that is easy to use yet solves/supports all these things above under the hood. 🤓

I wanted to take my understanding of JavaScript events, DOM manipulation, browser APIs, cross-browser compatibility and performance debugging to the next level. 🤓

I wanted to master React functional components, hooks, custom hooks and reconciliation. 🤓

I wanted to learn more, place more care and attention to accessibility. I want to give focus outlines to the right users, support keyboard navigation, support screen reader, and follow [W3C accessible carousel tutorials](https://www.w3.org/WAI/tutorials/carousels/).

My carousel should support: touch, mouse emulation, keyboard navigation, modal (lightbox), thumbnails, autoplay (and auto pause), RTL (right to left for internationalization), image lazy loading (and preloading), responsive images, fallback image, reduced motion settings, instantaneous velocity detection, responsive design, images with any sizes, custom elements in a slide, pinch to zoom, customization and great accessibility. 😎

(e.g. To solve the last issue (#20) in the list above, my carousel should be able to detect a mostly vertical swipe and then fix the slides horizontally in the carousel. ✅
It should also be able to detect a mostly horizontal swipe and then fix the carousel vertically in the page. ✅)

## Demo

### Live demo
Try **[Live Demo](https://yifanai.com/rgc)**

### Carousel controlled by finger
![Carousel controlled by finger](https://yifanai.s3-ap-southeast-2.amazonaws.com/rgc/demo_touch.gif)

### Carousel controlled by cursor
![Carousel controlled by cursor](https://user-images.githubusercontent.com/49315663/118391709-1b490380-b679-11eb-9f56-44a6702419a0.gif)

### Lighthouse report
![Lighthouse Report on react-gallery-carousel](https://user-images.githubusercontent.com/49315663/118391896-f30dd480-b679-11eb-895b-e4cf3160303b.jpg)
![Lighthouse Report with scores on react-gallery-carousel](https://yifanai.s3-ap-southeast-2.amazonaws.com/rgc/lighthouse_report_v0.1.3.jpg)
This lighthouse report is conducted on https://yifaneye.github.io/react-gallery-carousel/ in an incognito window on Chrome version 89.0.4389.114 (Official Build) (x86_64) on MacBook Pro with macOS version 10.15.7 (19H2) on 12th of April 2021.

### Non-maximized carousels
![Non-maximized Carousel](https://yifanai.s3-ap-southeast-2.amazonaws.com/rgc/demo_non_maximized.jpg)

### Maximized carousel
![Maximized Carousel](https://yifanai.s3-ap-southeast-2.amazonaws.com/rgc/demo_maximized.jpg)

## Installation

```bash
npm install --save react-gallery-carousel
```
OR
```bash
yarn add react-gallery-carousel
```

## Usage

```jsx
import React from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const App = () => {
  const images = [9, 8, 7, 6, 5].map((number) => ({
    src: `https://placedog.net/${number}00/${number}00?id=${number}`
  }));

  return (
    <Carousel images={images} style={{ height: 500, width: 800 }} />
  );
};

export default App;

```

## Props

To customize the carousel, use the following props:

|Name                     |Type                  |Default      |Description|
|:------------------------|:---------------------|:------------|:----------|
|images                   |Array                 |undefined    |Array of image(s) to be placed in the carousel. Each image object (e.g. [example object](#image-object-example)) in the array has a required attribute 'src'.|
|children                 |node or Array of nodes|undefined    |HTML element(s) to be placed into the carousel for user-managed slides. It (they) will be placed only if the 'images' prop is falsy.|
|thumbnails               |Array of nodes        |undefined    |HTML element(s) to be placed into the thumbnail view at the bottom. If not provided, the slides will be used. If provided, it must have the same length as the slides.|
|index                    |Number                |undefined    |Initial (0-indexed) index of the slides of the carousel as a whole number starting from 0.|
|isRTL                    |Boolean               |false        |If true, the slides of the carousel starts from the right (and also auto plays from the right to the left).|
|isLoop                   |Boolean               |true         |If true, the carousel form a loop (i.e. going left from the left-most slide lands at the right-most slide, and vice versa) from the ribbon of slides.|
|isMaximized              |Boolean               |false        |If true, the carousel is maximized initially.|
|shouldLazyLoad           |Boolean               |true         |If true, images that are not yet in the viewport of the carousel will be lazy loaded, except the 2 adjacent images from either side of the carousel which will be preloaded.|
|canAutoPlay              |Boolean               |true         |If true, the carousel has auto play capability.|
|isAutoPlaying            |Boolean               |false        |If true, the carousel auto plays initially.|
|autoPlayInterval         |Number                |5000         |Interval of the auto play (in milliseconds).|
|hasTransition            |Boolean               |true         |If false, the carousel does not have transition in moving between slides.|
|swipeThreshold           |Number                |0.1          |Threshold swipe distance (in percentage of the width of the viewport of the carousel) to move to the previous or the next slide.|
|swipeRollbackSpeed       |Number                |0.1          |Speed of the transition (in pixels per millisecond) in moving back to the current slide after a swipe smaller than swipeThreshold.|
|transitionSpeed          |Number                |1            |Speed of the transition (in pixels per millisecond) in moving to the previous or the next slide on non-swipe updates on the carousel.|
|transitionDurationLimit  |Number                |750          |Limit of transition duration (in milliseconds). The limit is used to flatten transition duration, where the maximum transition duration infinitely approaches this value.|
|transitionDurationMin    |Number                |250          |Minimum transition duration (in milliseconds). Transition duration can be set to be a constant with transitionDurationMin === transitionDurationMax.|
|transitionDurationMax    |Number                |undefined    |Maximum transition duration (in milliseconds). It will have precedence over transitionDurationMin, if transitionDurationMin > transitionDurationMax.|
|widgetsHasShadow         |Boolean               |false        |If true, the following widgets (with *) have shadows. (Note: if true, the transition will tend to drop frames when there are a large number of slides.)|
|hasLeftButton *          |Boolean or String     |'centerLeft' |If false, the carousel does not show left button. Its position can be specified by one of [small widget positions](#small-widget-positions).|
|hasRightButton *         |Boolean or String     |'centerRight'|If false, the carousel does not show right button. Its position can be specified by one of [small widget positions](#small-widget-positions).|
|hasMediaButton *         |Boolean or String     |'topLeft'    |If false, the carousel does not show media button (i.e. play/pause button). Its position can be specified by one of [small widget positions](#small-widget-positions). If the value of 'canAutoPlay' is falsy, media button will not be shown on the carousel.|
|hasSizeButton *          |Boolean or String     |'topRight'   |If false, the carousel does not show size button (i.e. maximize/minimize button). Its position can be specified by one of [small widget positions](#small-widget-positions).|
|hasIndexBoard *          |Boolean or String     |'topCenter'  |If false, the carousel does not show index board (i.e. currentIndex / totalNumberOfSlides). Its position can be specified by one of [small widget positions](#small-widget-positions).|
|hasDotButtons *          |Boolean or String     |false        |If false, the carousel does not show dot buttons (i.e. array of dots indicating the current slide in relation to other slides). Its position can be specified by one of [large widget positions](#large-widget-positions).|
|hasCaptions *            |Boolean or String     |false        |If false, the carousel does not show caption for each image. Its position can be specified by one of [large widget positions](#large-widget-positions).|
|hasThumbnails            |Boolean               |true         |If false, the carousel does not show thumbnails at the bottom.|
|hasLeftButtonAtMax *     |Boolean or String     |undefined    |If false, the maximized carousel does not show left button. Its position can be specified by one of [small widget positions](#small-widget-positions). It overrides 'hasLeftButton' prop for the maximized carousel. If not specified, the value of 'hasLeftButton' will be used.|
|hasRightButtonAtMax *    |Boolean or String     |undefined    |If false, the maximized carousel does not show right button. Its position can be specified by one of [small widget positions](#small-widget-positions). It overrides 'hasRightButton' prop for the maximized carousel. If not specified, the value of 'hasRightButton' will be used.|
|hasMediaButtonAtMax *    |Boolean or String     |undefined    |If false, the maximized carousel does not show media button (i.e. play/pause button). Its position can be specified by one of [small widget positions](#small-widget-positions). It overrides 'hasMediaButton' prop for the maximized carousel. If not specified, the value of 'hasMediaButton' will be used. If the value of 'canAutoPlay' is falsy, media button will not be shown on the maximized carousel.|
|hasSizeButtonAtMax *     |Boolean or String     |undefined    |If false, the maximized carousel does not show size button (i.e. maximize/minimize button). Its position can be specified by one of [small widget positions](#small-widget-positions). It overrides 'hasSizeButton' prop for the maximized carousel. If not specified, the value of 'hasSizeButton' will be used.|
|hasIndexBoardAtMax *     |Boolean or String     |undefined    |If false, the maximized carousel does not show index board (i.e. currentIndex / totalNumberOfSlides). Its position can be specified by one of [small widget positions](#small-widget-positions). It overrides 'hasIndexBoard' prop for the maximized carousel. If not specified, the value of 'hasIndexBoard' will be used.|
|hasDotButtonsAtMax *     |Boolean or String     |undefined    |If false, the maximized carousel does not show dot buttons (i.e. array of dots indicating the current slide in relation to other slides). Its position can be specified by one of [large widget positions](#large-widget-positions). It overrides 'hasDotButtons' prop for the maximized carousel. If not specified, the value of 'hasDotButtons' will be used.|
|hasCaptionsAtMax *       |Boolean or String     |undefined    |If false, the maximized carousel does not show caption for each image. Its position can be specified by one of [large widget positions](#large-widget-positions). It overrides 'hasCaptions' prop for the maximized carousel. If not specified, the value of 'hasCaptions' will be used.|
|hasThumbnailsAtMax       |Boolean               |undefined    |If false, the maximized carousel does not show thumbnails at the bottom. It overrides 'hasThumbnails' for the maximized carousel. If not specified, the value of 'hasThumbnails' will be used.|
|leftIcon                 |node                  |undefined    |Left icon (HTML element) to be placed into the left ArrowButton.|
|rightIcon                |node                  |undefined    |Right icon (HTML element) to be placed into the right ArrowButton.|
|playIcon                 |node                  |undefined    |Play icon (HTML element) to be placed into the MediaButton.|
|pauseIcon                |node                  |undefined    |Pause icon (HTML element) to be placed into the MediaButton.|
|minIcon                  |node                  |undefined    |Minimize icon (HTML element) to be placed into the SizeButton.|
|maxIcon                  |node                  |undefined    |Maximize icon (HTML element) to be placed into the SizeButton.|
|activeIcon               |node                  |undefined    |Active dot icon (HTML element) to be placed into the active DotButton indicating the current slide.|
|passiveIcon              |node                  |undefined    |Passive dot icon (HTML element) to be placed into the passive DotButton indicating all non-current slide(s).|
|shouldSwipeOnMouse       |Boolean               |true         |If true, the carousel can be swiped by the cursor using a mouse or a track pad.|
|shouldMaximizeOnClick    |Boolean               |false        |If true, the carousel can be maximized by clicking.|
|shouldMinimizeOnClick    |Boolean               |false        |If true, the carousel can be minimized by clicking.|
|shouldMinimizeOnSwipeDown|Boolean               |true         |If true, the carousel can be minimized by touch swiping down.|
|onIndexChange            |Function              |({curIndex, curIndexForDisplay}) => {} |Callback function invoked when the current index of the slides of the carousel is being updated. (Note: it is called regardless of whether index value's before and after are the same. ```curIndex``` is 0-indexed whilst ```curIndexForDisplay``` is 1-indexed)|
|onSwipeMoveX             |Function              |(displacementX) => {}                |Callback function invoked when the carousel is being swiped in a horizontal swipe. (Note: available from v0.2.0)|
|onSwipeMoveY             |Function              |(displacementX, displacementY) => {} |Callback function invoked when the carousel is being swiped in a vertical swipe. (Note: available from v0.2.0)|
|onSwipeEndDown           |Function              |() => {}     |Callback function invoked when the carousel is being swiped in a downward swipe. (Note: available from v0.2.0)|
|onTap                    |Function              |() => {}     |Callback function invoked when the carousel is being tapped (i.e. from mousedown to mouseup without mousemove, or from touchstart to touchend without touchmove. (Note: available from v0.2.0)|
|objectFit                |String                |'cover'      |CSS 'object-fit' style to be placed on each image, on the non-maximized carousel.|
|objectFitAtMax           |String                |'contain'    |CSS 'object-fit' style to be placed on each image, on the maximized carousel.|
|zIndexAtMax              |Number                |undefined    |CSS 'z-index' attribute to be placed on the maximized carousel.|
|thumbnailWidth           |String                |'10%'        |Width of each thumbnail. e.g. '20%', '20vw', '200px', 'auto'.|
|thumbnailHeight          |String                |'10%'        |Height of each thumbnail (as well as the height of thumbnails).  e.g. '20%', '20vh', '200px', 'auto'.|
|className                |String                |undefined    |Class name(s) to be placed on the non-maximized carousel.|
|style                    |Object                |undefined    |Inline style(s) to be placed on the non-maximized carousel.|

## Handlers

To customize the carousel in a declarative manner, use the props above (e.g. `isAutoPlaying`, `isMaximized`, `index`).

To customize the carousel in an imperative manner, use the following handlers (on the forwarded ref):

|Name                     |Description|
|:------------------------|:----------|
|play()                   |Start the autoplay by setting the `isPlaying` state to true. (Note: need >= v0.2.0)|
|pause()                  |Pause the autoplay by setting the `isPlaying` state to false. (Note: need >= v0.2.0)|
|toggleIsPlaying()        |Toggle the `isPlaying` state. (Note: need >= v0.2.0)|
|maximize()               |Maximize the carousel by setting the `isMaximized` state to true. (Note: need >= v0.2.0)|
|minimize()               |Minimize the carousel by setting the `isMaximized` state to false. (Note: need >= v0.2.0)|
|toggleIsMaximized()      |Toggle the `isMaximized` state. (Note: need >= v0.2.0)|
|goLeft()                 |Go to the left slide. (Note: need >= v0.2.0)|
|goRight()                |Go to the right slide. (Note: need >= v0.2.0)|
|goToIndex(index)         |Go to the specified index. (Note: need >= v0.2.0)|

## Definitions

 - Developer users: developers who use this component.
 - Users: end users of the products which use this component.

### Image Object Example
```
{
  src: `https://placedog.net/700/420?id=1`, // required
  srcset: `https://placedog.net/400/240?id=1 400w, https://placedog.net/700/420?id=1 700w, https://placedog.net/1000/600?id=1 1000w`,
  sizes: '(max-width: 1000px) 400px, (max-width: 2000px) 700px, 1000px',
  alt: `Dogs are domesticated mammals, not natural wild animals. They were originally bred from wolves. They have been bred by humans for a long time, and were the first animals ever to be domesticated.`,
  thumbnail: `https://placedog.net/100/60?id=1`
}
```
### Widgets Settings
```
[
  'hasLeftButton',
  'hasRightButton',
  'hasMediaButton',
  'hasSizeButton',
  'hasDotButtons',
  'hasIndexBoard'
],
```
### Small Widget Positions
```
[
  'topLeft', 'topCenter', 'topRight',
  'centerLeft', 'centerCenter', 'centerRight',
  'bottomLeft', 'bottomCenter','bottomRight'
]
```
### Large Widget Positions
```
['top', 'bottom']
```

## FAQ

### Q: How to place video, text or any element into a slide?
A: Custom elements in slides (called user-managed slides) can be placed using the `children` prop. Example: [demo](https://yifanai.com/rgc), [code](https://yifanai.com/rgc1). Note: it (they) will be placed only if the 'images' prop is falsy.

### Q: Why the element and font in my carousel is different from the one on the demo?
A: There are some browser default styles. Set a font, some global styles and/or use normalize.css will help. Example: [code](https://yifanai.com/rgcc).

### Q: Can I remove hash from generated file names? How to do it?
A: Yes. In ```node_modules/microbundle-crl/dist/microbundle.js```, Change ```useHash: true``` to ```useHash: false```.

### Q: Are there TypeScript type definitions for this package?
A: Yes. [```@types/react-gallery-carousel```](https://www.npmjs.com/package/@types/react-gallery-carousel) package contains type definitions for ```react-gallery-carousel``` through DefinitelyTyped.

## Roadmap
- [x] Support for dynamic images (since v0.1.1)
- [x] Support handlers and listeners (since v0.2.0)
- [x] Add TypeScript type Definitions (since v0.2.0)
- [x] Support for server-side rendering (since v0.2.3)
- [x] Momentum-based mouse dragging on thumbnails (since v0.2.4)
- [ ] Implement more unit tests and E2E tests
- [ ] Use TypeScript
- [ ] GitHub Actions
- [ ] Allow customization through render props

## Contributing

Issues and pull requests are welcomed.

(Note: please use Prettier for code formatting.)

## Local Development

1. In a terminal tab, run rollup to watch the `src/` directory and to automatically compile the local version of `react-gallery-carousel` into the `dist/` directory. (Note: the compilation does not minify the package for readability. The decision on minification is left to the developer users).

```bash
yarn start
```

2. In another terminal tab, run create-react-app dev server to serve the example in the `example/` directory, which is dependent on the local version of `react-gallery-carousel`.

```bash
cd example
yarn start
```

(Note: it is not helpful to run either of these commands in the background, because you will miss out on errors and warnings.)

## License

MIT © [Yifan Ai](https://yifanai.com)
