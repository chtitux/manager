import angular from 'angular';

import beneficiariesComponent from './beneficiaries.component';
import beneficiaryFormComponent from './beneficiary/form/form.component';
import beneficiariesListComponent from './list/list.component';
import beneficiaryResumeComponent from './beneficiary/resume/resume.component';

const moduleName = 'TelephonySvaWalletKycIdentityFormBeneficiaries';

angular
  .module(moduleName, [])
  .component('telephonySvaWalletKycBeneficiaries', beneficiariesComponent)
  .component('telephonySvaWalletKycBeneficiaryForm', beneficiaryFormComponent)
  .component(
    'telephonySvaWalletKycBeneficiariesList',
    beneficiariesListComponent,
  )
  .component(
    'telephonySvaWalletKycBeneficiaryResume',
    beneficiaryResumeComponent,
  )
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
