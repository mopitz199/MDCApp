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
  ScrollView,
  Text
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

class Hola extends Component {
  render(){
    return(
      <Text>Hola</Text>
    )
  }
}

const MyTradesStack = StackNavigator(
  {
    myTrades: { screen: MyTrades },
    filter: { screen: Filter },
    photo: { screen: Photo },
    createTrade: { screen: CreateTrade },
    editTrade: { screen: EditTrade },
  },
  {
    headerMode: 'screen',
  }
)


const FriendsStack = StackNavigator(
  {
    friends: { screen: OtherUsers },
    otherTrades: { screen: OtherTrades },
  }
)


const LoginStack = StackNavigator(
  {
    login: { screen: Login },
    recoverPassword: { screen: RecoverPassword },
    insertRecoveryCode: { screen: InsertRecoveryCode },
    changePassword: { screen: ChangePassword },
  }
)


const DrawerStack = DrawerNavigator(
  {
    myTradesStack: { screen: MyTradesStack },
    statistics: { screen: Statistics },
    profile: { screen: Profile },
    friendsStack: { screen: FriendsStack },
    logoutStack: { screen: LoginStack },
  },
  {
    initialRouteName: 'myTradesStack',
    headerMode: 'screen',
    drawerPosition: 'left',
    drawerBackgroundColor: '#323232',
    contentComponent: CustomDrawerContentComponent,
    contentOptions:{
      itemStyle:{
        borderBottomWidth: 1,
        borderBottomColor: 'red'
      }
    }
  }
);


const DrawerNavigation = StackNavigator(
  {
    drawerStack: { screen: DrawerStack },
  },
  {
    headerMode: 'none',
  }
)


const SimpleApp = StackNavigator(
  {
    splash: { screen: Splash },
    loginStack: { screen: LoginStack },
    drawerNav: { screen: DrawerNavigation }
  },
  {
    headerMode: 'none',
  }
);


const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);





class app extends Component {
  _onNavigationStateChange = (prevState, newState) => {
    global.currentIndex = newState.index;
  }
  render() {
    return (
      <Root>
        <SimpleApp onNavigationStateChange={this._onNavigationStateChange}/>
      </Root>
    )
  }
}

AppRegistry.registerComponent('MDC', () => app);
