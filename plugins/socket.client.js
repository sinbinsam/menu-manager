import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
 
export default function () {
 Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://192.168.1.3:8200',
 }))
}