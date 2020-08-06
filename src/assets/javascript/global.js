const SERVER_URL = 'http://192.168.0.109:4000/';

export default {
    install(Vue){
        Vue.prototype._URL = SERVER_URL;
        Vue.prototype.bgUrl = ()=> (`https://picsum.photos/${document.body.clientWidth}/${document.body.clientHeight}/?t=${new Date().getTime()}&blur`);
    }
}