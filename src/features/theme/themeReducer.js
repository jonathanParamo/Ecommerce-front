// src/redux/theme/themeReducer.js
import { SET_THEME } from './themeActions';
import { lightTheme, darkTheme } from '../../utils/theme';


const initialState = {
  currentTheme: darkTheme,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        currentTheme: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;
