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
        size={30}
        color={color}
      />
    )
  }

  _goStatistics = () => {
    const { navigate } = this.props.navigation;
    navigate('statistics')
  }

  _goProfile = () => {
    const { navigate } = this.props.navigation;
    navigate('profile')
  }

  _goFriends = () => {
    const { navigate } = this.props.navigation;
    navigate('friends')
  }

  _goLogout = () => {
    const { navigate } = this.props.navigation;
    global.storage.remove({
    	key: 'token'
    });
    global.storage.remove({
    	key: 'user'
    });
    this.props.navigation.dispatch(resetActionLogin);
  }

  render(){
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this._goStatistics}
          >
          <View style={styles.iconContainer}>
            {this._buidIcon('pie-chart', '#2d9c16')}
          </View>
          <Text style={styles.text}>Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this._goProfile}
          >
          <View style={styles.iconContainer}>
            {this._buidIcon('user', '#ffa65d')}
          </View>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this._goFriends}
          >
          <View style={styles.iconContainer}>
            {this._buidIcon('users', '#31b1cd')}
          </View>
          <Text style={styles.text}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this._goLogout}
          >
          <View style={styles.iconContainer}>
            {this._buidIcon('sign-out', '#be5e64')}
          </View>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

}
