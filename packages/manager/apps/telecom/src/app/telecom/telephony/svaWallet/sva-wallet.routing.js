export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('telecom.telephony.billingAccount.svaWallet', {
    url: '/sva-wallet',
    views: {
      'telephonyView@telecom.telephony': {
        componentProvider: /* @ngInject */ (getSvaWallet) => {
          return getSvaWallet()
            .then((svaWallet) => {
              if (svaWallet.status) {
                return 'telephonySvaWalletKycIdentityDocuments';
              }
              return 'telephonySvaWalletKycIdentityDocuments';
            })
            .catch(() => {
              return 'telephonySvaWalletKycIdentityForm';
            });
        },
      },
    },
    resolve: {
      breadcrumb: /* @ngInject */ ($translate) =>
        $translate.instant('telephony_billingAccount_svaWallet_kyc_title'),
      companyKinds: /* @ngInject */ (TelephonySvaWalletService) =>
        TelephonySvaWalletService.getCompanyKinds(),

      meSchema: /* @ngInject */ ($http) =>
        $http.get('/me.json').then(({ data: schema }) => schema),

      countryEnum: /* @ngInject */ (meSchema) =>
        meSchema.models['nichandle.CountryEnum'].enum,

      documentTypeEnum: /* @ngInject */ (meSchema) =>
        meSchema.models['me.sva.document.TypeEnum'].enum,
      documentNatureEnum: /* @ngInject */ (meSchema) =>
        meSchema.models['me.sva.document.NatureEnum'].enum,

      goToBillingAccount: /* @ngInject */ ($state) => () =>
        $state.go('telecom.telephony.billingAccount'),
    },
  });
};
