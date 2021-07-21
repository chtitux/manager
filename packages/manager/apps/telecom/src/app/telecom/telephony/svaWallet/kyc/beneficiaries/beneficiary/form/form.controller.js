import { buildEnumList } from '../../../../sva-wallet.constants';

export default class BeneficiariesController {
  /* @ngInject */
  constructor($translate) {
    this.$translate = $translate;
  }

  $onInit() {
    this.beneficiary = {};

    this.countriesValues = buildEnumList(
      this.countryEnum.filter((countryCode) => countryCode !== 'UNKNOWN'),
      'telephony_billingAccount_svaWallet_kyc_country_',
      this.$translate,
    );
  }

  saveBeneficiary() {
    this.onSubmit({ beneficiary: this.beneficiary });
  }

  cancelBeneficiary() {
    this.onCancel();
  }
}
