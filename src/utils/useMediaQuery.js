import { useEffect, useState } from 'react';

const useMediaQuery = (query) => {
  const mediaQueryList = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaQueryList.matches);

  useEffect(() => {
    const callback = () => setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', callback);

    return () => mediaQueryList.removeEventListener('change', callback);
  }, [mediaQueryList]);

  return matches;
};

export default useMediaQuery;
