// import CommonTable from '../components/common/commonTable'
// import CommonForm from '../components/common/commonForm'
// import CommonDialog from '../components/common/commonDialog'
// import DrapTable from '../components/common/drapTable'
// import EditTable from '../components/common/editTable'
// import SortTable from '../components/common/sortTable'
// import BasicTable from '../components/common/basicTable'
// import TreeTable from '../components/common/treeTable'
// import IconSvg from '../components/common/IconSvg'
// import Reporte from '../components/common/reporte'
// import BasicForm from '../components/common/basicForm'
// export default (Vue) => {
//   Vue.component('CommonTable', CommonTable)
//   Vue.component('CommonForm', CommonForm)
//   Vue.component('CommonDialog', CommonDialog)
//   Vue.component('DrapTable', DrapTable)
//   Vue.component('EditTable', EditTable)
//   Vue.component('SortTable', SortTable)
//   Vue.component('BasicTable', BasicTable)
//   Vue.component('TreeTable', TreeTable)
//   Vue.component('icon-svg', IconSvg)
//   Vue.component('Reporte', Reporte)
//   Vue.component('BasicForm', BasicForm)
//   // Vue.component('LineEditTable', LineEditTable)
// }
let getFileName = n =>{
  let list = n.split('/')
  let name = list[list.length-1].replace('.vue','')
  return name.charAt(0).toUpperCase() + name.slice(1)
}
let file = require.context('../components/common', true, /\.vue$/);
export default (Vue) =>{
  file.keys().forEach(e => {
    Vue.component(getFileName(e), file(e).default)
  });
}
