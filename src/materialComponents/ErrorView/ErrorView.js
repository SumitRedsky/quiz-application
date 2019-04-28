import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';


const ErrorView = ({ backgroundColor, containerStyle, fontSize, color, textStyle, message }) => {
    return (
        <View style={[
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: backgroundColor
            }, containerStyle
        ]}>
            <Text style={[
                {
                    fontSize: fontSize,
                    color: color
                }, textStyle
            ]}>
                {message}
            </Text>
        </View>
    )
}

ErrorView.proptypes = {
    backgroundColor: PropTypes.string.isRequired,
    containerStyle: PropTypes.object,
    fontSize: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    textStyle: PropTypes.object,
    message: PropTypes.string.isRequired,
}
ErrorView.defaultProps = {
    backgroundColor: '#FFFFFF',
    font: 17,
    color: '#76787a',
    message: ''
}


export default ErrorView;