import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import SnackBar from 'react-native-snackbar-component';
import { DrawerNavigation, StackNavigation } from './../../navigation';
import styles from './AppStyle';

import { _hideSnack, _showSnack } from './../../store/actions/snack_actions';
import { _userStatus } from './../../store/actions/auth_actions';
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';


mapStateToProps = (state) => {
    return {
        isLoggedIn: state.Auth.isLoggedIn,
        snackType: state.Snack.snackType,
        snackMessage: state.Snack.snackMessage,
        snackFlag: state.Snack.snackFlag,
        lang: state.Lang.lang
    }
}
mapDispatchToProps = (dispatch) => {
    return {
        _userStatus: () => dispatch(_userStatus()),
        _hideSnack: () => dispatch(_hideSnack()),
        _showSnack: (type, msg) => dispatch(_showSnack(type, msg)),
    }
}


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            snackType: '',
            snackMessage: '',
            snackFlag: false
        }
    }

    async componentDidMount() {

        console.disableYellowBox = true;
        const { _userStatus, _showSnack } = this.props;

        try {
            await _userStatus();
        } catch ({ message }) {
            _showSnack('error', message);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            const { _hideSnack } = this.props;
            const { isLoggedIn, snackType, snackMessage, snackFlag } = nextProps;
            this.setState({
                isLoggedIn,
                snackType,
                snackMessage,
                snackFlag,
            });
            if (snackFlag === true) {
                setTimeout(() => {
                    _hideSnack();
                }, 5000);
            }
        }
    }

    render() {
        const { Container } = styles;
        const { snackType, snackMessage, snackFlag } = this.state;
        const { isLoggedIn, lang } = this.props;
        const distance = 3000;
        // Translation.setConfig(ProviderTypes.Google, '_api_key_', 'fr');

        return (
            <View style={Container}>
                {
                    isLoggedIn ? (<DrawerNavigation />) : (<StackNavigation />)
                }
                {/* <DrawerNavigation /> */}
                <SnackBar
                    visible={snackFlag}
                    textMessage={snackMessage}
                    backgroundColor={snackType === 'error' ? '#E74C3C' : '#3DBA81'}
                    messageColor='#FFFFFF'
                />
            </View>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);