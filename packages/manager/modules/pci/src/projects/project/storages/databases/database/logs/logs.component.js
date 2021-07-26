import controller from './logs.controller';
import template from './logs.html';
import './logs.scss';

export default {
  bindings: {
    projectId: '<',
    trackDatabases: '<',
  },
  controller,
  template,
};
