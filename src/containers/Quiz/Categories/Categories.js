import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar
} from "react-native";
import {
  Container,
  Content,
  Header,
  Text,
  Card
} from "./../../../materialComponents";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { PowerTranslator } from "react-native-power-translator";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./CategoriesStyle";
import PayPal from "react-native-paypal-wrapper";
import fb from "../../../firebase";
import { _showSnack } from "./../../../store/actions/snack_actions";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const hazardImage = require("./../../../images/danger.png");
const parkingImage = require("./../../../images/parking.png");
const informationImage = require("./../../../images/turn-right.png");

mapStateToProps = state => {
  return {
    french: state.Lang.french,
    practiceQuestionsByCategory: state.Quiz.practiceQuestionsByCategory,
    practiceQuestions: state.Quiz.practiceQuestions
  };
};
mapDispatchToProps = dispatch => {
  return {
    _showSnack: (type, message) => dispatch(_showSnack(type, message))
  };
};

const categories = [
  {
    name: "hazard",
    image: hazardImage
  },
  {
    name: "parking",
    image: parkingImage
  },
  {
    name: "information",
    image: informationImage
  }
];

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProgress: {
        hazard: { attemptedQues: 0 },
        parking: { attemptedQues: 0 },
        information: { attemptedQues: 0 },
        all: { attemptedQues: 0 }
      }
    };
    StatusBar.setTranslucent(true);
  }
  async componentDidMount() {

    // 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
    PayPal.initialize(
      PayPal.NO_NETWORK,
      "asdasdasdasd-dfgsd--dsfsds-fdsasf-gjhglyg"
    );

    try {
      const { _showSnack } = this.props;
      const userJson = await AsyncStorage.getItem("_user");
      const userData = JSON.parse(userJson);
      const user = await fb
        .database()
        .ref("/users/")
        .child(userData.uid)
        .once("value");
      const { userProgress } = user.val();
      this.setState({ user: user.val() });
      if (userProgress) {
        this.setState({ userProgress });
      } else {
        this.updateUserProgress(this.state.userProgress);
      }
    } catch (e) {
      _showSnack(true, e.message);
    }
  }
  componentWillMount() { }

  updateUserProgress = async progress => {
    const { user } = this.state;
    await fb
      .database()
      .ref("/users/")
      .child(user.uid)
      .set({ ...user, userProgress: progress });
    await AsyncStorage.setItem(
      "_user",
      JSON.stringify({ ...user, userProgress: progress })
    );
  };
  // for move to another screen
  _handleRoute = (route, params) => {
    const { navigation } = this.props;
    if (params) {
      navigation.navigate(route, params);
    } else {
      navigation.navigate(route);
    }
  };
  _handleStartQuiz = (categoryQuestions, userAttempted, type) => {
    this._handleRoute("PracticalTest", {
      categoryQuestions,
      userAttempted,
      type
    });
  };

  handlePurchase = async () => {
    const { userProgress } = this.state;
    const { practiceQuestions, _showSnack } = this.props;
    try {
      await PayPal.pay({
        price: "40",
        currency: "USD",
        description: "Your description goes here"
      })
        .then(confirm => console.log(confirm))
        .catch(error => {
          throw new Error(error.message);
        });
      this._handleStartQuiz(
        practiceQuestions,
        userProgress.all.attemptedQues,
        "all"
      );
    } catch (e) {
      _showSnack(true, e.message);
    }
  };

  calculateProgress = (attempted, total) => {
    return Math.round((attempted * 100) / total);
  };

  render() {
    const { userProgress } = this.state;
    const {
      french,
      practiceQuestionsByCategory,
      practiceQuestions
    } = this.props;
    const allQuesProgrss = this.calculateProgress(
      userProgress.all.attemptedQues,
      practiceQuestions.length
    );
    const {
      List,
      ListItem,
      ListItemLeft,
      ListItemLeftText1,
      ListItemRight,
      ListItemRightCircle,
      ListItemRightArrowContainer,
      ProgressText,
      QuestionsStyle
    } = styles;
    return (
      <Container>

        <Header
          titleColor="#ffffff"
          title={french ? "Pratique par sujet" : "Practice by Topic"}
          leftIcon="keyboard-arrow-left"
          leftIconOnPress={() => this._handleRoute("Home")}
        />
        <Content padding={0}>
          <View style={List}>
            {categories.map((cat, i) => {
              const progress = this.calculateProgress(
                userProgress[cat.name].attemptedQues,
                practiceQuestionsByCategory[cat.name].length
              );
              let number = parseInt(userProgress[cat.name].attemptedQues);
              return (
                <Card width={width * 0.9} height={125} borderRadius={10} marginTop={10}>
                  <TouchableOpacity
                    style={ListItem}
                    key={i}
                    onPress={() => {
                      this._handleStartQuiz(
                        practiceQuestionsByCategory[cat.name],
                        userProgress[cat.name].attemptedQues,
                        cat
                      );
                    }}
                  >
                    {french ? (
                      <View style={ListItemLeft}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image source={cat.image}></Image>
                          <PowerTranslator style={ListItemLeftText1} text={cat.name} />
                        </View>
                        <Text>
                          Questions : {practiceQuestionsByCategory[cat.name].length}
                        </Text>
                        <Text>
                          Tentative: {userProgress[cat.name].attemptedQues}
                        </Text>
                      </View>
                    ) : (
                        <View style={ListItemLeft}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image source={cat.image}></Image>
                            <Text style={ListItemLeftText1}>
                              {cat.name.toLocaleUpperCase()}
                            </Text>
                          </View>
                          <Text style={QuestionsStyle}>
                            Questions : {practiceQuestionsByCategory[cat.name].length}
                          </Text>
                          <Text style={QuestionsStyle}>
                            Attempted : {userProgress[cat.name].attemptedQues}
                          </Text>
                        </View>
                      )}

                    <View style={ListItemRight}>
                      <View style={ListItemRightCircle}>
                        <ImageBackground
                          style={{ height: 101, width: 101 }}
                          source={require("./../../../images/oval.png")}>
                          <Card width={100} height={100} borderRadius={50}>
                            <AnimatedCircularProgress
                              size={100}
                              width={12}
                              fill={progress}
                              tintColor="#3DBA81"
                              backgroundColor="#ffffff"
                            >
                              {fill => (
                                <Text style={ProgressText}>{progress} %</Text>
                              )}
                            </AnimatedCircularProgress>
                          </Card>
                        </ImageBackground>
                      </View>
                      <View style={ListItemRightArrowContainer}>
                        <Icon name="keyboard-arrow-right" size={40} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </Card>
              );
            })}
            <Card width={width * 0.9} height={125} borderRadius={10} marginTop={10}>
              <TouchableOpacity
                style={ListItem}
                onPress={() => {
                  this.handlePurchase();
                }}
              >
                {french ? (
                  <View style={ListItemLeft}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flexDirection: "column", marginTop: 5 }}>
                        <Image style={{ width: 10, height: 10, resizeMode: "contain" }} source={require("./../../../images/parking.png")}></Image>
                        <Image style={{ width: 10, height: 10, resizeMode: "contain", marginTop: 2 }} source={require("./../../../images/turn-right.png")}></Image>
                        <Image style={{ width: 10, height: 10, resizeMode: "contain", marginTop: 2 }} source={require("./../../../images/danger.png")}></Image>
                      </View>
                      <View style={{ flexDirection: "column", marginLeft: 10 }}>
                        <Text>Tout</Text>
                        <Text>(Dans App-achat)</Text>
                      </View>
                    </View>
                    <Text>Questions : {practiceQuestions.length}</Text>
                    <Text>Tentative: {userProgress.all.attemptedQues}</Text>
                  </View>
                ) : (
                    <View style={ListItemLeft}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: "column", marginTop: 5 }}>
                          <Image style={{ width: 10, height: 10, resizeMode: "contain" }} source={require("./../../../images/parking.png")}></Image>
                          <Image style={{ width: 10, height: 10, resizeMode: "contain", marginTop: 2 }} source={require("./../../../images/turn-right.png")}></Image>
                          <Image style={{ width: 10, height: 10, resizeMode: "contain", marginTop: 2 }} source={require("./../../../images/danger.png")}></Image>
                        </View>
                        <View style={{ flexDirection: "column", marginLeft: 10 }}>
                          <Text bold>ALL</Text>
                          <Text bold >(In App-purchase)</Text>
                        </View>
                      </View>
                      <Text style={QuestionsStyle}>Questions : {practiceQuestions.length}</Text>
                      <Text style={QuestionsStyle}>Attempted : {userProgress.all.attemptedQues}</Text>
                    </View>
                  )}
                <View style={ListItemRight}>
                  <View style={ListItemRightCircle}>
                    <ImageBackground
                      style={{ height: 101, width: 101 }}
                      source={require("./../../../images/oval.png")}>
                      <Card width={100} height={100} borderRadius={50}>
                        <AnimatedCircularProgress
                          size={100}
                          width={12}
                          fill={allQuesProgrss}
                          tintColor="#3DBA81"
                          backgroundColor="#ffffff"
                        >
                          {fill => (
                            <Text style={ProgressText}>{allQuesProgrss} %</Text>
                          )}
                        </AnimatedCircularProgress>
                      </Card>
                    </ImageBackground>
                  </View>
                  <View style={ListItemRightArrowContainer}>
                    <Icon name="keyboard-arrow-right" size={40} />
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
        </Content>
      </Container>

    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
