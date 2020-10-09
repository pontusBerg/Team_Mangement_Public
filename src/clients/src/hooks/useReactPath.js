import React from 'react'

export const useReactPath = () => {
  const [path, setPath] = React.useState(window.location);
  const listenToPopstate = () => {
    const winPath = window.location;
    setPath(winPath);
  };
  React.useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    };
  }, []);
  return path;
};