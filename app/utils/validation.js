export const validation = {
  username:{
    presence: {
      message: 'Please enter an username'
    }
  },
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
        val: 6,
        message: 'Your password must be at least 6 characters'
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


export function validate(fields){
  for (var i = 0; i < fields.length; i++) {
    let field = fields[i]
    if(validation.hasOwnProperty(field[0])){
      let v = validation[field[0]]
      if(field[1]=='' || field[1]==null){
        return [false, v['presence']['message'], field.length==3?field[2]:'Desconocido']
      }
      if(v.hasOwnProperty('format') && !v['format']['pattern'].test(field[1])){
        return [false, v['format']['message'], field.length==3?field[2]:'Desconocido']
      }
      if(v.hasOwnProperty('length')){
        let l = v['length'];
        if(l.hasOwnProperty('minimum') && field[1].length<l['minimum']['val']){
          return [false, l['minimum']['message'], field.length==3?field[2]:'Desconocido']
        }else if(l.hasOwnProperty('maximun') && field[1].length>l['maximun']['val']){
          return [false, l['maximun']['message'], field.length==3?field[2]:'Desconocido']
        }
      }
    }
  }
  return [true, null];
}
