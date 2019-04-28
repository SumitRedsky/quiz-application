import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

const CText = ({
  numberOfLines,
  bold,
  color,
  fontSize,
  marginVertical,
  textAlign,
  style,
  children,
  justifyContent,
  alignSelf
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          justifyContent: justifyContent,
          alignSelf: alignSelf,
          color: color,
          fontSize: fontSize,
          fontWeight: bold ? "bold" : null,
          marginVertical: marginVertical,
          textAlign: textAlign
        },
        style
      ]}
    >
      {children}
    </Text>
  );
};

CText.propsTypes = {
  numberOfLines: PropTypes.number.isRequired,
  bold: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  marginVertical: PropTypes.number,
  textAlign: PropTypes.string,
  alignSelf: PropTypes.string,
  justifyContent: PropTypes.string
};

CText.defaultProps = {
  numberOfLines: null,
  color: "#1E1E1E",
  bold: false
};

export default CText;
