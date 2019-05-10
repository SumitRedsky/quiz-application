import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  Platform,
  AsyncStorage,
  Dimensions,
  StatusBar
} from "react-native";
import {
  Container,
  Content,
  Header,
  Card,
  Button,
  Text,
  RadioButton
} from "./../../../materialComponents";
import { PowerTranslator, Translation } from "react-native-power-translator";
import styles from "./PraticalTestStyle";
import fb from "../../../firebase";
import { _showSnack } from "./../../../store/actions/snack_actions";

import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const selectedRadio = require("./../../../images/selected-radio.png");
const unselectedRadio = require("./../../../images/unselected-radio.png");

momentDurationFormatSetup(moment);

mapStateToProps = state => {
  return {
    french: state.Lang.french
  };
};
mapDispatchTo0Props = dispatch => {
  return {
    _showSnack: (type, msg) => dispatch(_showSnack(type, msg))
  };
};

class PracticalTest extends Component {
  constructor() {
    super();
    this.state = {
      questionNO: 0,
      selectedAnswer: "",
      selectedIndex: null,
      loading: true,
      checked: false,
      disabled: true,
      user: null,
      translatedQuestion: "",
      translatedChoices: [],
      imageLoaded: false,
      radioSource: unselectedRadio
    };
    StatusBar.setTranslucent(true);
  }
  componentWillMount() { }
  async componentDidMount() {
    const {
      categoryQuestions,
      userAttempted,
      type
    } = this.props.navigation.state.params;
    const { french } = this.props;
    const userJson = await AsyncStorage.getItem("_user");
    const user = JSON.parse(userJson);
    if (french) {
      this.getTranslated(
        categoryQuestions[
        userAttempted === categoryQuestions.length ? 0 : userAttempted
        ]
      );
    }
    this.setState({
      user,
      categoryQuestions,
      userAttempted,
      questionNO:
        userAttempted === categoryQuestions.length ? 0 : userAttempted,
      loading: french ? true : false,
      type,
      imageLoaded: categoryQuestions[
        userAttempted === categoryQuestions.length ? 0 : userAttempted
      ].file
        ? true
        : false
    });
  }
  // for move to another screen
  _handleRoute = (route, params) => {
    const { navigation } = this.props;
    if (params) {
      navigation.navigate(route, params);
    } else {
      navigation.navigate(route);
    }
  };

  _handleRadioValue = (selectedAnswer, selectedIndex) => {
    this.setState({ selectedAnswer, selectedIndex, disabled: false });
  };

  checkAnswer = () => {
    const { selectedIndex, categoryQuestions, questionNO } = this.state;
    this.setState({ checked: true });
  };
  // for previous question
  _handlePreviousQuestion = async () => {
    const { questionNO, categoryQuestions } = this.state;
    const { _showSnack, french } = this.props;
    if (questionNO !== 0) {
      if (french) {
        this.setState({ loading: true });
        await this.getTranslated(categoryQuestions[questionNO - 1]);
      }
      this.setState(prevState => ({
        questionNO: prevState.questionNO - 1
      }));
    } else {
      _showSnack("error", `Sorry You Can't Move to Previous Question`);
    }
  };

  // for next question
  _handleNextQuestion = async () => {
    const { questionNO, categoryQuestions, user, type } = this.state;
    const updatedUser = {
      ...user,
      userProgress: {
        ...user.userProgress,
        [type]: { attemptedQues: questionNO + 1 }
      }
    };
    fb.database()
      .ref("/users")
      .child(user.uid)
      .set(updatedUser)
    AsyncStorage.setItem("_user", JSON.stringify(updatedUser));
    if (categoryQuestions.length !== questionNO + 1) {
      this.setState(prevState => ({
        questionNO: prevState.questionNO + 1,
        checked: false,
        selectedAnswer: "",
        selectedIndex: null,
        disabled: true,
        imageLoaded: categoryQuestions[prevState.questionNO + 1].file
          ? true
          : false
      }));
    }
  };

  getTranslated = async question => {
    const translatedChoices = [];

    await Translation.get(question.question).then(translation => {
      this.setState({ translatedQuestion: translation });
    });

    await Promise.all(
      question.choices.map(async (choice, i) => {
        await Translation.get(question.choices[i]).then(transl => {
          translatedChoices[i] = transl;
        });
      })
    ).then(() => {
      this.setState({ translatedChoices, loading: false });
    });
  };

