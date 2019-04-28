import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const CardItem = ({ onPress, style, children }) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={[
                {
                    flex: 1,
                    flexDirection: 'row'
                }, style
            ]}
        >
            {children}
        </TouchableOpacity>
    )
}

CardItem.propType ={
    onPress:PropTypes.func,
    style:PropTypes.object
}

export default CardItem;