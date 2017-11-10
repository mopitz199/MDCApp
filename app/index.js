/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import the custom theme
import * as theme from './styles/theme';

import { Root } from "native-base";

import { StackNavigator,  TabNavigator} from 'react-navigation';
import Login from './pages/login';
import Splash from './pages/splash';
import CreateTrade from './pages/create-trade';
import Photo from './pages/photo';
import OtherTrades from './pages/other-trades';
import Profile from './pages/profile';
import RecoverPassword from './pages/recover-password';
import InsertRecoveryCode from './pages/insert-recovery-code';
import ChangePassword from './pages/change-password';
import EditTrade from './pages/edit-trade';

import './utils/global';

import {HomeTab} from './router/home-tab';

const SimpleApp = StackNavigator({
  splash: { screen: Splash },
  login: { screen: Login },
  home: { screen: HomeTab },
  createTrade: { screen: CreateTrade },
  photo: { screen: Photo },
  otherTrades: { screen: OtherTrades },
  profile: { screen: Profile },
  recoverPassword: { screen: RecoverPassword },
  insertRecoveryCode: { screen: InsertRecoveryCode },
  changePassword: { screen: ChangePassword },
  editTrade: { screen: EditTrade },
});

const app = () => {
  return (
    <Root>
      <SimpleApp />
    </Root>
  )
}

AppRegistry.registerComponent('MDC', () => app);
