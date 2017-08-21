// Module local storage
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

global.url = 'http://192.168.0.12:8000/api/';
global.storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: 1000 * 3600 * 24,
	enableCache: true,
})

global.storage.save({
	key: 'token',
	data: 'a5a68f1a367340dd73f8601503dfe59dea3df8a5',
	expires: 1000 * 3600
});
