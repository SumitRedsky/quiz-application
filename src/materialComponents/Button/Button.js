import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Platform
} from "react-native";
import { PowerTranslator } from "react-native-power-translator";
import Icon from "react-native-vector-icons/MaterialIcons";

const Button = ({
  french,
  fullSize,
  width,
  height,
  backgroundColor,
  paddingVertical,
  paddingHorizontal,
  marginVertical,
  marginTop,
  marginHorizontal,
  borderRadius,
  borderWidth,
  borderColor,
  onPress,
  style,
  iconName,
  loader,
  color,
  fontSize,
  bold,
  title,
  disabled
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          minWidth: fullSize ? "100%" : null,
          width: width,
          height: height,
          flexDirection: "row",
          backgroundColor: backgroundColor,
          paddingVertical: paddingVertical,
          paddingHorizontal: paddingHorizontal,
          marginVertical: marginVertical,
          marginTop: marginTop,
          marginHorizontal: marginHorizontal,
          borderRadius: borderRadius,
          borderWidth: borderWidth,
          borderColor: borderColor,
          justifyContent: "center",
          alignItems: "center",
          shadowOffset: { height: 2, width: 2 },
          shadowOpacity: 0.5,
          shadowColor: "#1E1E1E",
          // elevation: 3
        },
        style ? style : null
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {/* {iconName ? (
        <Icon name={iconName} style={{ color: color, fontSize: 20 }} />
      ) : null} */}
      {loader ? (
        <ActivityIndicator
          style={{ marginVertical: Platform.OS === "android" ? 0 : 10 }}
          size={Platform.OS === "android" ? fontSize + 5 : null}
          color={color}
        />
      ) : french ? (
        <PowerTranslator
          style={{
            width: "100%",
            textAlign: "center",
            color: color,
            fontSize: fontSize,
            fontWeight: bold ? "bold" : null,
            // marginLeft: iconName ? 5 : null
          }}
          text={title}
        />
      ) : (
            <Text
              style={{
                width: "100%",
                textAlign: "center",
                color: color,
                fontSize: fontSize,
                fontWeight: bold ? "bold" : null,
                // marginLeft: iconName ? 5 : null
              }}
            >
              {title}
            </Text>
          )}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  french: PropTypes.bool.isRequired,
  fullSize: PropTypes.bool.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  backgroundColor: PropTypes.string.isRequired,
  paddingVertical: PropTypes.number.isRequired,
  paddingHorizontal: PropTypes.number.isRequired,
  marginVertical: PropTypes.number,
  marginTop: PropTypes.number,
  marginHorizontal: PropTypes.number,
  borderRadius: PropTypes.number,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  iconName: PropTypes.string,
  loader: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  bold: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

Button.defaultProps = {
  french: false,
  fullSize: false,
  backgroundColor: "#CECECE",
  paddingVertical: 10,
  paddingHorizontal: 12,
  loader: false,
  color: "#1E1E1E",
  fontSize: 15,
  bold: false,
  title: ""
};

export default Button;
