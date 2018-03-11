export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";

export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const LOOKUP_JWT = "LOOKUP_JWT";
export const LOOKUP_JWT_SUCCESS = "LOOKUP_JWT_SUCCESS";

export const LOGOUT = "LOGOUT";

export const getUser = () => ({
  type: GET_USER
});

export const logout = () => ({
  type: LOGOUT
});

export const loginUser = (email, password) => ({
  type: LOGIN_USER,
  email,
  password
});

export const createUser = (email, password) => ({
  type: CREATE_USER,
  email,
  password
});

export const lookupJWT = () => ({
  type: LOOKUP_JWT
});
