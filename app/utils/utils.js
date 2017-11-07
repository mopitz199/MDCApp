import {
  Alert,
} from 'react-native';

export function getError(response){
  let error = JSON.parse(response["_bodyInit"]);
  for(var key in error){
    var input = key.charAt(0).toUpperCase() + key.slice(1);
    if (error.hasOwnProperty(key)) {
      for(let i=0; i<error[key].length; i++){
        var message = error[key][i];
        break;
      }
    }
    break;
  }
  return [input, message];
}


export function showAlert(title, message){
  Alert.alert(
    title,
    message,
    [
      {text: 'Accept', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )
}
