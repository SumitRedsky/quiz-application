import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, ImageBackground, ActivityIndicator, Platform, BackHandler, Dimensions, StatusBar } from 'react-native';
import { Container, Content, Header, Card, Button, Text, RadioButton } from './../../../materialComponents';
import { PowerTranslator, Translation } from 'react-native-power-translator';
import styles from './MockTestStyle';
// import {_logout} from '../../../store/actions/auth_actions';
import { _showSnack } from './../../../store/actions/snack_actions';
import { setMockResult } from '../../../store/actions/quiz_actions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const selectedRadio = require("./../../../images/selected-radio.png");
const unselectedRadio = require("./../../../images/unselected-radio.png");

mapStateToProps = (state) => {
    return {
        french: state.Lang.french
    }
}
mapDispatchToProps = (dispatch) => {
    return {
        setResult: (result) => dispatch(setMockResult(result)),
    }
}
class MockTest extends Component {

    constructor() {
        super();
        this.state = {
            questionNO: 0,
            selectedAnswer: '',
            timer: 10,
            selectedIndex: null,
            rightIndex: null,
            answers: [],
            questions: [],
            loading: true,
            startTimer: false,
            translatedQuestion: '',
            translatedChoices: [],
            radioSource: unselectedRadio
        }
        this.mockTimer;
        StatusBar.setTranslucent(true);
    }


    // for move to another screen
    _handleRoute = (route, params) => {
        const { navigation } = this.props;
        this.clearTimer();
        if (params) {
            navigation.navigate(route, params)
        } else {
            navigation.navigate(route);
        }
    }
    componentDidMount() {
        const { questionsArray } = this.props.navigation.state.params;
        const { french } = this.props;
        if (french) {
            this.getTranslated(questionsArray[0]);
        }
        this.setState({ questions: questionsArray, rightIndex: questionsArray[0].rightAnswer, loading: french ? true : false, startTimer: questionsArray[0].file ? false : true });
        this.handleTimer();

    }

    componentWillUnmount() {
        this.clearTimer;
    }

    _handleRadioValue = (selectedAnswer, selectedIndex) => {
        this.setState({ selectedAnswer, selectedIndex });
    }

    clearTimer = () => {
        clearInterval(this.mockTimer);
    }

    handleTimer = () => {
        this.mockTimer = setInterval(() => {
            if (this.state.startTimer) {
                if (this.state.timer >= 1) {
                    this.setState((prev) => ({ timer: prev.timer - 1 }))
                } else {
                    clearInterval(this.mockTimer);
                    this._handleNextQuestion();
                }
            }
        }, 1000)
    }

    getTranslated = async question => {
        const translatedChoices = [];
        await Translation.get(question.question).then((translation) => {
            this.setState({ translatedQuestion: translation })
        });

        await Promise.all(question.choices.map(async (choice, i) => {
            await Translation.get(question.choices[i]).then((transl) => {
                translatedChoices[i] = transl;
            });
        })).then(() => {
            this.setState({ translatedChoices, loading: false })
        })


    }

    // for next question
    _handleNextQuestion = async () => {
        const { questionNO, selectedIndex, rightIndex, answers, questions } = this.state;
        const { setResult, french } = this.props;
        // const score = 63.33;
        const updatedAnswers = [...answers];
        if (selectedIndex !== null) {
            if (rightIndex === selectedIndex) {
                updatedAnswers[questionNO] = true;
            } else {
                updatedAnswers[questionNO] = false;
            }
        } else {
            updatedAnswers[questionNO] = false;
        }
        if (questions.length === questionNO + 1) {
            const afterExcludingFive = updatedAnswers.slice(5, updatedAnswers.length);
            const rightAnswersLength = 0;
            afterExcludingFive.forEach((ans) => {
                if (ans === true) {
                    rightAnswersLength += 1;
                }
            })
            const result = (rightAnswersLength * 100) / afterExcludingFive.length;
            setResult(Math.round(result))
            this._handleRoute('Result', { score: Math.round(result), answers: updatedAnswers })
        } else {

            if (french) {
                this.setState({ loading: true });
                await this.getTranslated(questions[questionNO + 1]);
            }

            const updateRightAnswerIndex = questions[questionNO + 1].rightAnswer;
            this.setState(prevState => ({
                startTimer: questions[questionNO + 1].file ? false : true,
                questionNO: prevState.questionNO + 1,
                timer: 10,
                selectedAnswer: '',
                rightIndex: updateRightAnswerIndex,
                answers: updatedAnswers,
                selectedIndex: null,
            }));
            this.handleTimer();
        }
    }

