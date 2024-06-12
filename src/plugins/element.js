import Vue from 'vue'
import { Form, FormItem, Input, Button, Message, Container, Dropdown, DropdownItem, DropdownMenu, Header, Aside, Main, Descriptions, Menu, MenuItem, Submenu, Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Dialog, Switch, Pagination, DescriptionsItem, MessageBox, Popover } from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css' // UI组件样式
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox