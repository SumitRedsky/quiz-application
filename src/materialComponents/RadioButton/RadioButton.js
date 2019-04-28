import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { PowerTranslator } from "react-native-power-translator";
import renderIf from "./../../containers/Quiz/renderIf"

const selectedRadio = require("./../../images/selected-radio.png");
const unselectedRadio = require("./../../images/unselected-radio.png");

const RadioButton = ({
  french,
  onPress,
  value,
  currentValue,
  backgroundColor,
  radioSource
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingVertical: 15,
        borderRadius: 60,
        height: 60,
        backgroundColor:
          value === currentValue ? backgroundColor : "rgba(255,255,255,0.1)",
      }}
      activeOpacity={1}
      onPress={() => onPress(value)}
    >
      {renderIf(value === currentValue)(
        <Image
          source={radioSource}>
        </Image>
      )}
      {renderIf(!(value === currentValue))(
        <Image
          source={unselectedRadio}>
        </Image>
      )}
      {french ? (
        <PowerTranslator
          style={{ marginRight: 22, marginLeft: 10, fontSize: 17, color: "#4a4a4a" }}
          text={value}
        />
      ) : (
          <Text style={{ marginRight: 22, marginLeft: 10, fontSize: 17, color: "#4a4a4a" }}>
            {value}
          </Text>
        )}
    </TouchableOpacity>
  );
};
RadioButton.propTypes = {
  french: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  currentValue: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  radioSource: PropTypes.string.isRequired
};
RadioButton.defaultProps = {
  french: false,
  backgroundColor: "#4a82f5",
  radioSource: unselectedRadio
};
export default RadioButton;
