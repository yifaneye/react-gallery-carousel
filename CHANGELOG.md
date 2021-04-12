# v0.1

## In Development

### Bug Fixes

- Fixed a bug where touch swiping did not work on the slides when the images are dynamically set in the useEffect() hook by developer users.

### Enhancements

- Enhanced content, styles, responsiveness and performance (from 98% to 100%) on the [demo site](https://yifanai.com/rgc).

## v0.1.2 (2021-04-11)

### Bug Fixes

- Fixed a bug where the last slide is not displayed starting from the second loop when there are exactly 2 slides.

### Enhancements
- Removed the use of translate3d to make the performance consistent across browsers and platforms.
- Reduced the file size of the fallback image from 7.59 kB to 3.35 kB.
- Made the text displayed in the index board robuster.

## v0.1.1 (2021-04-10)

### Bug Fixes

- Fixed a bug where image URLs those are not known ahead of time cannot be placed into the carousel.

### Enhancements
- Enabled hitting Enter (Return) key on the focused thumbnail to display that image as the current image.
- Enabled selecting text in the index board using cursor or finger.
- Removed the effect of hover on thumbnails on touch devices.

## v0.1.0 (2021-03-31)

### Initial work

- Complete a dependency-free React carousel component with support for lazy loading, pinch zoom, touch swiping, mouse dragging, velocity detection, maximization, thumbnails, keyboard navigation and accessibility.