    startTimer = () => {
        this.setState({ startTimer: true })
    }
    render() {
        const { french } = this.props;
        const {
            questionNO,
            questions,
            loading,
            translatedQuestion,
            translatedChoices
        } = this.state;
        const {
            ImageBackgroundStyle,
            HeaderContainer,
            HeaderContainerText,
            QuestionContainer,
            QuestionImageContainer,
            QuestionImage,
            QuestionText,
            AnswerContainer,
            ButtonContainer,
            TimerLogo
        } = styles;
        const { selectedAnswer } = this.state;
        let choices = [];
        french ? choices = translatedChoices : questions[questionNO] ? choices = questions[questionNO].choices : null;
        return (
            <Container backgroundColor='#F4F5F7'>
                <Header
                    titleColor="#ffffff"
                    title={french ? 'Test de simulation' : 'Mock Test'}
                    leftIcon='keyboard-arrow-left'
                    leftIconOnPress={() => this._handleRoute('Home')}
                />
                <Content backgroundColor='transparent' padding={15}>
                    <View>
                        {
                            loading ?
                                <ActivityIndicator size={Platform.OS === 'android' ? 40 : null} color="#000" /> :
                                <View>

                                    <View style={HeaderContainer}>
                                        <Text style={HeaderContainerText}>Question No # {questionNO + 1}</Text>
                                        {/* <Text style={HeaderContainerText}>Question No # {questionNO + 1}</Text> */}

                                        <Image
                                            style={TimerLogo}
                                            source={require("./../../../images/set-timer-button.png")}
                                        />
                                        <Text style={HeaderContainerText}>{this.state.timer}</Text>
                                    </View>

                                    <View>
                                        {
                                            french ? (
                                                <Text style={QuestionText} >{translatedQuestion}</Text>
                                            ) : (<Text style={QuestionText} >{questions[questionNO].question}</Text>)
                                        }

                                        {
                                            questions[questionNO].file ? (
                                                <View style={QuestionImageContainer}>
                                                    <Image style={QuestionImage} source={{ uri: questions[questionNO].file }}
                                                        onLoadEnd={() => {
                                                            this.startTimer()
                                                        }}
                                                    />
                                                </View>
                                            ) : null
                                        }
                                        <View style={AnswerContainer}>
                                            {
                                                choices.map((answer, i) => {
                                                    if (answer) {
                                                        return (
                                                            <Card height={60} borderRadius={30} marginTop={15} width={width * 0.9}>
                                                                {this.state.selectedIndex != null ? (
                                                                    <RadioButton
                                                                        radioSource={selectedRadio}
                                                                        key={i}
                                                                        value={answer}
                                                                        currentValue={selectedAnswer}
                                                                        onPress={(selected) => this._handleRadioValue(selected, i)}
                                                                    />) : (
                                                                        <RadioButton
                                                                            key={i}
                                                                            value={answer}
                                                                            currentValue={selectedAnswer}
                                                                            onPress={(selected) => this._handleRadioValue(selected, i)}
                                                                        />
                                                                    )
                                                                }
                                                            </Card>
                                                        )
                                                    }
                                                })
                                            }
                                        </View>
                                    </View>
                                </View>
                        }
                    </View>
                </Content>
                {/* <View style={ButtonContainer}>
                        <Button
                            width={100}
                            title='Next'
                            color='#FFFFFF'
                            borderRadius={6}
                            onPress={this._handleNextQuestion}
                            backgroundColor='#3DBA81'
                        />
                    </View> */}

            </Container >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MockTest);