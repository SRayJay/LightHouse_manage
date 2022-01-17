
import { createStore } from "vuex";
import mutation from './mutation';
import storage from './../utils/storage';


const state = {
    adminInfo: "" || storage.getItem('adminInfo')
}
export default createStore({
    state,
    mutation
})