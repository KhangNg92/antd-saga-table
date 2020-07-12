import React, { useEffect } from "react";
import Home from "./containers/Home";
import { useDispatch, useSelector } from "react-redux";
import { getConfigStart } from "./redux/slices/configSlice";
import { ThemeProvider } from "styled-components";
import Toggle from "./components/Toggle";
import { RootState } from "./redux/store";
import { lightTheme, darkTheme } from "./utils/constants";
import { GlobalStyles } from "./utils/GlobalStyles";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConfigStart());
  }, [dispatch]);

  const themeProps = useSelector((state: RootState) => state.utils.theme);
  const themeSwitched = themeProps === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeSwitched}>
      <GlobalStyles />
      <Toggle />
      <Home />
    </ThemeProvider>
  );
}

export default App;
