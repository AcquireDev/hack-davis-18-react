export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const LOOKUP_JWT = "LOOKUP_JWT";
export const LOOKUP_JWT_SUCCESS = "LOOKUP_JWT_SUCCESS";

export const getUser = () => ({
  type: GET_USER
});

export const loginUser = (email, password) => ({
  type: LOGIN_USER,
  email: email,
  password: password
});

export const lookupJWT = () => ({
  type: LOOKUP_JWT
});
