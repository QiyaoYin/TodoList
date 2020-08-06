const SERVER_URL = 'http://127.0.0.1:4000/';

export default {
    install(Vue){
        Vue.prototype._URL = SERVER_URL;
        Vue.prototype.bgUrl = `https://picsum.photos/${document.body.clientWidth}/${document.body.clientHeight}`;
    }
}