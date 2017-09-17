// Import utils
import * as utils from './utils';

export function http(method, path, data=null){
  let fullUrl = global.apiUrl+path;
  if(method=="GET"){
    return global.storage.load({
      key: 'token',
    }).then(ret => {
      return fetch(fullUrl, {
        method: method,
        headers: {
          'Authorization': 'Token '+ret,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
    }).catch(err => {
      utils.showAlert(err.name, err.message);
      return null;
    })
  }else{
    return global.storage.load({
      key: 'token',
    }).then(ret => {
      return fetch(fullUrl, {
        method: method,
        headers: {
          'Authorization': 'Token '+ret,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: data
      })
    }).catch(err => {
      utils.showAlert(err.name, err.message);
      return null;
    })
  }
}