  render() {
    const {
      questionNO,
      selectedAnswer,
      loading,
      checked,
      disabled,
      translatedQuestion,
      translatedChoices,
      imageLoaded
    } = this.state;
    const { french, navigation } = this.props;
    const { navigate } = navigation;
    const { categoryQuestions } = this.props.navigation.state.params;
    const {
      HeaderContainerText,
      QuestionContainer,
      QuestionText,
      QuestionImageContainer,
      QuestionImage,
      AnswerContainer,
      ButtonContainer,
      TimerLogo
    } = styles;
    let choices = [];
    french
      ? (choices = translatedChoices)
      : categoryQuestions[questionNO]
        ? (choices = categoryQuestions[questionNO].choices)
        : null;
    return (
      <Container>
        <Header
          titleColor="#ffffff"
          title={french ? "Test de pratique" : "Practice Test"}
          leftIcon="keyboard-arrow-left"
          leftIconOnPress={() => this._handleRoute("Categories")}
        />
        <Content
          paddingHorizontal={15}
          paddingTop={15}
        >
          <View>
            {loading ? (
              <ActivityIndicator
                size={Platform.OS === "android" ? 40 : null}
                color="#000"
              />
            ) : (
                <View>
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <Text style={HeaderContainerText}>
                      Question No # {questionNO + 1}
                    </Text>
                  </View>
                  <View style={QuestionContainer}>
                    {french ? (
                      <Text style={QuestionText}>{translatedQuestion}</Text>
                    ) : (
                        <Text style={QuestionText}>
                          {categoryQuestions[questionNO].question}
                        </Text>
                      )}

                    {categoryQuestions[questionNO].file ? (
                      <View style={QuestionImageContainer}>
                        <Image
                          style={QuestionImage}
                          source={{ uri: categoryQuestions[questionNO].file }}
                          onLoadEnd={() => {
                            this.setState({ imageLoaded: false });
                          }}
                        />
                      </View>
                    ) : null}
                    <View style={AnswerContainer}>
                      {choices.map((answer, i) => {
                        if (answer) {
                          if (checked) {
                            return (
                              <Card height={60} borderRadius={30} marginBottom={10} width={width * 0.9}>
                                <RadioButton
                                  radioSource={selectedRadio}
                                  key={i}
                                  value={answer}
                                  currentValue={
                                    choices[
                                    categoryQuestions[questionNO].rightAnswer
                                    ]
                                  }
                                  // backgroundColor="#3DBA81"
                                  backgroundColor="#90ee90"
                                  onPress={() => null} />
                              </Card>
                            );
                          }
                          else {
                            return (
                              <Card height={60} borderRadius={30} marginBottom={10} width={width * 0.9}>
                                {this.state.selectedIndex != null ? (
                                  < RadioButton
                                    radioSource={selectedRadio}
                                    key={i}
                                    value={answer}
                                    currentValue={selectedAnswer}
                                    onPress={selected =>
                                      this._handleRadioValue(selected, i)
                                    }
                                  />
                                ) : (
                                    < RadioButton
                                      key={i}
                                      value={answer}
                                      currentValue={selectedAnswer}
                                      onPress={selected =>
                                        this._handleRadioValue(selected, i)
                                      }
                                    />
                                  )}
                              </Card>
                            );
                          }
                        }
                      })}
                    </View>
                  </View>
                </View>
              )}
          </View>
        </Content>
        <View style={ButtonContainer}>
          <Button
            width={100}
            color="#FFFFFF"
            title={french ? "pr�c�dent" : "Previous"}
            disabled={questionNO === 0 ? true : false}
            borderRadius={20}
            onPress={this._handlePreviousQuestion}
            backgroundColor="#44e7c4"
          />
          <Button
            width={100}
            title={french ? "Sauter" : "Skip"}
            color="#1E1E1E"
            borderRadius={20}
            onPress={this._handleNextQuestion}
            backgroundColor="#ABB7B7"
          />
          {!checked ? (
            <Button
              width={100}
              title={french ? "V�rifier" : "Check"}
              color="#FFFFFF"
              disabled={!imageLoaded ? (!disabled ? false : true) : true}
              borderRadius={20}
              onPress={this.checkAnswer}
              backgroundColor="#44e7c4"
            />
          ) : categoryQuestions.length === questionNO + 1 ? (
            <Button
              width={100}
              title={french ? "terminer" : "Finish"}
              color="#FFFFFF"
              borderRadius={20}
              onPress={() => {
                this._handleNextQuestion();
                navigate("Categories")
              }}
              backgroundColor="#44e7c4"
            />
          ) : (
                <Button
                  width={100}
                  title={french ? "Prochain" : "Next"}
                  color="#FFFFFF"
                  borderRadius={20}
                  onPress={this._handleNextQuestion}
                  backgroundColor="#44e7c4"
                />
              )}
        </View>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PracticalTest);
