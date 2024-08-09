import { TResponseApiType } from "../../../api/models/api.response.model";
import {
  IP_GET_USER_NAME_REQUEST,
  IP_GET_USER_NAME_SUCCESS,
  IP_GET_USER_NAME_FAILURE,
} from "../../constants/public-constants/public-component.constant";

export const getUserNamePublicViaIpRequest = () => {
  return {
    type: IP_GET_USER_NAME_REQUEST,
  };
};
export const getUserNamePublicViaIpSuccess = (data: TResponseApiType) => {
  return {
    type: IP_GET_USER_NAME_SUCCESS,
    payload: data,
  };
};
export const getUserNamePublicViaIpFailure = (error: TResponseApiType) => {
  return {
    type: IP_GET_USER_NAME_FAILURE,
    payload: error,
  };
};
