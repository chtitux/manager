import angular from 'angular';

import '@ovh-ux/manager-core';
import '@ovh-ux/ng-ovh-cloud-universe-components';
import '@uirouter/angularjs';
import 'angular-translate';
import 'ovh-api-services';
import 'ovh-ui-angular';

import 'ovh-ui-kit/dist/oui.css';
import './logs-account-password.less';

import controller from './logs-account-password.controller';

const moduleName = 'ovhManagerDbaasLogsDetailAccountPassword';

angular
  .module(moduleName, [
    'angularMoment',
    'ngOvhCloudUniverseComponents',
    'oui',
    'ovhManagerCore',
    'ovh-api-services',
    'pascalprecht.translate',
    'ui.router',
  ])
  .controller('LogsAccountPasswordCtrl', controller);

export default moduleName;
