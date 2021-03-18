angular
  .module('Billing')
  .config(($stateProvider) => {
    $stateProvider.state('app.account.billing.main', {
      url: '',
      templateUrl: 'billing/main/billing-main.html',
      controller: 'BillingMainCtrl',
      controllerAs: '$ctrl',
      translations: { value: ['../main'], format: 'json' },
      redirectTo: 'app.account.billing.main.history',
      resolve: {
        isPayAsYouGoAvailable: /* @ngInject */ (ovhFeatureFlipping) =>
          ovhFeatureFlipping
            .checkFeatureAvailability(['billing:payAsYouGo'])
            .then((commitmentAvailability) =>
              commitmentAvailability.isFeatureAvailable('billing:payAsYouGo'),
            )
            .catch(() => false),
        breadcrumb: /* @ngInject */ ($translate) =>
          $translate.instant('billing_main_title'),
      },
    });
  })
  .run(/* @ngTranslationsInject:json ./translations */);