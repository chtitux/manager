import angular from 'angular';

import beneficiaries from './beneficiaries';
import identity from './identity';

const moduleName = 'TelephonySvaWalletKyc';

angular
  .module(moduleName, [beneficiaries, identity])
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
