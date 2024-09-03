import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../features/theme/themeActions';
import { darkTheme, lightTheme } from '../utils/theme'
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeSwitcherContainer } from './ThemeSwitcherContainer';
import { Slider } from './Slider';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.currentTheme);

  const toggleTheme = () => {
    let newTheme;
    if (JSON.stringify(theme) === JSON.stringify(lightTheme)) {
      newTheme = darkTheme;
    } else {
      newTheme = lightTheme;
    }
    dispatch(setTheme(newTheme));
  };

  return (
    <ThemeSwitcherContainer background={'#6c757d'} onClick={toggleTheme}>
      <Slider background={JSON.stringify(theme) === JSON.stringify(lightTheme) ? '#fcbf49' : '#000000'}
        isDarkMode={JSON.stringify(theme) === JSON.stringify(darkTheme)}>
        {JSON.stringify(theme) === JSON.stringify(lightTheme) ? <FaSun /> : <FaMoon />}
      </Slider>
    </ThemeSwitcherContainer>
  );
};

export default ThemeSwitcher;
