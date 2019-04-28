import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Text, ImageBackground } from "react-native";
import { PowerTranslator } from "react-native-power-translator";
import Icon from "react-native-vector-icons/MaterialIcons";

const Header = ({
  french,
  height,
  backgroundColor,
  shadow,
  title,
  titleColor,
  leftIcon,
  leftIconOnPress,
  rightIcon,
  rightIconOnPress,
  rightIconText
}) => {
  return (
    <ImageBackground
      style={{ width: "100%", height: height }}
      source={require("./../../images/header-background.png")}>

      <View
        style={[
          {
            height: height,
            position: "relative",
            flexDirection: "row",
            justifyContent: "space-between"
          },
          shadow ? shadowObj : null
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {leftIcon ? (
            <TouchableOpacity
              style={{
                width: 50,
                height: height,
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={leftIconOnPress}
            >
              <Icon name={leftIcon} size={40} color={titleColor} />
            </TouchableOpacity>
          ) : null}
          {french ? (
            <PowerTranslator
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: titleColor,
                marginHorizontal: 20
              }}
              text={title}
            />
          ) : (
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: titleColor,
                  marginHorizontal: 20,
                }}
              >
                {title}
              </Text>
            )}
        </View>

        {rightIcon || rightIconText ? (
          <TouchableOpacity
            style={{
              width: 120,
              height: height,
              alignItems: "flex-end",
              justifyContent: "center",
              alignSelf: "flex-end"
            }}
            onPress={rightIconOnPress}
          >
            {!rightIconText ? (
              <Icon name={rightIcon} size={30} color={titleColor} />
            ) : french ? (
              <PowerTranslator
                style={{ color: { titleColor }, marginRight: 10 }}
                text={rightIconText}
              />
            ) : (
                  <Text style={{ color: titleColor, marginRight: 10 }}>
                    {rightIconText}
                  </Text>
                )}
          </TouchableOpacity>
        ) : null}
      </View>
    </ImageBackground>
  );
};

const shadowObj = {
  shadowColor: "#1e1e1e",
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.2,
  elevation: 2
};

Header.propTypes = {
  french: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  shadow: PropTypes.bool.isRequired,
  title: PropTypes.string,
  titleColor: PropTypes.string.isRequired,
  leftIcon: PropTypes.string,
  leftIconOnPress: PropTypes.func,
  rightIcon: PropTypes.string,
  rightIconOnPress: PropTypes.func
};

Header.defaultProps = {
  french: false,
  height: 60,
  backgroundColor: "#FFF",
  shadow: true,
  titleColor: "#1e1e1e"
};

export default Header;
