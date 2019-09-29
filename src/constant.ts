class MutationTypes {
  public static readonly SET_LOGIN_REDIRECT = 'SET_LOGIN_REDIRECT'
  public static readonly SET_ROUTE_MAP = 'SET_ROUTE_MAP'
  public static readonly SET_RECIPE_LIST = 'SET_RECIPE_LIST'
  public static readonly REQUEST_TOKEN = 'REQUEST_TOKEN'
  public static readonly SET_TOKEN = 'SET_TOKEN'
  public static readonly REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR'
  public static readonly CLEAR_TOKEN = 'CLEAR_TOKEN'
  public static readonly SET_LOGIN_STATUS = 'SET_LOGIN_STATUS'
  public static readonly SET_AVATAR = 'SET_AVATAR'
  public static readonly REQUEST_USER = 'REQUEST_USER'
  public static readonly SET_USER = 'SET_USER'
  public static readonly REQUEST_USER_ERROR = 'REQUEST_USER_ERROR'
  public static readonly CLEAR_USER = 'CLEAR_USER'
  public static readonly SET_AUTHOR = 'SET_AUTHOR'
  public static readonly SET_RECIPE = 'SET_RECIPE'
  public static readonly SET_RECIPE_PUBLISH_STATUS = 'SET_RECIPE_PUBLISH_STATUS'
  public static readonly SET_ALERT = 'SET_ALERT'
  public static readonly RESET_ALERT = 'RESET_ALERT'
}

class ActionTypes {
  public static readonly LOGIN_REDIRECT = 'LOGIN_REDIRECT'
  public static readonly CURRENT_ROUTE = 'CURRENT_ROUTE'
  public static readonly REGISTER = 'REGISTER'
  public static readonly LOGIN = 'LOGIN'
  public static readonly LOGOUT = 'LOGOUT'
  public static readonly GET_USER = 'GET_USER'
  public static readonly GET_AUTHOR = 'GET_AUTHOR'
  public static readonly UPLOAD_AVATAR = 'UPLOAD_AVATAR'
  public static readonly GET_RECIPE_LIST = 'GET_RECIPE_LIST'
  public static readonly CREATE_RECIPE = 'CREATE_RECIPE'
  public static readonly UPDATE_RECIPE = 'UPDATE_RECIPE'
  public static readonly DELETE_RECIPE = 'DELETE_RECIPE'
  public static readonly PUBLISH_RECIPE = 'PUBLISH_RECIPE'
  public static readonly UNPUBLISH_RECIPE = 'UNPUBLISH_RECIPE'
  public static readonly GET_RECIPE = 'GET_RECIPE'
  public static readonly GET_USER_RECIPE_LIST = 'GET_USER_RECIPE_LIST'
  public static readonly OPEN_ALERT = 'OPEN_ALERT'
  public static readonly CLOSE_ALERT = 'CLOSE_ALERT'
}

export {
  MutationTypes, ActionTypes
}
