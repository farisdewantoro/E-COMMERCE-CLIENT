import Validator from 'validator';
import isEmpty from '../../../validations/is-empty';

export const validationConfirmPayment = (data)=>{
    let errors = {
    }

  
    if(Validator.isEmpty(data.bank)){
        errors.bank = 'Bank is required';
    }
    if(!Validator.isLength(data.bank,{min:2,max:50})){
        errors.bank = 'Must be at least 2 - 50 character'
    }
    if (!Validator.isLength(data.name, { min: 1, max: 50 })) {
        errors.name = 'Must be at least 1 - 50 character'
    }
    if(Validator.isEmpty(data.name)){
        errors.name = 'Nama Pemilik Rekening is required';

    }
    if (data.nominal_transfer < 1) {
        errors.nominal_transfer = 'Nominal transfer is required';
    }

    if(data.order_id instanceof Array && data.order_id.length === 0 ){
        errors.order_id = 'Order ID is required';

    }
    if (typeof data.order_id == "undefined" || typeof data.order_id == "string" || data.order_id == null) {
        errors.order_id = 'Order ID is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export const validationSubmitOrder = (data) => {
    let errors = {
        carts:{},
        shipping:{},
        user:{},
        vouchers:{}
    }
    if (!data.carts instanceof Array || data.carts.length === 0  ){
        errors.carts.error = 'MUST BE PROVIDE';
    }
    if(data.carts.length > 0){
        data.carts.forEach(c => {
            if (isEmpty(c.product_id)) {
                errors.carts.product_id = 'MUST BE PROVIDE';
            }
            if (isEmpty(c.product_variant_id)) {
                errors.carts.product_variant_id = 'MUST BE PROVIDE';
            }
            if (isEmpty(c.cart_items_id)) {
                errors.carts.cart_items_id = 'MUST BE PROVIDE';
            }
            if (isEmpty(c.product_attribute_id)) {
                errors.carts.product_attribute_id = 'MUST BE PROVIDE';
            }
        });
    }

    if(Object.keys(data.vouchers).length > 0){
            if(isEmpty(data.vouchers.description)){
                errors.vouchers.description = 'MUST BE PROVIDE';
            }
        if (isEmpty(data.vouchers.id)) {
            errors.vouchers.id = 'MUST BE PROVIDE';
        }
        if (isEmpty(data.vouchers.name)) {
            errors.vouchers.name = 'MUST BE PROVIDE';
        }
        if (isEmpty(data.vouchers.value)) {
            errors.vouchers.value = 'MUST BE PROVIDE';
        }
        if (isEmpty(data.vouchers.voucher_type_id)) {
            errors.vouchers.voucher_type_id = 'MUST BE PROVIDE';
        }
    }


    if (Object.keys(data.shippingSelected).length === 0){
        errors.shipping = '**Please choose the shipping method';
    }

    if(Object.keys(data.shippingSelected).length > 0){
        if (isEmpty(data.shippingSelected.name)){
            errors.shipping = 'MUST BE PROVIDE';
        }
        if (isEmpty(data.shippingSelected.service)) {
            errors.shipping = 'MUST BE PROVIDE';
        }
        if (isEmpty(data.shippingSelected.description)) {
            errors.shipping = 'MUST BE PROVIDE';
        }
        if(typeof data.shippingSelected.cost == "undefined" || data.shippingSelected.cost == '' ){
            errors.shipping = 'MUST BE PROVIDE';
        }
        if (data.shippingSelected.cost instanceof Array && data.shippingSelected.cost.length === 0){
            errors.shipping = 'MUST BE PROVIDE';
        }
        if (data.shippingSelected.cost instanceof Array && data.shippingSelected.cost.length > 0){
            if (isEmpty(data.shippingSelected.cost[0].value)){
                errors.shipping = 'MUST BE PROVIDE';
            }
   
        }
    }

    console.log(Object.keys(data.shippingSelected).length);
    if (Object.keys(data.user).length === 0) {
        errors.user = 'MUST BE PROVIDE';
    }


  
    if (Object.keys(data.user).length > 0){
        if (isEmpty(data.user.address)) {
            errors.user.address = 'Address must be required';
        }
        if (!Validator.isLength(data.user.address, { min: 5, max: 100 })) {
            errors.user.address = 'Must be at least 5 until 100 character'
        }
        if (isEmpty(data.user.email)) {
            errors.user.email = 'Email must be required';
        }
        if (isEmpty(data.user.phone_number)) {
            errors.user.phone_number = 'Phone number is required';
        }
        if (!Validator.isMobilePhone(data.user.phone_number,'id-ID')) {
            errors.user.phone_number = 'Please use valid phone number';
        }
        if (!Validator.isLength(data.user.phone_number, { min: 10, max: 50 })) {
            errors.user.phone_number = 'Must be at least 10 until 50 character'
        }

        if (isEmpty(data.user.fullname)) {
            errors.user.fullname = 'Name is required';
        }
        if (!Validator.isLength(data.user.fullname, { min: 3, max: 100 })){
            errors.user.fullname = 'Must be at least 3 until 100 character'
        }

        if (isEmpty(data.user.postcode)) {
            errors.user.postcode = 'Kode POS is required';
        }
        if (!Validator.isLength(data.user.postcode, { min: 1, max: 100 })) {
            errors.user.postcode = 'Must be at least 1 until 100 character'
        }


        if (typeof data.user.district_id == "undefined" || data.user.district_id == "" || data.user.district_id == null ) {
            errors.user.district_id = 'Kecamatan is required';
        }

        if (typeof data.user.province_id == "undefined" || data.user.province_id == "" || data.user.province_id == null) {
            errors.user.province_id = 'Provinsi is required';
        }
        if (typeof data.user.regency_id == "undefined" || data.user.regency_id == "" || data.user.regency_id == null) {
            errors.user.regency_id = 'Kabupaten/kota is required';
        }
        if (typeof data.user.village_id == "undefined" || data.user.village_id == "" || data.user.village_id == null) {
            errors.user.village_id = 'Kelurahan is required';
        }

        if (data.user.district_id && !data.user.district_id.hasOwnProperty('label')){
            errors.user.district_id = 'Kecamatan is required';
        }
        if (data.user.province_id && !data.user.province_id.hasOwnProperty('label')){
            errors.user.province_id = 'Provinsi is required';
        }
        if (data.user.regency_id && !data.user.regency_id.hasOwnProperty('label')){
            errors.user.regency_id = 'Kabupaten/kota is required';
        }
        if (data.user.village_id && !data.user.village_id.hasOwnProperty('label')){
            errors.user.village_id = 'Kelurahan is required';
        }

    }


   
  


  
    if (Object.keys(errors.carts).length === 0){
        delete errors.carts;
    }
 

    if(Object.keys(errors.user).length == 0){
        delete errors.user;
    }
    
    if(Object.keys(errors.shipping).length == 0){
        delete errors.shipping;
    }
    if (Object.keys(errors.vouchers).length == 0) {
        delete errors.vouchers;
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}
