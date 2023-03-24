import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import PouchDB from "pouchdb"

const app = createApp(App)
  .use(IonicVue)
  .use(router);

  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
if(localStorage.getItem("usercode") == ""){
  const tempcode = makeid(25)
  localStorage.setItem("usercode", tempcode)
  const database_actions = new PouchDB('https://pouch.deqstudio.com/database_actions:' + tempcode);
  app.config.globalProperties.$database_actions = database_actions;
}else{
  const database_actions = new PouchDB('https://pouch.deqstudio.com/database_actions:' + localStorage.getItem("usercode"));
  app.config.globalProperties.$database_actions = database_actions;
}



  
router.isReady().then(() => {
  app.mount('#app');
});