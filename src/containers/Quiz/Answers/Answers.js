import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Header, Button, Text, InputText, Card } from './../../../materialComponents';
import { View, Image, TouchableOpacity, ImageBackground, Dimensions, StatusBar } from 'react-native';
import { PowerTranslator } from 'react-native-power-translator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './AnswersStyle';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

mapStateToProps = (state) => {
    return {
        french: state.Lang.french,
        questions: state.Quiz.mockQuestions
    }
}
mapDispatchToProps = (dispatch) => {
    return {


    }
}

class Answers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
        }
        StatusBar.setTranslucent(true);
    }
    componentDidMount() {
        const { answers } = this.props.navigation.state.params;
        this.setState({ answers });
    }
    render() {
        const { questions, navigation, french } = this.props;
        const { answers } = this.state;
        const {
            ImageBackgroundStyle,
            TopicHeader,
            TopicHeaderText,
            ListItem,
            QuestionContainer,
            QuestionTextContainer,
            QuestionImageContainer,
            QuestionText,
            QuestionImage,
            AnswerContainer,
            AnswerTextHeading,
            AnswerText
        } = styles;
        return (
            <Container>
                <Header
                    titleColor="#ffffff"
                    backgroundColor="rgb(34,150,234)"
                    french={french}
                    title='Answers'
                    leftIcon='keyboard-arrow-left'
                    leftIconOnPress={() => navigation.navigate('Home')}
                />
                <Content>
                    <View style={TopicHeader}>
                        {
                            french ? (<PowerTranslator style={TopicHeaderText} text={'Mock Test'} />) : (<Text style={TopicHeaderText}>Mock Test</Text>)
                        }

                    </View>
                    {
                        questions.map((question, i) => {
                            return (
                                <Card width={width * 0.9} borderRadius={10} marginTop={5} marginBottom={10}>
                                    <View style={ListItem} key={i}>
                                        <View style={QuestionContainer}>
                                            {
                                                french ? (
                                                    <View style={QuestionTextContainer}>
                                                        <PowerTranslator style={QuestionText} text={`${i + 1} -  `} />
                                                        <PowerTranslator style={QuestionText} text={question.question} />
                                                    </View>
                                                ) : (
                                                        <View style={QuestionTextContainer}>
                                                            <Text style={QuestionText} >{i + 1} -  </Text>
                                                            <Text style={QuestionText}  >{question.question}</Text>
                                                        </View>
                                                    )
                                            }
                                            {
                                                questions[i].file ? (
                                                    <View style={QuestionImageContainer}>
                                                        <Image style={QuestionImage} source={{ uri: questions[i].file }} />
                                                    </View>
                                                ) : null
                                            }
                                            < View style={{
                                                justifyContent: "flex-end",
                                                alignItems: "flex-start",
                                                width: width * 0.85,
                                                marginTop: 10
                                            }} >
                                                {
                                                    french ? (
                                                        <PowerTranslator style={AnswerText} text={`Right Answer : ${question.choices[question.rightAnswer]}`} />
                                                        // ) : (<Text style={AnswerText}>{question.choices[question.rightAnswer]}</Text>)
                                                    ) : (<View style={{ flexDirection: "row" }}>
                                                        <Text style={AnswerTextHeading}>Right Answer: </Text>
                                                        <Text style={AnswerText}>{question.choices[question.rightAnswer]}</Text>
                                                        <View style={{
                                                            width: width * 0.2,
                                                            alignSelf: 'center',
                                                        }}>
                                                            <Icon
                                                                style={{ alignSelf: "center" }}
                                                                size={30}
                                                                name={answers[i] ? 'check' : 'close'}
                                                                color={answers[i] ? 'green' : 'red'} />
                                                        </View>
                                                    </View>)
                                                }

                                            </View>
                                        </View>
                                        {/* <View style={{
                                            alignSelf: 'flex-end',
                                        }}>
                                            <Icon
                                                size={30}
                                                name={answers[i] ? 'check' : 'close'}
                                                color={answers[i] ? 'green' : 'red'} />
                                        </View> */}
                                    </View>
                                </Card>
                            )
                        })
                    }
                </Content >
            </Container >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Answers);