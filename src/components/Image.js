import React, { useContext } from "react";
import DarkModeContext from '../context/DarkMode/Context';

const Image = ({ className, src, srcDark, srcSet, srcSetDark, alt }) => {
  const [darkMode] = useContext(DarkModeContext);

  return (
    <img
      className={className}
      srcSet={darkMode ? srcSetDark : srcSet}
      src={darkMode ? srcDark : src}
      alt={alt}
    />
  );
};

export default Image;
