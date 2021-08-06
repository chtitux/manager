import template from './anthos.html';
import controller from './anthos.controller';

export default {
  template,
  controller,
  bindings: {
    me: '<',
    guides: '<',
    tenants: '<',
    getServiceNameLink: '<',
  },
};
