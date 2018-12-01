import Vue from 'vue'
import storage from 'storage-controller'
// import AwesomePicker from 'vue-awesome-picker'
// import echarts from 'echarts'
import base from '@mixins/base'
import * as handle from './cos/handle'
import { fileType } from './cos/file-config'
import * as cos from './cos/cos'
import * as vod from './vod/vod'
// import Toast from '@components/toast'
// import Loading from '@components/_loading'
import createQrCode from './create-qr-code'

const ERR_OK = 0

// 定义插件
const AppPlugin = {
  install: function () {
    Vue.mixin(base)
    // Vue.prototype.$echarts = echarts todo
    Vue.prototype.$ERR_OK = ERR_OK
    Vue.prototype.$handle = handle
    Vue.prototype.$cosFileType = fileType
    Vue.prototype.$cos = cos
    Vue.prototype.$vod = vod
    Vue.prototype.$createQrCode = createQrCode
    Vue.prototype.$storage = storage
  }
}
// 使用插件
Vue.use(AppPlugin)
// Vue.use(AwesomePicker) todo
// Vue.use(Toast)
// Vue.use(Loading)
