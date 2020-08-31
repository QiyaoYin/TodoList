//const SERVER_URL = 'http://192.168.0.103:4000/';
const SERVER_URL = 'http://118.178.143.29:8000/'
export default {
    install(Vue){
        Vue.prototype._URL = SERVER_URL;
        Vue.prototype.bgUrl = ()=> (`https://picsum.photos/${document.body.clientWidth}/${document.body.clientHeight}/?t=${new Date().getTime()}&blur`);
    }
}