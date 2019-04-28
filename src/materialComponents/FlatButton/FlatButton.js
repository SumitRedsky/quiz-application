import React, { component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';


const FlatButton = ({ onPress, paddingHorizontal, paddingVertical, buttonStyle, fontSize, color, textStyle, title }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                {
                    paddingHorizontal: paddingHorizontal,
                    paddingVertical: paddingVertical
                }, buttonStyle
            ]}
        >
            <Text style={[{ fontSize: fontSize, color: color }, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

FlatButton.propTypes = {
    onPress: PropTypes.func,
    paddingHorizontal: PropTypes.number.isRequired,
    paddingVertical: PropTypes.number.isRequired,
    buttonStyle: PropTypes.object,
    fontSize: PropTypes.number.isRequired,
    color: PropTypes.string,
    textStyle: PropTypes.object,
    title:PropTypes.string.isRequired
}

FlatButton.defaultProps = {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize:18
}



export default FlatButton;