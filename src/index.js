import '@/custom'

import Draggable from 'vuedraggable'
import VueQr from 'vue-qr'
import Breadcrumb from './components/Breadcrumb'
import Hamburger from './components/Hamburger'
import SvgIcon from './components/SvgIcon'
import Layout from './layout'
import RouteView from './components/route-view'
import SearchForm from './components/search-form'
import SearchFormItem from './components/search-form-item'
import Page from './components/page'
import DialogFooter from './components/dialog-footer'
import ImportDialog from './components/import-dialog'
import ExportDialog from './components/export-dialog'
import ProgressDialog from './components/progress-dialog'
import ViewLog from './components/view-log'
import Editor from './components/editor'
import Editable from './components/editable'
import FixedThead from './components/fixed-thead'
import SubmitButton from './components/submit-button'
import ExpandIcon from './components/expand-icon'
import ResultColumn from './components/result-column'
import ImageColumn from './components/image-column'
import InputColumn from './components/input-column'
import BoolColumn from './components/bool-column'
import SelectColumn from './components/select-column'
import SwitchColumn from './components/switch-column'
import LinkColumn from './components/link-column'
import MapColumn from './components/map-column'
import NumberColumn from './components/number-column'
import ActionColumn from './components/action-column'
import DataTable from './components/data-table'
import ImageSelect from './components/image-select'
import PhotoFrame from './components/photo-frame'
import PhotoAlbum from './components/photo-album'
import Watermark from './components/watermark'
import TreeSelect from './components/tree-select'
import TreeLayout from './components/tree-layout'
import InputRange from './components/input-range'
import DateRange from './components/date-range'
import DateTimeRange from './components/date-time-range'
import JustifyText from './components/justify-text'
import Row from './components/row'
import Card from './components/card'
import FlexItem from './components/flex-item'
import Cascader from './components/cascader'

import ViewLogDialog from './business/view-log-dialog'
import SwitchUserDialog from './business/switch-user-dialog'

const components = [
  Draggable,
  VueQr,
  Breadcrumb,
  Hamburger,
  SvgIcon,
  Layout,
  RouteView,
  SearchForm,
  SearchFormItem,
  Page,
  DialogFooter,
  ImportDialog,
  ExportDialog,
  ProgressDialog,
  ViewLog,
  Editor,
  Editable,
  FixedThead,
  SubmitButton,
  ExpandIcon,
  ResultColumn,
  ImageColumn,
  InputColumn,
  BoolColumn,
  SelectColumn,
  SwitchColumn,
  LinkColumn,
  MapColumn,
  NumberColumn,
  ActionColumn,
  DataTable,
  ImageSelect,
  PhotoFrame,
  PhotoAlbum,
  Watermark,
  TreeSelect,
  TreeLayout,
  InputRange,
  DateRange,
  DateTimeRange,
  JustifyText,
  Row,
  Card,
  FlexItem,
  Cascader,
  ViewLogDialog,
  SwitchUserDialog
]

import settings from '@/settings'
import request from '@/utils/request'
import { asyncRoutes } from '@/router'

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  // 重新设置
  if (opts.settings) {
    Object.assign(settings, opts.settings)
  }

  // 基础地址
  if (opts.baseUrl) {
    request.defaults.baseURL = opts.baseUrl
  }

  // 定制路由
  if (opts.routes) {
    asyncRoutes.unshift(...opts.routes)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components
}

export { default as router } from './router'
export { default as store } from './store'
export { default as Layout } from './layout'
export { default as RouteView } from './components/route-view'
export { default as Redirect } from '@/views/redirect'
export { default as Login } from '@/views/login/index'
export { default as E404 } from '@/views/404'
export { default as Dashboard } from '@/views/dashboard/index'
export { default as request } from '@/utils/request'
export { default as ChartResize } from '@/mixins/chart_resize'

export * from './utils/auth'
export * from './utils/index'
export * from './utils/request'
export * from './utils/validate'