import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    const { active } = this.state;
    const {
      labelSize,
      labelColor,
      label,
      backgroundColor,
      iconName,
      placeholder,
      placeholderTextColor,
      value,
      onChange,
      onChangeText,
      secureTextEntry,
      multiline,
      editable,
      keyboardType,
      color
    } = this.props;
    return (
      <View style={{ marginVertical: 5, width: "90%" }}>
        {label ? (
          <Text style={{ fontSize: labelSize, color: labelColor }}>
            {label}
          </Text>
        ) : null}
        <View
          style={{
            backgroundColor: editable ? backgroundColor : "#DEDEDE",
            borderWidth: 0,
            borderColor: active ? "#3DBA81" : "#CECECE",
            borderRadius: 25,
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10,
            height: 50
          }}
        >
          {iconName ? (
            <View
              style={{
                padding: 8
              }}
            >
              <Icon name={iconName} style={{ fontSize: 20 }} />
            </View>
          ) : null}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              paddingHorizontal: 5
            }}
          >
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={editable ? placeholderTextColor : "#575757"}
              value={value}
              onChange={onChange}
              onChangeText={onChangeText}
              onFocus={() => this.setState({ active: true })}
              onBlur={() => this.setState({ active: false })}
              autoCorrect={false}
              secureTextEntry={secureTextEntry}
              underlineColorAndroid="transparent"
              multiline={multiline}
              editable={editable}
              keyboardType={keyboardType}
              style={{
                fontSize: 17,
                color: color,
                paddingVertical: 8
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

InputText.propTypes = {
  labelSize: PropTypes.number,
  labelColor: PropTypes.string,
  label: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  placeholder: PropTypes.any.isRequired,
  placeholderTextColor: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool.isRequired,
  multiline: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  keyboardType: PropTypes.string,
  color: PropTypes.string
};

InputText.defaultProps = {
  labelColor: "#696969",
  backgroundColor: "transparent",
  placeholder: "",
  value: null,
  secureTextEntry: false,
  multiline: false,
  editable: true
};
export default InputText;
