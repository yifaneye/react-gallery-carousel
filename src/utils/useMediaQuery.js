import { useEffect, useState } from 'react';
import isSSR from './isSSR';

const useMediaQuery = (query) => {
  const mediaQueryList = !isSSR && window.matchMedia(query);
  const [matches, setMatches] = useState(mediaQueryList.matches);

  useEffect(() => {
    const callback = () => setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener
      ? mediaQueryList.addEventListener('change', callback)
      : window.addEventListener('resize', callback);

    return () =>
      mediaQueryList.removeEventListener
        ? mediaQueryList.removeEventListener('change', callback)
        : window.removeEventListener('resize', callback);
  }, [mediaQueryList]);

  return matches;
};

export default useMediaQuery;
