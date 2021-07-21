import angular from 'angular';
import { MAX_BENEFICIARIES } from './beneficiaries.constants';
import { buildEnumList } from '../../sva-wallet.constants';

export default class BeneficiariesController {
  /* @ngInject */
  constructor($translate, $attrs) {
    this.$translate = $translate;
    this.$attrs = $attrs;
  }

  $onInit() {
    if (
      angular.isDefined(this.$attrs.editable) &&
      this.$attrs.editable === ''
    ) {
      this.editable = true;
    }

    this.resetState();

    this.countriesValues = buildEnumList(
      this.countryEnum.filter((countryCode) => countryCode !== 'UNKNOWN'),
      'telephony_billingAccount_svaWallet_kyc_identity_country_',
      this.$translate,
    );
  }

  resetState() {
    this.showBeneficiaryForm = false;
    this.canAddBeneficiaries =
      this.editable && this.beneficiaries.length < MAX_BENEFICIARIES;
  }

  displayBeneficiatyForm() {
    this.showBeneficiaryForm = true;
  }

  saveBeneficiary(beneficiary) {
    this.beneficiaries = [...this.beneficiaries, beneficiary];
    this.resetState();
  }

  cancelBeneficiary() {
    this.resetState();
  }
}
