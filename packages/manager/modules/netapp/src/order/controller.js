import { uniq } from 'lodash-es';

export default class OvhManagerNetAppOrderCtrl {
  /* @ngInject */
  constructor($translate) {
    this.$translate = $translate;
  }

  $onInit() {
    this.regions = uniq(
      this.catalog.plans.flatMap(
        ({ configurations }) =>
          configurations.find(({ name }) => name === 'region').values,
      ),
    );
    console.log(this.regions);
  }
}
