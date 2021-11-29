import Vue from 'vue'
import App from './App.vue'
import router from "../src/common/router"
import store from "../src/common/store"
import axios from "./http"
import { Image,Input,Form,
  FormItem,Button,Select,Message,
  Option,Dropdown,
  DropdownMenu,
  DropdownItem,Menu,MenuItem,Row,
  Col,MenuItemGroup,Submenu,Dialog ,Table,Popover,
  TableColumn,Tag,TimePicker,Radio,DatePicker,Pagination,Autocomplete
} from "element-ui"
Vue.use(Table)
Vue.use(Autocomplete)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Radio)
Vue.use(TimePicker)
Vue.use(Tag)
Vue.use(Popover)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Col)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Image)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.prototype.$axios = axios;
Vue.prototype.$message = Message;
// 移动端适配
import 'amfe-flexible'
import 'amfe-flexible/index.js'
import './common/reset.css'
// music
import vueAplayer from 'vue-aplayer'
// markdown
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.use(vueAplayer)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
