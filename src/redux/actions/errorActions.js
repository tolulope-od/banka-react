import { GET_ERRORS, CLEAR_ERRORS } from './types';

export const getErrors = error => ({ type: GET_ERRORS, payload: error });
export const clearErrors = () => ({ type: CLEAR_ERRORS });
