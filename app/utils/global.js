// Module local storage
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

global.url = 'http://104.154.20.121:8000/';
global.apiUrl = 'http://104.154.20.121:8000/api/';

//global.url = 'http://192.168.0.6:8000/';
//global.apiUrl = 'http://192.168.0.6:8000/api/';

global.storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: 1000 * 3600 * 24,
	enableCache: true,
})
