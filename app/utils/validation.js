export const validation = {
  email: {
    presence: {
      message: 'Please enter an email address'
    },
    format: {
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Please enter a valid email address'
    }
  },
  password: {
    presence: {
      message: 'Please enter a password'
    },
    length: {
      minimum:{
        val: 5,
        message: 'Your password must be at least 5 characters'
      }
    }
  },
  time:{
    presence:{
      message: 'Enter a time'
    },
    format:{
      pattern: /([01]\d|2[0-3]):([0-5]\d):([0-5]\d)/,
      message: 'Enter a valid time'
    }
  },
  decimal:{
    presence:{
      message: 'Enter a decimal'
    },
    format:{
      pattern: /^(\d+\.?\d{0,9}|\.\d{1,9})$/,
      message: 'Enter a valid decimal'
    }
  }
}


export function validate(nameField, value){
  let resp = [null, null];
  if(validation.hasOwnProperty(nameField)){
    console.log("validation")
    let v = validation[nameField]
    if(value=='' || value==null){
      console.log("validation null")
      resp[0] = false
      resp[1] = v['presence']['message']
    }else if(v.hasOwnProperty('format') && !v['format']['pattern'].test(value)){
      resp[0] = false
      resp[1] = v['format']['message']
    }else if(v.hasOwnProperty('length')){
      let l = v['length'];
      if(l.hasOwnProperty('minimum') && value.length<l['minimum']['val']){
        resp[0] = false
        resp[1] = l['minimum']['message']
      }else if(l.hasOwnProperty('maximun') && value.length<l['maximun']['val']){
        resp[0] = false
        resp[1] = l['maximun']['message']
      }
    }else{
      resp[0] = true
    }
  }else{
    resp[0] = true
  }
  return resp;
}
