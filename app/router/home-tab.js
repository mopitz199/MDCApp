/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import the custom theme
import * as theme from '../styles/theme';

//
import { homeTabStyles } from '../styles/home-tab';

import { StackNavigator,  TabNavigator} from 'react-navigation';
import Statistics from '../pages/statistics';
import MyTrades from '../pages/my-trades';
import HomeRightHeader from '../components/home-right-header';


export const HomeTab = TabNavigator({
  myTrades: {
    screen: MyTrades,
  },
  statistics: {
    screen: Statistics,
  },
}, {
  tabBarOptions: {
    inactiveTintColor: theme.primaryTextColor,
    activeTintColor: theme.secondaryDarkColor,
    style: homeTabStyles.tabbar,
    tabStyle: homeTabStyles.tab
  },
});

HomeTab.navigationOptions = ({ navigation }) => ({
  title: 'MDC Capital',
  headerStyle:{ backgroundColor: theme.primaryNormalColor},
  headerTitleStyle:{ color: 'white'},
  headerBackTitle: null,
  headerLeft: null,
  headerRight: <HomeRightHeader navigate={navigation.navigate} />
});
