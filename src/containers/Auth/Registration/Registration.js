import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Image, TouchableOpacity, StatusBar } from "react-native";
import {
  Card,
  Button,
  InputText,
  Content,
  Container,
  Text
} from "./../../../materialComponents";
import styles from "./RegistrationStyle";

import { _showSnack } from "./../../../store/actions/snack_actions";
import { _signup } from "./../../../store/actions/auth_actions";

mapStateToProps = state => {
  return {};
};
mapDispatchToProps = dispatch => {
  return {
    _showSnack: (type, msg) => dispatch(_showSnack(type, msg)),
    _signup: user => dispatch(_signup(user))
  };
};

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      loader: false,
      secureTextEntry: true
    };
    StatusBar.setTranslucent(true);
  }

  // first parameter for fieldName
  // second parameter if true so its remove white space
  // third parameter for inpput event
  _handleInputValue = async (fieldName, space, event) => {
    let value = event.nativeEvent.text;
    space ? (value = value.replace(/\s/g, "")) : null;
    await this.setState({ [fieldName]: value });
  };

  _showPassword = async () => {
    const secureTextEntry = !this.state.secureTextEntry;
    this.setState({ secureTextEntry: secureTextEntry });
  }

  _handleRegistration = async () => {
    const { _showSnack, _signup, navigation } = this.props;
    const { name, email, password } = this.state;
    if (name !== "" && email !== "" && password.length >= 6) {
      let user = { name, email, password };
      try {
        this.setState({ loader: true });
        await _signup(user);
        _showSnack("success", "You've successfully registered.");
      } catch ({ message }) {
        _showSnack("error", message);
        this.setState({ loader: false });
      }
    } else if (name === "") {
      _showSnack("error", "Please fill out all fields correctly");
    } else if (email === "") {
      _showSnack("error", "Please fill out all fields correctly.");
    } else if (password === "") {
      _showSnack("error", "Please fill out all fields correctly.");
    } else if (password.length < 6) {
      _showSnack("error", "Password must be 5 digits");
    } else {
      _showSnack("error", "Something went wrong!");
    }
  };

  // for move to another screen
  _handleRoute = route => {
    const { navigation } = this.props;
    navigation.navigate(route);
  };

  render() {
    const { name, email, password, loader } = this.state;
    const {
      ContentStyle,
      LogoImageStyle,
      SimpleHeadingText,
      LoginContainer,
      LoginText,
      InputLogo,
      LoginLink
    } = styles;
    return (
      <Container>
        <Content style={ContentStyle}>
          <Image
            style={LogoImageStyle}
            source={require("./../../../images/logo.png")}
          />
          <Text style={SimpleHeadingText}>Create Account</Text>
          <Card height={50} borderRadius={30} marginTop={20}>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center"
              }}
            >
              <InputText
                // iconName="person"
                color="#4a4a4a"
                placeholder="Full Name"
                value={name}
                onChange={event => this._handleInputValue("name", false, event)}
              />
              <Image
                style={InputLogo}
                source={require("./../../../images/man-user.png")}
              />
            </View>
          </Card>
          <Card height={50} borderRadius={30} marginTop={20}>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center"
              }}
            >
              <InputText
                // iconName="email"
                color="#4a4a4a"
                placeholder="Email"
                value={email}
                onChange={event => this._handleInputValue("email", true, event)}
              />
              <Image
                style={InputLogo}
                source={require("./../../../images/email.png")}
              />
            </View>
          </Card>
          <Card height={50} borderRadius={30} marginTop={20}>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center"
              }}
            >
              <InputText
                // iconName="vpn-key"
                color="#4a4a4a"
                placeholder="Password"
                value={password}
                onChange={event =>
                  this._handleInputValue("password", true, event)
                }
                secureTextEntry={this.state.secureTextEntry}
              />
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  justifyContent: "center"
                }}
                onPress={this._showPassword}
              >
                <Image
                  style={InputLogo}
                  source={require("./../../../images/show-password.png")}
                />
              </TouchableOpacity>
            </View>
          </Card>
          <Button
            fullSize
            height={50}
            marginTop={20}
            title="Register"
            loader={loader}
            onPress={this._handleRegistration}
            backgroundColor="rgb(34,150,234)"
            color="#FFFFFF"
            borderRadius={25}
          />
          <TouchableOpacity
            style={LoginContainer}
            onPress={() => this._handleRoute("Login")}
          >
            <Text style={LoginText}>Have an account? </Text>
            <Text style={LoginLink}>Log in</Text>
          </TouchableOpacity>
          {/* <Button
            fullSize
            marginVertical={10}
            title="Login"
            onPress={() => this._handleRoute("Login")}
            backgroundColor="#ABB7B7"
            color="#FFFFFF"
          /> */}
        </Content>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
