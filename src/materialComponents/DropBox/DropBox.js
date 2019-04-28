import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const DropBox = ({ onPress, iconName, name, value, selectedValue, items, onItemPress }) => {
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onPress(name, value)}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#CCCCCC'
                }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 10,
                    alignItems: 'center'
                }}>
                    <Icon name={iconName} color='#999999' size={25} />
                    <Text style={{ marginLeft: 5, color: '#939393' }}>{name}</Text>
                </View>
                <View style={{ padding: 8 }}>
                    <Icon name={value === selectedValue ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={25} />
                </View>
            </TouchableOpacity>
            {
                value === selectedValue ?
                    items.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => onItemPress(item.routeName)}
                                style={{
                                    backgroundColor: '#EBEBEB',
                                    flexDirection: 'row',
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    alignItems: 'center'
                                }}
                            >
                                <Icon name={item.iconName} color='#555555' size={15} />
                                <Text style={{ marginLeft: 5 }}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                    : null
            }
        </View>
    )
}


DropBox.propTypes = {
    onPress: PropTypes.func.isRequired,
    iconName: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    selectedValue: PropTypes.string,
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func,
}

DropBox.defaultProps = {
    name: ''
}

export default DropBox;