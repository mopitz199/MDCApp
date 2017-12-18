import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import {DrawerNavigator} from 'react-navigation';

import Profile from '../pages/profile';
import Statistics from '../pages/statistics';
import Login from '../pages/login';
import MyTrades from '../pages/my-trades';
import OtherUsers from '../pages/other-users';

const Menu2 = DrawerNavigator(
  {
    myTrades: {
      screen: MyTrades,
    },
    profile: {
      screen: Profile,
    },
    statistics: {
      screen: Statistics,
    },
    login: {
      screen: Login,
    },
    otherUsers: {
      screen: OtherUsers,
    }
  },
  {
    initialRouteName: 'profile',
    drawerPosition: 'left'
  }
);
