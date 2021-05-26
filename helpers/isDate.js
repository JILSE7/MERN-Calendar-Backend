//importando moment
const  moment = require('moment');
const isDate = (value, {req, location, path}) =>{
    if(!value) return false;
    //conviritiendo la fecha, en una fecha de moment
    const fecha = moment(value);
    console.log(fecha);
    //evalua si la fecha es valida
    if(fecha.isValid()){
        return true
    }else{
        return false
    }
    
}


module.exports = {
    isDate
}