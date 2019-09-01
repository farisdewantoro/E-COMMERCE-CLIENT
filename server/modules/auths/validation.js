import Validator from 'validator';
import isEmpty from '../../../validations/is-empty';
import db from '../../config/conn';

export const ValidationLogin = (data) => {
    let errors = {

    }
    data.username = !isEmpty(data.username) ? data.username : '';
    if (Validator.isEmpty(data.username.toString())) errors.username = 'Must be provided';
    data.password = !isEmpty(data.password) ? data.password : '';
    if (Validator.isEmpty(data.password.toString())) errors.password = 'Must be provided';

    return {
        errors,
        isValid: isEmpty(errors)
    }



}
export const validationRegister = (data) => {
    let errors = { };
    data.email = !isEmpty(data.email) ? data.email : '';
    data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';
    let newErrors = {}
    if (Validator.isEmpty(data.email)) errors.email = 'Please fill out email.';
    if (Validator.isEmpty(data.fullname)) errors.fullname = 'Please fill out full name.';
    if (Validator.isEmpty(data.password)) errors.password = 'Please fill out password.';
    if (isEmpty(data.phone_number)) {
        errors.phone_number = 'Please fill out phone number.';
    }
    if (!Validator.isMobilePhone(data.phone_number, 'id-ID')) {
        errors.phone_number = 'Please use valid Phone number';
    }
    if (Validator.isEmpty(data.confirmPassword)) errors.confirmPassword = 'Please fill out confirmPassword.';
    if (!Validator.isLength(data.fullname, { min: 2, max: 50 })) errors.fullname = 'Must be at least 2 until 50 character';
    if (!Validator.isEmail(data.email)) errors.email = 'Must be a correct email';
    if (!Validator.isLength(data.password, { min: 8, max: 50 })) errors.password = 'Must be at least 8 until 50 character';
    if (data.confirmPassword !== data.password){
        errors.confirmPassword = 'Password doesnt match';
    }
  
  
 



 

    return {
        errors,
        isValid: isEmpty(errors)
    }



}


export const ValidationUpdateProfile =(data)=>{
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
    data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : '';

    if (Validator.isEmpty(data.email)) errors.email = 'Please fill out email.';
    if (Validator.isEmpty(data.phone_number)) errors.phone_number = 'Please fill out phone number.';
    if (Validator.isEmpty(data.fullname)) errors.fullname = 'Please fill out display name.';

    if (!Validator.isLength(data.fullname, { min: 2, max: 50 })) errors.fullname = 'Must be at least 2 until 50 character';
    if (!Validator.isEmail(data.email)) errors.email = 'Must be a correct email';
  
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export const ValidationUpdateAddress = (data)=>{
    let errors={}
    data.address = !isEmpty(data.address)?data.address : '';
    data.postcode = !isEmpty(data.postcode) ? data.postcode : '';
    data.district_id = !isEmpty(data.district_id) ? data.district_id : '';
    data.province_id = !isEmpty(data.province_id) ? data.province_id : '';
    data.regency_id = !isEmpty(data.regency_id) ? data.regency_id : '';
    data.village_id = !isEmpty(data.village_id) ? data.village_id : '';

    if (Validator.isEmpty(data.address)) errors.address = 'Please fill out address.';
    if (!Validator.isLength(data.address, { min: 5, max: 100 })) errors.address = 'Must be at least 5 until 100 character';
    if (Validator.isEmpty(data.postcode)) errors.postcode = 'Please fill out postcode.';
    if (!Validator.isLength(data.postcode, { min: 3, max: 100 })) errors.postcode = 'Must be at least 3 until 100 character';
    if (!data.district_id.hasOwnProperty("value")) errors.district_id = 'Please fill out district.';
    if (!data.province_id.hasOwnProperty("value")) errors.province_id = 'Please fill out province.';
    if (!data.regency_id.hasOwnProperty("value")) errors.regency_id = 'Please fill out regency.';
    if (!data.village_id.hasOwnProperty("value")) errors.village_id = 'Please fill out village.';

    return{
        errors,
        isValid:isEmpty(errors)
    }
}



