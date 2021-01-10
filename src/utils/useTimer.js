import { useEffect, useState } from 'react';

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
  const [isRunning, setIsRunning] = useState(!!timer);

  const start = () => !!timer && timer.start();
  const stop = () => !!timer && timer.stop();

  useEffect(() => {
    if (isRunning) start();

    return () => {
      stop();
    };
  });

  return [isRunning, setIsRunning];
};

export default useTimer;
