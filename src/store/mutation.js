import storage from "../utils/storage"
export default{
    saveInfo(state,adminInfo){
        state.adminInfo = adminInfo;
        storage.setItem('adminInfo',adminInfo)
    }
} 