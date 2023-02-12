//External Lib  import
import { ObjectId } from 'mongodb';

export const objectId = (value: string, helpers: any) => {
  if (!ObjectId.isValid(value)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

export const nid = (value: string, helpers: any) => {
  if (value.length < 8) {
    return helpers.message('Invalid Nid Number');
  }
  return value;
};

export const password = (value: string, helpers: any) => {
  if (value.length < 8) {
    return helpers.message('Password must be at least 8 digits long');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      'Password must contain at least one letter and number'
    );
  }
  return value;
};

export const mobile = (value: string, helpers: any) => {
  if (!value.match('^(?:\\+88|88)?(01[3-9]\\d{8})$')) {
    return helpers.message('Please enter the correct number');
  }
  return value;
};

export const email = (value: string, helpers: any) => {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return helpers.message(
      'Please enter the correct Please enter the correct email'
    );
  }
  return value;
};
