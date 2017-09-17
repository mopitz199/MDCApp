import { StyleSheet } from 'react-native';

export const primaryNormalColor = "#1A237E";
export const primaryLightColor = "#5C6BC0";

export const primaryTextColor = "#616161";
export const secondaryTextColor = "#ffffff";
export const inactiveTextColor = "#BDBDBD";

export const borderColor = "rgb(217, 217, 217)";

export const successColor = "rgb(48, 181, 14)";
export const errorColor = "rgb(238, 83, 80)";

export const inputRequired = StyleSheet.flatten({
  enabled:{
    color: errorColor,
  }
});
