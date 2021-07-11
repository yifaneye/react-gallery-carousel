// determine if the code is executed on a server (as oppose to a browser)
const isSSR = !(
  typeof window !== 'undefined' && window.document?.createElement
);

export default isSSR;
