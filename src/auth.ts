import * as localforage from "localforage";
import { store } from '@/store'

store.getters.appSettings
localforage.config(
  {
      driver: localforage.LOCALSTORAGE,
      name: 'smile_sook',
      storeName: 'auth_data',
      version: 1.0,
      description : ''
  }
)

function cleanLocalForage(){
  localforage.removeItem(AUTH_TYPE);
  localforage.removeItem(FACEBOOK_AUTH_TOKEN);
  localforage.removeItem(GOOGLE_AUTH_TOKEN);
}


function authStatusCheck () : boolean | any {
  localforage.getItem('access_token').then((access_token)=>{
    
  }).catch(()=>{
    return false
  })
}

function isLoginStatus () : boolean {
  return store.state.isLogin === true
}

export { authStatusCheck, localforage, isLoginStatus }