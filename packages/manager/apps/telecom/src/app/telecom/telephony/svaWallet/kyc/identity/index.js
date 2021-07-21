import angular from 'angular';

import formComponent from './form/form.component';
import documentsComponent from './documents/documents.component';

const moduleName = 'TelephonySvaWalletKycIdentity';

angular
  .module(moduleName, [])
  .component('telephonySvaWalletKycIdentityForm', formComponent)
  .component('telephonySvaWalletKycIdentityDocuments', documentsComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
