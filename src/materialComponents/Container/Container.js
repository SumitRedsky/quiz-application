import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const Container = ({ padding, backgroundColor, style, children }) => {
    return (
        <View style={[
            {
                flex: 1,
                padding: padding,
                backgroundColor: backgroundColor
            }, style
        ]}>
            {children}
        </View>
    )
}

Container.propTypes = {
    padding: PropTypes.number,
    backgroundColor: PropTypes.string.isRequired,
    style: PropTypes.object,
}

Container.defaultProps = {
    backgroundColor: '#FFFFFF'
}
export default Container;