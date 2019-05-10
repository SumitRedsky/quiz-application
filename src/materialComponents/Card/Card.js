import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ScrollView, TouchableOpacity } from "react-native";

const Card = ({
  onPress,
  backgroundColor,
  shadow,
  borderRadius,
  borderLeft,
  style,
  children,
  marginTop,
  marginBottom,
  height,
  width
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        {
          height: height,
          width: width,
          justifyContent: "center",
          alignSelf: "center",
          marginTop: marginTop,
          marginBottom: marginBottom,
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
          borderLeftWidth: borderLeft ? 5 : null,
          borderLeftColor: borderLeft ? "#21A24F" : null
        },
        shadow ? shadowObj : null,
        style
      ]}
    >
      {children}
      {/* <ScrollView>
        <View
          style={{
            padding: padding
          }}
        >
          {children}
        </View>
      </ScrollView> */}
    </TouchableOpacity>
  );
};

const shadowObj = {
  //   shadowColor: "#1e1e1e",
  shadowColor: "rgba(142, 142, 142, 0.2)",
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.8,
  elevation: 2
};

Card.propTypes = {
  onPress: PropTypes.func,
  backgroundColor: PropTypes.string.isRequired,
  borderRadius: PropTypes.number,
  borderLeft: PropTypes.bool.isRequired,
  shadow: PropTypes.bool.isRequired,
  style: PropTypes.object,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number
};
Card.defaultProps = {
  backgroundColor: "#FFFFFF",
  borderRadius: 0,
  borderLeft: false,
  shadow: true
};

export default Card;
