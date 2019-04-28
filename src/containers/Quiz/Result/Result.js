import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, BackHandler, ImageBackground, StatusBar } from 'react-native';
import { Container, Content, Header, Card, Button, CardItem, Text } from './../../../materialComponents';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { PowerTranslator } from 'react-native-power-translator';
import styles from './ResultStyles';

import { _showSnack } from './../../../store/actions/snack_actions';


mapStateToProps = (state) => {
    return {
        french: state.Lang.french,
    }
}
mapDispatchToProps = (dispatch) => {
    return {

    }
}

class Result extends Component {
    constructor() {
        super();
        this.state = {
            answers: null,
            score: 0,
        }
        StatusBar.setTranslucent(true);
    }

    componentDidMount() {
        const { score } = this.props.navigation.state.params;

        this.setState({ score });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }
    // for move to another screen
    _handleRoute = (route) => {
        const { navigation } = this.props;
        navigation.navigate(route);
    }
    render() {
        const { score } = this.state;
        const { answers } = this.props.navigation.state.params;
        const {
            ContentStyle,
            ImageBackgroundStyle,
            ResultContainer,
            ProgressCircleContainer,
            ProgressText,
            StatusContainer,
            StatusHeaderText,
            StatusText,
            ButtonContainer
        } = styles;
        const { navigation, french } = this.props;
        const { navigate } = navigation;
        const minimum = 82;
        return (
            <Container>
                <Header
                    titleColor="#ffffff"
                    french={french}
                    title='Result'
                    leftIcon='keyboard-arrow-left'
                    leftIconOnPress={() => this._handleRoute('Home')}
                />
                <Content padding={0} style={ContentStyle}>
                    <View style={ResultContainer}>
                        <ImageBackground
                            style={{ height: 201, width: 201 }}
                            source={require("./../../../images/oval.png")}>
                            <Card width={200} height={200} borderRadius={100}>
                                <AnimatedCircularProgress
                                    size={200}
                                    width={25}
                                    fill={score}
                                    tintColor={(score <= minimum) ? '#e00000' : '#3DBA81'}
                                    backgroundColor="#ffffff" >
                                    {
                                        (fill) => (
                                            <Text style={ProgressText}>{score} %</Text>
                                        )
                                    }
                                </AnimatedCircularProgress>
                            </Card>
                        </ImageBackground>
                        <View style={StatusContainer}>

                            <Text style={StatusHeaderText}>{(score < minimum) ? french ? 'PARDON' : 'SORRY' : french ? 'FÉLICITATION' : 'CONGRATULATIONS'}</Text>
                            <Text style={[StatusText, { color: (score <= minimum) ? '#383838' : '#3DBA81' }]}>
                                {
                                    french ?
                                        ` ${(score <= minimum) ? 'ÉCHOUÉ' : '`TU ES PASSÉ'}` :

                                        `${(score <= minimum) ? 'Oh oh. Seems like you need more practice' : 'YOU ARE SUCCESS'}`
                                }
                            </Text>
                        </View>
                    </View>
                    {
                        answers ?

                            <View style={ButtonContainer}>
                                <Button
                                    fullSize
                                    height={50}
                                    title='SEE ANSWERS'
                                    onPress={() => navigate('Answers', { answers })}
                                    backgroundColor="rgb(34,150,234)"
                                    color="#FFFFFF"
                                    borderRadius={25}
                                />
                            </View> : null}
                    <View style={ButtonContainer}>
                        <Button
                            fullSize
                            height={50}
                            title='TRY AGAIN'
                            onPress={() => navigate('Answers', { answers })}
                            color="rgb(34,150,234)"
                            backgroundColor="transparent"
                            borderRadius={25}
                            borderColor="rgb(34,150,234)"
                            borderWidth={1}
                        />
                    </View>
                </Content >
            </Container >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);

