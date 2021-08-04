import angular from 'angular';
import { isString, get } from 'lodash-es';
import { RejectType } from '@uirouter/angularjs';
import { registerCoreModule } from '@ovh-ux/manager-core';
import { detach as detachPreloader } from '@ovh-ux/manager-preloader';
import '@ovh-ux/ng-ui-router-layout';
import '@ovh-ux/ng-ui-router-line-progress';
import '@ovh-ux/ng-ui-router-breadcrumb';
import ovhManagerNetApp from '@ovh-ux/manager-netapp';

import 'script-loader!moment/min/moment.min.js'; // eslint-disable-line
import 'ovh-ui-kit-bs/dist/css/oui-bs3.css';
import '@ovh-ux/ui-kit/dist/css/oui.css';

import errorPage from './error';

export default (containerEl, environment) => {
  const moduleName = 'netappApp';

  angular
    .module(
      moduleName,
      [
        registerCoreModule(environment),
        'ngOvhUiRouterLayout',
        'ngOvhUiRouterLineProgress',
        'ngUiRouterBreadcrumb',
        'ui.router',
        errorPage,
        ovhManagerNetApp,
        ...get(__NG_APP_INJECTIONS__, environment.getRegion(), []),
      ].filter(isString),
    )
    .config(
      /* @ngInject */ ($locationProvider) => $locationProvider.hashPrefix(''),
    )
    .config(
      /* @ngInject */ ($urlRouterProvider) => {
        $urlRouterProvider.otherwise('/netapp');
      },
    )
    .run(
      /* @ngInject */ ($rootScope, $transitions) => {
        const unregisterHook = $transitions.onSuccess({}, () => {
          detachPreloader();
          $rootScope.$broadcast('app:started');
          unregisterHook();
        });
      },
    )
    .run(
      /* @ngInject */ ($state) => {
        $state.defaultErrorHandler((error) => {
          if (error.type === RejectType.ERROR) {
            $state.go(
              'error',
              {
                detail: {
                  message: error.detail?.data?.message,
                  code: error.detail.headers
                    ? error.detail.headers('x-ovh-queryId')
                    : null,
                },
              },
              { location: false },
            );
          }
        });
      },
    );

  angular.bootstrap(containerEl, [moduleName], {
    strictDi: true,
  });

  return moduleName;
};
