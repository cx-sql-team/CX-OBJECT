/**
 * Created by caiyihua on 2018/7/3.
 */
import search from "./search";
import table from "./table";
// import table from './table';
import button from "./button";
import condition from "./condition";
import dialog from "./dialog";
// import slidervalid from './slidervalid';
// import searchSet from './searchSet';
// import ewTree from './tree';
// import ewGo from './go';
let components = [
  table,
  search,
  button,
  condition,
  dialog,

  // slidervalid,
  // newtable,
  // searchSet,
  // ewTree,
  // ewGo,
];

const install = function(Vue) {
  if (install.installed) {
      return;
  }
  components.map(component => {
    Vue.component(component.name, component);
  });
};

export default install;
