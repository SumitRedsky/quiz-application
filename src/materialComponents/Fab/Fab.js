import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Fab = ({ activeOpacity, onPress, backgroundColor, position, icon, iconColor }) => {
    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={onPress}
            style={{
                position: 'absolute',
                bottom: 30,
                right: position === 'right' ? 30 : null,
                left: position === 'left' ? 30 : null,
                width: 56,
                height: 56,
                borderRadius: 28,
                padding: 10,
                zIndex: 1,
                backgroundColor: backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#1E1E1E',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.5,
                elevation: 3
            }}
        >
            <Icon name={icon} size={25} color={iconColor} />
        </TouchableOpacity>
    )
}

Fab.propTypes = {
    activeOpacity: PropTypes.number.isRequired,
    onPress: PropTypes.func,
    backgroundColor: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconColor: PropTypes.string.isRequired,
}
Fab.defaultProps = {
    activeOpacity: 0.8,
    backgroundColor: '#21A24F',
    position: 'right',
    icon: 'add',
    iconColor: '#FFFFFF'
}

export default Fab;