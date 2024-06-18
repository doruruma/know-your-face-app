import 'animate.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import '@/styles/main.scss'
import '@sweetalert2/theme-bulma/bulma.scss'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'
import { md2 } from 'vuetify/blueprints'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
  blueprint: md2,
  defaultSet: 'mdi',
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.indigo.base,
          secondary: colors.grey.lighten4
        }
      }
    }
  }
})

app.use(router)
  .use(vuetify)
  .mount('#app')
