import Validator from 'validator';
import isEmpty from '../../../validations/is-empty';
export const validationCreateCategory = (data) =>{
    let errors = {};
 
    data.categoryName = !isEmpty(data.categoryName) ? data.categoryName : '';

    if (!Validator.isLength(data.categoryName,{min:5,max:60})){
        errors.categoryName = 'Must be at least 5 until 60 character';
    }
    if (Validator.isEmpty(data.categoryName)){
        errors.categoryName = 'Must be provided';
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }

}

