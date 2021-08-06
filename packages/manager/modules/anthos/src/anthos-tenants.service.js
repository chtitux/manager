import { ANTHOS_DOCS_NAME } from './anthos.constants';

export default class AnthosTenantsService {
  /* @ngInject */
  constructor($http, $translate, ovhDocUrl) {
    this.$http = $http;
    this.$translate = $translate;
    this.ovhDocUrl = ovhDocUrl;
  }

  getTenants() {
    return this.$http.get('/dedicated/anthos/tenants').then(({ data }) => data);
  }

  getTenantDetails(serviceName) {
    return this.$http
      .get(`/dedicated/anthos/tenants/${serviceName}`)
      .then(({ data }) => data);
  }

  getGuides() {
    const guides = {};
    guides.title = this.$translate.instant('anthos_tenants_guides');
    guides.list = [
      {
        name: this.$translate.instant('anthos_tenants_guides_all'),
        url: this.ovhDocUrl.getDocUrl(ANTHOS_DOCS_NAME),
        external: true,
      },
    ];

    return guides;
  }
}
