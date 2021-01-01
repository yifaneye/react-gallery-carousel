import { useEffect } from 'react';

const getTimer = (interval, callback) => {
  const _interval = interval;
  const _callback = callback;
  let _timer;

  function start() {
    _timer = setInterval(_callback, _interval);
  }

  function stop() {
    _timer && clearInterval(_timer);
  }

  function restart() {
    stop();
    start();
  }

  return { start, stop, restart };
};

const useTimer = (interval, callback) => {
  const timer = interval ? getTimer(interval, callback) : null;

  useEffect(() => {
    timer && timer.start();

    return () => {
      timer && timer.stop();
    };
  }, []);

  return timer;
};

export default useTimer;
