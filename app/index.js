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

import { StackNavigator,  TabNavigator, DrawerNavigator, DrawerItems, SafeAreaView, NavigationActions } from 'react-navigation';
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

const MyTradesStack = StackNavigator(
  {
    myTrades: { screen: MyTrades },
    filter: { screen: Filter },
    photo: { screen: Photo },
    createTrade: { screen: CreateTrade },
    editTrade: { screen: EditTrade },
  },
  {
    headerMode: 'screen'
  }
)

const StatisticsStack = StackNavigator(
  {
    statistics: { screen: Statistics },
  }
)

const ProfileStack = StackNavigator(
  {
    profile: { screen: Profile },
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
    changePassword: { screen: ChangePassword }
  }
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const actionToLogoutStack = NavigationActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'loginStack' })],
});

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems
        {...props}
        onItemPress={({ route, focused }) => {
          if(!focused) {
            setTimeout(() => {
              if(route.routeName=='loginStack'){
                console.warn("Max")
                props.navigation.dispatch(actionToLogoutStack);
              }else{
                props.navigation.navigate(route.routeName)
              }
            }, 0)
          }
          props.navigation.navigate('DrawerClose');
        }}
      />
    </SafeAreaView>
  </ScrollView>
);

const DrawerStack = DrawerNavigator(
  {
    myTradesStack: { screen: MyTradesStack },
    statistics: { screen: StatisticsStack },
    profile: { screen: ProfileStack },
    friendsStack: { screen: FriendsStack },
    loginStack: { screen: LoginStack },
  },
  {
    initialRouteName: 'myTradesStack',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    contentOptions:{
      itemStyle:{
        borderBottomWidth: 1,
        borderBottomColor: '#c6c6c6'
      }
    },
  }
);


const DrawerNavigation = StackNavigator(
  {
    drawerStack: { screen: DrawerStack },
  },
  {
    headerMode: 'none'
  }
)


const SimpleApp = StackNavigator(
  {
    splash: { screen: Splash },
    loginStack: { screen: LoginStack },
    drawerNav: { screen: DrawerNavigation }
  },
  {
    headerMode: 'none'
  }
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
