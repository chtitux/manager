import Tenant from './Tenant.class';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('anthos.index', {
    url: '?',
    component: 'anthosTenants',
    redirectTo: (transition) =>
      transition
        .injector()
        .getAsync('tenants')
        .then((tenants) =>
          tenants.length === 0
            ? {
                state: 'anthos.onboarding',
              }
            : false,
        ),
    resolve: {
      breadcrumb: /* @ngInject */ ($translate) =>
        $translate.instant('anthos_tenants'),

      me: /* @ngInject */ ($http) =>
        $http
          .get('/me')
          .then(({ data }) => data)
          .catch(() => {}),

      tenants: /* @ngInject */ ($q, me, AnthosTenantsService) =>
        AnthosTenantsService.getTenants().then((tenantServices) =>
          $q
            .all(
              tenantServices.map((serviceName) => {
                return AnthosTenantsService.getTenantDetails(
                  serviceName,
                ).catch(() => {});
              }),
            )
            .then((tenants) => {
              return tenants
                .filter((tenant) => tenant !== undefined)
                .map((tenant) => new Tenant(tenant, me.ovhSubsidiary));
            }),
        ),

      getServiceNameLink: /* @ngInject */ ($state) => ({ serviceName }) =>
        $state.href('anthos.dashboard', {
          serviceName,
        }),
    },
  });
};
