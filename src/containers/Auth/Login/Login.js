import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Image, ImageBackground, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import {
  Container,
  Content,
  Card,
  Button,
  InputText,
  Text
} from "./../../../materialComponents";
import { FBLoginManager } from "react-native-facebook-login";
import styles from "./LoginStyle";

import { _showSnack } from "./../../../store/actions/snack_actions";
import { _login, fbLogin } from "./../../../store/actions/auth_actions";

mapStateToProps = state => {
  return {
    isLoggedIn: state.Auth.isLoggedIn
  };
};
mapDispatchToProps = dispatch => {
  return {
    _showSnack: (type, msg) => dispatch(_showSnack(type, msg)),
    _login: user => dispatch(_login(user)),
    fbLogin: userData => dispatch(fbLogin(userData))
  };
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loader: false,
      loading: false,
      secureTextEntry: true
    };
    // StatusBar.setTranslucent(true);
    StatusBar.setHidden(true);
  }
  // for move to another screen
  _handleRoute = route => {
    const { navigation } = this.props;
    navigation.navigate(route);
  };

  // first parameter for fieldName
  // second parameter if true so its remove white space
  // third parameter for inpput event
  _handleInputValue = async (fieldName, space, event) => {
    let value = event.nativeEvent.text;
    space ? (value = value.replace(/\s/g, "")) : null;
    await this.setState({ [fieldName]: value });
  };

  // for firbase login
  _handleLogin = async () => {
    const { _showSnack, _login, navigation } = this.props;
    const { email, password } = this.state;
    if (email !== "" && password.length >= 6) {
      let user = { email, password };
      try {
        this.setState({ loader: true });
        await _login(user);
        navigation.navigate("Home");
        _showSnack("success", "LogIn SuccessFull");
      } catch ({ message }) {
        _showSnack("error", message);
        this.setState({ loader: false });
      }
    } else if (email === "") {
      // _showSnack("error", "Please Enter Email");
      _showSnack("error", "Incorrect username / password entered. Please try again.")
    } else if (password === "") {
      // _showSnack("error", "Please Enter password");
      _showSnack("error", "Incorrect username / password entered. Please try again.")
    } else if (password.length < 6) {
      _showSnack("error", "password Must Be 5 Digits");
    } else {
      _showSnack("error", "Something went wrong!");
    }
  };

  _showPassword = async () => {
    const secureTextEntry = !this.state.secureTextEntry;
    this.setState({ secureTextEntry: secureTextEntry });
  }

  // for facebook login
  _handleLoginWithFaceBook = async () => {
    const { loading } = this.state;
    const { fbLogin, _showSnack } = this.props;
    if (!loading) {
      this.setState({ loading: true });
      FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web);
      FBLoginManager.loginWithPermissions(
        ["public_profile", "user_friends", "email"],
        async (error, data) => {
          if (!error) {
            await fbLogin(data);
            this.setState({ loading: false });
          } else {
            // _showSnack("error", error.message);
            _showSnack("error", "Something went wrong!");
            this.setState({ loading: false });
          }
        }
      );
    }
  };

  render() {
    const { email, password, loader, loading } = this.state;
    const {
      ContentStyle,
      LogoImageStyle,
      ButtonContainer,
      SimpleHeadingText,
      InputLogo,
      FacebookLoginContainer,
      FacebookLogo,
      FacebookLoginText,
      RegistrationContainer,
      RegistrationText,
      RegistrationLink
    } = styles;

    return (
      <Container>
        <Content style={ContentStyle}>
          {/* <StatusBar
            backgroundColor="blue"
            barStyle="light-content"
            hidden={true}></StatusBar> */}
          <Image
            style={LogoImageStyle}
            source={require("./../../../images/logo.png")}
          />
          <Text style={SimpleHeadingText}>Log in</Text>

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
          <Card height={50} borderRadius={30} marginTop={15}>
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
            title="Login"
            loader={loader}
            onPress={this._handleLogin}
            backgroundColor="rgb(34,150,234)"
            color="#FFFFFF"
            borderRadius={25}
          />
          <TouchableOpacity
            style={FacebookLoginContainer}
            onPress={this._handleLoginWithFaceBook}
          >
            <Image
              style={FacebookLogo}
              source={require("./../../../images/facebook.png")}
            />
            <Text style={FacebookLoginText}>Log in With Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={RegistrationContainer}
            onPress={() => this._handleRoute("Registration")}
          >
            <Text style={RegistrationText}>Don’t have an account? </Text>
            <Text style={RegistrationLink}>Registration</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
