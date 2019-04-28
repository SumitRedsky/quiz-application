import React, { Component } from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';


import {
    Login,
    Registration
} from './containers/Auth';
import {
    Home,
    Categories,
    PracticalTest,
    Answers,
    MockTest,
    Result,
} from './containers/Quiz';

const DrawerNavigation = StackNavigator({
    Home: {
        screen: Home
    },
    Categories: {
        screen: Categories
    },
    PracticalTest: {
        screen: PracticalTest
    },
    MockTest: {
        screen: MockTest
    },
    Result: {
        screen: Result,
        path: 'Result/:score'
    },
    Answers: {
        screen: Answers
    },
}, {
        headerMode: 'none'
    });

const StackNavigation = StackNavigator({
    Login: {
        screen: Login,
    },
    Registration: {
        screen: Registration
    }
}, {
        headerMode: 'none'
    }
);


export {
    DrawerNavigation,
    StackNavigation
}