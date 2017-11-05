// Import utils
import * as utils from './utils';

export async function http(method, path, data=null, useToken=true){
  let fullUrl = global.apiUrl+path;
  if(method=="GET"){
    if(useToken){
      let token = await global.storage.load({key: 'token'})
      return fetch(fullUrl, {
        method: method,
        headers: {
          'Authorization': 'Token '+token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
    }else{
      return fetch(fullUrl, {
        method: method,
        headers: {
          'Accept': 'application/json',
        }
      })
    }
  }else{
    if(useToken){
      let token = await global.storage.load({key: 'token'})
      return fetch(fullUrl, {
        method: method,
        headers: {
          'Authorization': 'Token '+token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: data
      })
    }else{
      return fetch(fullUrl, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: data
      })
    }
  }
}
