import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, Platform } from 'react-native';


const LoaderView = ({ backgroundColor, style, size, color }) => {
    return (
        <View style={[
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: backgroundColor
            }, style
        ]}>
            <ActivityIndicator
                size={Platform.OS === 'android' ? size : null}
                color={color} />
        </View>
    )
}

LoaderView.proptypes = {
    backgroundColor: PropTypes.string.isRequired,
    style: PropTypes.object,
    size: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}
LoaderView.defaultProps = {
    backgroundColor: '#FFFFFF',
    size: 'large',
    color: '#3DBA81'
}


export default LoaderView;