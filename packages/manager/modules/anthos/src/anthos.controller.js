export default class AnthosTenantsCtrl {
  /* @ngInject */
  constructor(AnthosTenantsService) {
    this.AnthosTenantsService = AnthosTenantsService;
  }

  $onInit() {
    this.guides = this.AnthosTenantsService.getGuides();
  }
}
