// Module local storage
import Storage from 'react-native-storage';
import { AsyncStorage, Platform } from 'react-native';

global.url = 'http://104.154.186.29/';
global.apiUrl = 'http://104.154.186.29/api/';

global.statusBarHeight = (Platform.OS === 'ios')?0:24
global.navBarHeight = 56

global.currentIndex = 0;
//global.url = 'http://192.168.0.14:8000/';
//global.apiUrl = 'http://192.168.0.14:8000/api/';


global.storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: 1000 * 3600 * 24,
	enableCache: true,
})
