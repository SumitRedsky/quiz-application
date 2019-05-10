import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Platform,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Switch,
  ImageBackground,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import {
  Container,
  Content,
  Header,
  Card,
  InputText
} from "./../../../materialComponents";
import styles from "./HomeStyle";
import {
  retrieveMockQuestions,
  retrievePracticeQuestions
} from "../../../store/actions/quiz_actions";
import { _showSnack } from "./../../../store/actions/snack_actions";
import { _logout } from "../../../store/actions/auth_actions";
import { MOCK_QUESTIONS } from "../../../store/actionTypes";
import { PowerTranslator } from "react-native-power-translator";
import { CHANGE_LANGUAGE } from "../../../store/actionTypes";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

mapStateToProps = state => {
  return {
    state: state.Quiz,
    french: state.Lang.french
  };
};
mapDispatchToProps = dispatch => {
  return {
    retrieveMockQuestions: () => dispatch(retrieveMockQuestions()),
    retrievePracticeQuestions: () => dispatch(retrievePracticeQuestions()),
    _showSnack: () => dispatch(_showSnack()),
    logout: () => dispatch(_logout()),
    setMockQues: ques =>
      dispatch({ type: MOCK_QUESTIONS, payload: { mockQuestions: ques } }),
    changeLang: bool => dispatch({ type: CHANGE_LANGUAGE, payload: bool })
  };
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      frenchVersion: false,
      userName: ""
    };
    StatusBar.setTranslucent(true);
  }
  async componentDidMount() {
    const {
      retrieveMockQuestions,
      retrievePracticeQuestions,
      _showSnack,
      setMockQues
    } = this.props;
    try {
      const userJson = await AsyncStorage.getItem('_user');
      const userName = await AsyncStorage.getItem("userName");
      userName = userName.replace(/"/g, "");
      this.setState({ userName: userName });
      const user = JSON.parse(userJson);
      const practiceQuestionsArray = await retrievePracticeQuestions();
      const mockQuestionsArray = await retrieveMockQuestions();
      const shuffledArray = [...mockQuestionsArray];
      // shuffling
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        let a, b;
        const randomNumber = Math.floor(Math.random() * (i + 1));
        a = shuffledArray[i];
        b = shuffledArray[randomNumber];
        shuffledArray[i] = b;
        shuffledArray[randomNumber] = a;
      }
      //
      const fortyQues = shuffledArray.slice(0, 40);
      setMockQues(fortyQues);
      this.setState({
        practiceQuestionsArray,
        mockQuestionsArray: fortyQues,
        loading: false
      });
    } catch (e) {
      this.setState({ loading: false });
      _showSnack(e.message);
    }
  }

  // for move to another screen
  _handleRoute = route => {
    const { navigation } = this.props;
    navigation.navigate(route);
  };
  handleLang = () => {
    this.props.changeLang(!this.props.french);
  };
  render() {
    const {
      ImageBackgroundStyle,
      MainContainer,
      SimpleCard,
      SimpleCardText,
      SimpleNameText,
      HeaderContainer,
      HeaderText,
      LogoutButton,
      SimpleHeaderText,
      OptionsContainer,
      ButtonStyles,
      ButtonHeadingContainer,
      ButtonBottomLineContainer,
      ButtonLogoStyle,
      SimpleBottomLineText,
      MockBackgroundImage,
      PracticeBackgroundImage
    } = styles;
    const { loading, practiceQuestionsArray, mockQuestionsArray } = this.state;
    const { navigation, french } = this.props;
    return (
      <Container>
          {/* <Header
          title={french ? "Accueil" : "Home"}
          rightIconText={french ? "Déconnecter" : "Logout"}
          rightIconOnPress={() => this.props.logout()}
        /> */}
          <Content padding={0}>
            <ImageBackground
              style={ImageBackgroundStyle}
              source={require("./../../../images/background.png")}
            >
              {/* french langauge support */}
              {/* <View style={OptionsContainer}>
                        {
                            french ? (<Text>Version française:</Text>) : (<Text>French Version:</Text>)
                        }

                        <Switch onValueChange={() => this.handleLang()} value={french} />
                    </View> */}

              <View style={MainContainer}>
                <View style={HeaderContainer}>
                  <View style={HeaderText}>
                    {french ? (
                      <Text style={SimpleHeaderText}>Accueil</Text>
                    ) : (
                        <Text style={SimpleHeaderText}>Home</Text>
                      )}
                  </View>
                  <View style={LogoutButton}>
                    <TouchableOpacity
                      onPress={() => this.props.logout()}
                    >
                      {french ? (
                        <Text style={SimpleHeaderText}>Déconnecter</Text>
                      ) : (
                          <Text style={SimpleHeaderText}>Logout</Text>
                        )}
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
                  <Text style={SimpleNameText}>Hi, </Text>
                  <Text style={SimpleNameText}>{this.state.userName}</Text>
                </View>

                <ImageBackground
                  style={PracticeBackgroundImage}
                  source={require("./../../../images/car.png")}
                >
                  <TouchableOpacity
                    disabled={loading}
                    onPress={() => this._handleRoute("Categories")}
                    style={SimpleCard}
                  >

                    <View style={ButtonHeadingContainer}>
                      <Image
                        style={ButtonLogoStyle}
                        source={require("./../../../images/question.png")}
                      />
                      {french ? (
                        <Text style={SimpleCardText}>Théorie de la pratique</Text>
                      ) : (
                          <Text style={SimpleCardText}>Practice Theory</Text>
                        )}
                    </View>
                    <View style={ButtonBottomLineContainer}>
                      <Text style={SimpleBottomLineText}>
                        It only takes about 3 minutes of your time
                    </Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <ImageBackground
                  style={MockBackgroundImage}
                  source={require("./../../../images/gearbox.png")}
                >
                  <TouchableOpacity
                    disabled={loading}
                    onPress={() =>
                      navigation.navigate("MockTest", {
                        questionsArray: mockQuestionsArray
                      })
                    }
                    // onPress={() =>
                    //   navigation.navigate("Result")
                    // }
                    style={SimpleCard}
                  >

                    <View style={ButtonHeadingContainer}>
                      <Image
                        style={ButtonLogoStyle}
                        source={require("./../../../images/timer.png")}
                      />
                      {french ? (
                        <Text style={SimpleCardText}>Théorie de simulacre</Text>
                      ) : (
                          <Text style={SimpleCardText}>Mock Theory</Text>
                        )}
                    </View>
                    <View style={ButtonBottomLineContainer}>
                      <Text style={SimpleBottomLineText}>
                        It only takes about 5 minutes of your time
                  </Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              {loading ? (
                <ActivityIndicator
                  style={{ marginBottom: 20 }}
                  size={Platform.OS === "android" ? 40 : null}
                  color="#FFF"
                />
              ) : null}
            </ImageBackground>
          </Content>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
