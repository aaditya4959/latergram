import {atom} from "recoil"

function checkUserToken(){
    const token = localStorage.getItem("token");
    if(token){
        return true;
    }else{
        false;
    }
}

export const userSignedIn = atom({
    key:"userSignedIn",
    default: checkUserToken()
})