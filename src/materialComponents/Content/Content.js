import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";

const Content = ({
  height,
  paddingHorizontal,
  paddingTop,
  paddingBottom,
  backgroundColor,
  center,
  style,
  children
}) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={[
            {
              flex: 1,
              height: height,
              paddingHorizontal: paddingHorizontal,
              paddingTop: paddingTop,
              paddingBottom: paddingBottom,
              backgroundColor: backgroundColor,
              justifyContent: center ? "center" : null,
              alignItems: center ? "center" : null
            },
            style
          ]}
        >
          {children}
        </View>
      </ScrollView>
    </View>
  );
};

Content.propTypes = {
  height: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  backgroundColor: PropTypes.string.isRequired,
  center: PropTypes.bool.isRequired,
  style: PropTypes.object
};

Content.defaultProps = {
  backgroundColor: "#F4F5F7",
  center: false
};

export default Content;
