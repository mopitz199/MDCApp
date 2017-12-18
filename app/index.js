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
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import the custom theme
import * as theme from './styles/theme';

import { Root } from "native-base";

import { StackNavigator,  TabNavigator, DrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
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
import MyTrades from './pages/my-trades';
import OtherUsers from './pages/other-users';
import Statistics from './pages/statistics';
import Filter from './pages/filter';

import Menu2 from './components/menu2';

import './utils/global';

const SimpleApp = StackNavigator({
  splash: { screen: Splash },
  login: { screen: Login },
  createTrade: { screen: CreateTrade },
  photo: { screen: Photo },
  otherTrades: { screen: OtherTrades },
  profile: { screen: Profile },
  recoverPassword: { screen: RecoverPassword },
  insertRecoveryCode: { screen: InsertRecoveryCode },
  changePassword: { screen: ChangePassword },
  editTrade: { screen: EditTrade },
  myTrades: { screen: MyTrades },
  statistics: { screen: Statistics },
  friends: { screen: OtherUsers },
  filter: { screen: Filter },
});


const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);


const DrawerStack = DrawerNavigator(
  {
    splash: {
      screen: Splash,
    },
    mainStack: {
      screen: SimpleApp,
    },
    statistics: { screen: Statistics },
    profile: { screen: Profile },
    friends: { screen: OtherUsers },
    logout: {screen: Login},
  },
  {
    initialRouteName: 'splash',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent
  }
);


class app extends Component {
  _onNavigationStateChange = (prevState, newState) => {
    global.currentIndex = newState.index;
  }
  render() {
    return (
      <Root>
        <DrawerStack onNavigationStateChange={this._onNavigationStateChange}/>
      </Root>
    )
  }
}

AppRegistry.registerComponent('MDC', () => app);
