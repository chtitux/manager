import angular from 'angular';

import '@ovh-ux/manager-core';
import '@uirouter/angularjs';
import 'angular-translate';

import component from './logs-list-header.component';

const moduleName = 'ovhManagerDbaasLogsHeaderList';

angular
  .module(moduleName, ['ovhManagerCore', 'pascalprecht.translate', 'ui.router'])
  .component('dbaasLogsListHeader', component);

export default moduleName;
