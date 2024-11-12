import React, {createContext, useState} from 'react';

interface ImageColors {
  primary: string;
  secondary: string;
}

interface ContextProps {
  colors: ImageColors;
  prevcolors: ImageColors;
  setMainColors: (colors: ImageColors) => void;
  setPrevMainColors: (colors: ImageColors) => void;
}
export const GradientContext = createContext({} as ContextProps); // TODO: definit tipo

export const GradientProvider = ({children}: any) => {
  const [colors, setColors] = useState<ImageColors>({
    primary: 'red',
    secondary: 'blue',
  });
  const [prevcolors, setPrevColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const setMainColors = (colors: ImageColors) => {
    setColors(colors);
  };
  const setPrevMainColors = (colors: ImageColors) => {
    setPrevColors(colors);
  };

  return (
    <GradientContext.Provider
      value={{
        colors,
        prevcolors,
        setMainColors,
        setPrevMainColors,
      }}>
      {children}
    </GradientContext.Provider>
  );
};
