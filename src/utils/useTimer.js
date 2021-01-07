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

  const start = () => timer && timer.start();
  const stop = () => timer && timer.stop();
  const restart = () => timer && timer.restart();

  useEffect(() => {
    start();

    return () => {
      stop();
    };
  }, []);

  return [start, stop, restart];
};

export default useTimer;
