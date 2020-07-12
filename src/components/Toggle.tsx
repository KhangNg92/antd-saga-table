import React, { useState } from "react";
import Switch from "react-switch";

// Style
import { StyleSheet, css } from "aphrodite";
import { sunIcon, nightIcon } from "../utils/icons";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { switchTheme } from "../redux/slices/utilsSlices";

const Toggle = () => {
  const [switchToggle, setSwitchToggle] = useState(false);
  const dispatch = useDispatch();
  const toggle = useSelector((state: RootState) => state.utils.toggle);

  const handleToggle = () => {
    setSwitchToggle(!switchToggle);
    dispatch(switchTheme(switchToggle));
  };

  return (
    <div className={css(styles.toggleContainer)}>
      <Switch
        onChange={handleToggle}
        width={70}
        checked={toggle}
        uncheckedIcon={sunIcon}
        checkedIcon={nightIcon}
        offColor="#eb8b31"
        onColor="#1c1c1b"
        activeBoxShadow="#1c1c1b"
      />
    </div>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    position: "absolute",
    right: 0,
    marginRight: "200px",
    marginTop: 20,
    borderWidth: 1
  }
});
export default Toggle;
