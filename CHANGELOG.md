# ```react-gallery-carousel```

[![NPM](https://img.shields.io/npm/v/react-gallery-carousel.svg)](https://www.npmjs.com/package/react-gallery-carousel)

## v0.4.0 (2023-01-28)

### Enhancements

- Add support for custom elements.

- Improve format in the README file.

## v0.3.0 (2022-10-15)

### Bug Fixes

- Fix issue related to maximizing/minimizing not working when shouldMaximizeOnClick/shouldMinimizeOnClick is on, for Toggle Device Toolbar (simulated mobile devices).
  ([Issue #74](https://github.com/yifaneye/react-gallery-carousel/issues/74))

- Fix issue related to `npm install` not working for `/example`.
  ([Issue #72](https://github.com/yifaneye/react-gallery-carousel/issues/72))

### Enhancements

- Update package dependencies. ([Issue #71](https://github.com/yifaneye/react-gallery-carousel/issues/71))

## v0.2.10 (2022-08-03)

### Enhancements

- Add react 18 to peer dependencies.

## v0.2.9 (2022-01-30)

### Bug Fixes

- Third attempt to fix swiping stuck after zoom issue.
  ([Issue #44](https://github.com/yifaneye/react-gallery-carousel/issues/44))

## v0.2.8 (2021-12-23)

### Bug Fixes

- Second attempt to fix swiping stuck after zoom issue.
  ([Issue #44](https://github.com/yifaneye/react-gallery-carousel/issues/44))

### Enhancements

- Simplify Gatsby example

## v0.2.7 (2021-12-18)

### Enhancements

- Fix "invalid or unexpected token" issue in Next.js.
  ([Issue #51](https://github.com/yifaneye/react-gallery-carousel/issues/51))

- Remove request to "object Object"
  ([Issue #52](https://github.com/yifaneye/react-gallery-carousel/issues/52))

## v0.2.6 (2021-12-06)

### Enhancements

- Fix swiping stuck after zoom issue.
  ([Issue #44](https://github.com/yifaneye/react-gallery-carousel/issues/44))

- Remove title for icons.
  ([Issue #60](https://github.com/yifaneye/react-gallery-carousel/issues/60))

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
