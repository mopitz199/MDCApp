import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';

import styles from '../styles/menu.js';

const resetActionLogin = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'login'})]
});

export default class Menu extends Component {

  constructor(props) {
    super(props);
  }

  _buidIcon(name, color){
    return (
      <Icon
        name={name}
        size={20}
        color={color}
      />
    )
  }

  _goStatistics = () => {
    const { navigate } = this.props.navigation;
    navigate('statistics')
    this.props._toggleMenu()
  }

  _goProfile = () => {
    const { navigate } = this.props.navigation;
    navigate('profile')
    this.props._toggleMenu()
  }

  _goFriends = () => {
    const { navigate } = this.props.navigation;
    navigate('friends')
    this.props._toggleMenu()
  }

  _goLogout = () => {
    const { navigate } = this.props.navigation;
    global.storage.remove({
    	key: 'token'
    });
    global.storage.remove({
    	key: 'user'
    });
    this.props._toggleMenu()
    this.props.navigation.dispatch(resetActionLogin);

  }

  render(){
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.iconContainerBorder}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={this._goStatistics}
            >
            <View style={styles.iconContainer}>
              {this._buidIcon('pie-chart', '#2d9c16')}
            </View>
            <Text style={styles.text}>Statistics</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainerBorder}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={this._goProfile}
            >
            <View style={styles.iconContainer}>
              {this._buidIcon('user', '#ffa65d')}
            </View>
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainerBorder}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={this._goFriends}
            >
            <View style={styles.iconContainer}>
              {this._buidIcon('users', '#31b1cd')}
            </View>
            <Text style={styles.text}>Friends</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainerBorder}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={this._goLogout}
            >
            <View style={styles.iconContainer}>
              {this._buidIcon('sign-out', '#be5e64')}
            </View>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

}
