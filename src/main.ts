import {createApp} from 'vue'
import App from './App.vue'
import "./assets/css/styles.css"

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faHandPointUp, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';

library.add(faHandPointUp, faChevronLeft, faChevronRight);

createApp(App).component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
