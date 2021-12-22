/**
 * Storage二次封装
 * @author SRayJay
 */

import config from "./../config/index"
export default {
    getItem(key){
        return this.getStorage()[key]
    },
    setItem(key,val){
        let storage = this.getStorage()
        storage[key] = val;
        window.localStorage.setItem(config.namespace,JSON.stringify(storage))
    },
    getStorage(){
        return JSON.parse(window.localStorage.getItem(config.namespace)||"{}")
    },
    clearItem(key){
        let storage = this.getStorage()
        delete storage[key]
        window.localStorage.setItem(config.namespace,JSON.stringify(storage))
    },
    clearAll(){
        window.localStorage.clear()
    }

}
