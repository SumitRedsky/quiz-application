
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, TouchableOpacity, Text, Modal, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Dialog = ({ visible, animationType, headerBorder, headerBackgroundColor, headerFontColor, title, onClose, children }) => {
    return (
        <Modal
            visible={visible}
            animationType={animationType}
            transparent={true}
            onRequestClose={() => console.log('Dialog Close')}>
            <View
                style={{
                    flex: 1,
                    marginTop: Platform.OS === 'ios' ? 22 : 0,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    paddingHorizontal: 20,
                    paddingVertical: 50,
                    justifyContent: 'center'
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderTopLeftRadius: headerBorder ? 10 : 0,
                        borderTopRightRadius: headerBorder ? 10 : 0,
                        alignItems: 'center',
                        backgroundColor: headerBackgroundColor
                    }} >
                    <View style={{
                        flex: 1,
                        padding: 10,
                        paddingVertical: 15,
                        justifyContent: 'center',
                    }}>
                        <Text
                            style={{ color: headerFontColor, fontWeight: 'bold' }}
                            numberOfLines={1}>
                            {title}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={onClose}
                        style={{
                            padding: 10,
                            paddingVertical: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} >
                        <Icon name='close' style={{ color: headerFontColor, fontSize: 22, fontWeight: 'bold' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#FFFFFF' }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{
                            padding: 10,
                            justifyContent: 'center',
                            backgroundColor: '#FFFFFF'
                        }}>
                            {children}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>

    )
}


Dialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    animationType: PropTypes.string,
    headerBorder: PropTypes.bool.isRequired,
    headerBackgroundColor: PropTypes.string.isRequired,
    headerFontColor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}

Dialog.defaultProps = {
    headerBorder: false,
    headerBackgroundColor: '#424A54',
    headerFontColor: '#FFFFFF'
}

export default Dialog;