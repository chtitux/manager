import angular from 'angular';
import '@ovh-ux/manager-core';
import '@uirouter/angularjs';
import 'angular-translate';

import component from './component';
import routing from './routing';

import create from './create';
import deleteModule from './delete';

const moduleName = 'ovhManagerNetAppVolumes';

angular
  .module(moduleName, [
    'ovhManagerCore',
    'pascalprecht.translate',
    'ui.router',
    create,
    deleteModule,
  ])
  .config(routing)
  .component('ovhManagerNetAppVolumes', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
