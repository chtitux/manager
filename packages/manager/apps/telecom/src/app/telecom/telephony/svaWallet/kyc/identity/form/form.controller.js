import {
  DISPLAY_BENEFICIARIES_KINDS,
  FIELDS_BY_TYPES,
  TYPES,
} from '../identity.constants';

import { VALIDATORS } from './form.constants';
import { buildEnumList } from '../../../sva-wallet.constants';

export default class KycIdentityFormController {
  /* @ngInject */
  constructor($q, $translate) {
    this.$q = $q;
    this.$translate = $translate;
  }

  $onInit() {
    this.TYPES = TYPES;
    this.VALIDATORS = VALIDATORS;

    this.form = {
      type: TYPES.PRO,
      company: {
        representativeIsBeneficiary: false,
      },
      beneficiaries: [],
    };

    this.fieldsToDisplay = FIELDS_BY_TYPES[this.form.type];
    this.displayBeneficiaries = false;

    this.loading = {
      submit: false,
    };

    this.companyKindsValues = buildEnumList(
      this.companyKinds,
      'telephony_billingAccount_svaWallet_kyc_company_kind_',
      this.$translate,
    );

    this.countriesValues = buildEnumList(
      this.countryEnum.filter((countryCode) => countryCode !== 'UNKNOWN'),
      'telephony_billingAccount_svaWallet_kyc_country_',
      this.$translate,
    );
  }

  onTypeChange(type) {
    this.fieldsToDisplay = FIELDS_BY_TYPES[type];
  }

  shouldDisplay(fieldName) {
    return this.fieldsToDisplay.includes(fieldName);
  }

  onCompanyKindChange({ value }) {
    this.displayBeneficiaries = DISPLAY_BENEFICIARIES_KINDS.includes(value);
  }

  submit() {
    this.loading.submit = true;
  }
}
