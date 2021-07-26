import controller from './databases.controller';
import template from './databases.html';

export default {
  bindings: {
    databaseGuideUrl: '<',
    goToAddDatabase: '<',
    databaseLink: '<',
    goToDatabase: '<',
    goToDeleteDatabase: '<',
    guideUrl: '<',
    engines: '<',
    databaseId: '<',
    databases: '<',
    onListParamChange: '<',
    projectId: '<',
    trackDatabases: '<',
  },
  controller,
  template,
};
