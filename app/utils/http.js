// Import utils
import * as utils from './utils';

export function http(method, path, data){
  let fullUrl = global.url+path;
  if(method=="get"){
    return fetch(fullUrl, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: data
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
