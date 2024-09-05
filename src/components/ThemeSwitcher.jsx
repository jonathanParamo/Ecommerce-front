import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../features/theme/themeActions';
import { darkTheme, lightTheme } from '../utils/theme';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeSwitcherContainer } from '../utils/themeSwitcherContainer';
import { Slider } from './Slider';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.currentTheme);

  const isLightTheme = theme === lightTheme;

  const toggleTheme = () => {
    const newTheme = isLightTheme ? darkTheme : lightTheme;
    dispatch(setTheme(newTheme));
  };

  return (
    <ThemeSwitcherContainer
      $background={isLightTheme ? '#000000' : 'rgb(232 121 249)'}
      onClick={toggleTheme}
    >
      <Slider
        $background={isLightTheme ? '#fcbf49' : '#000000'}
        $color={isLightTheme ? '#000000' : '#fcbf49'}
        $isDarkMode={!isLightTheme}
      >
        {isLightTheme ? <FaSun /> : <FaMoon />}
      </Slider>
    </ThemeSwitcherContainer>
  );
};

export default ThemeSwitcher;
