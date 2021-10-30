```react-gallery-carousel```

[![NPM](https://img.shields.io/npm/v/react-gallery-carousel.svg)](https://www.npmjs.com/package/react-gallery-carousel)

## v0.2.5 (2021-10-30)

### Enhancements

- Added **support for custom children for the thumbnails**.
  ([Issue #40](https://github.com/yifaneye/react-gallery-carousel/issues/40))

- Enhanced docs.

## v0.2.4 (2021-08-22)

### Enhancements

- Enhanced docs.
  ([Issue #43](https://github.com/yifaneye/react-gallery-carousel/issues/43))

- Enhanced code and examples.
- Set up momentum-based mouse dragging on the thumbnails.

## v0.2.3 (2021-07-12)

### Enhancements

- Made the code robuster.
  ([Issue #31](https://github.com/yifaneye/react-gallery-carousel/issues/31))

- Enhanced docs.
  ([Issue #35](https://github.com/yifaneye/react-gallery-carousel/issues/35))

- Added **support for server-side rendering (SSR)**.
  ([Issue #36](https://github.com/yifaneye/react-gallery-carousel/issues/36))

- Enhanced examples.
  ([Issue #45](https://github.com/yifaneye/react-gallery-carousel/issues/45))

## v0.2.2 (2021-05-16)

### Enhancements

- Enhanced the documentation regarding user-managed slides.
  ([Issue #28](https://github.com/yifaneye/react-gallery-carousel/issues/28))

- Updated the [demo site](https://yifanai.com/rgc).

## v0.2.1 (2021-05-08)

### Bug Fixes

- Fixed issue where caption for an image always has vertical and horizontal scroll bars even they are not required.
  ([Issue #26](https://github.com/yifaneye/react-gallery-carousel/issues/26))

### Enhancements

- Enhanced content on the [demo site](https://yifanai.com/rgc).

- Enhanced examples and content in the [documentation](https://yifanai.com/rgc).
  ([Issue #28](https://github.com/yifaneye/react-gallery-carousel/issues/28))

## v0.2.0 (2021-05-02)

### Bug Fixes

- Fixed a bug where left and right keys do not work when a widget is focused by listening keydown events on the entire carousel.
  ([Issue #15](https://github.com/yifaneye/react-gallery-carousel/issues/15))

- Fixed a bug where swiping on a slide does not freeze autoplay countdown.
  ([Issue #18](https://github.com/yifaneye/react-gallery-carousel/issues/18))

### Enhancements

- Allowed the size of the thumbnails to be customized.
  ([Issue #11](https://github.com/yifaneye/react-gallery-carousel/issues/11))

- Added handlers and listeners to the carousel.
  ([Issue #12](https://github.com/yifaneye/react-gallery-carousel/issues/12))

- Enabled smooth transition on the thumbnails.
  ([Issue #13](https://github.com/yifaneye/react-gallery-carousel/issues/13))

- Added aria-live region for accessibility.

## v0.1.4 (2021-04-18)

### Bug Fixes

- Fixed a minor bug where required props is undefined by defining default props.
  ([Issue #7](https://github.com/yifaneye/react-gallery-carousel/issues/7))

### Enhancements

- Enhanced content and styles on the [demo site](https://yifanai.com/rgc).

## v0.1.3 (2021-04-12)

### Bug Fixes

- Fixed a bug where touch swiping did not work on the slides when the images are dynamically set in the useEffect() hook by developer users.
  ([Issue #5](https://github.com/yifaneye/react-gallery-carousel/issues/5))

### Enhancements

- Enhanced content, styles, responsiveness and performance (from 98% to 100%) on the [demo site](https://yifanai.com/rgc).

## v0.1.2 (2021-04-11)

### Bug Fixes

- Fixed a bug where the last slide is not displayed starting from the second loop when there are exactly 2 slides.
  ([Issue #2](https://github.com/yifaneye/react-gallery-carousel/issues/2))

### Enhancements

- Removed the use of translate3d to make the performance consistent across browsers and platforms.
- Reduced the file size of the fallback image from 7.59 kB to 3.35 kB.
- Made the text displayed in the index board robuster.

## v0.1.1 (2021-04-10)

### Bug Fixes

- Fixed a bug where image URLs those are not known ahead of time cannot be placed into the carousel.
  ([Issue #1](https://github.com/yifaneye/react-gallery-carousel/issues/1))

### Enhancements

- Enabled hitting Enter (Return) key on the focused thumbnail to display that image as the current image.
- Enabled selecting text in the index board using cursor or finger.
- Removed the effect of hover on thumbnails on touch devices.

## v0.1.0 (2021-03-31)

### Initial work

- Complete a dependency-free React carousel component with support for lazy loading, pinch zoom, touch swiping, mouse dragging, velocity detection, maximization, thumbnails, keyboard navigation and accessibility.
