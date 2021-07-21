import {
  getBeneficiaries,
  isValid,
  canDownload,
  isPending,
} from './documents.constants';
import { buildEnumList } from '../../../sva-wallet.constants';

export default class KycIdentityDocumentsController {
  /* @ngInject */
  constructor($q, $timeout, $translate) {
    this.$q = $q;
    this.$timeout = $timeout;
    this.$translate = $translate;
  }

  $onInit() {
    this.isLoading = true;

    this.documents = [];

    this.documentTypes = buildEnumList(
      this.documentTypeEnum,
      'telephony_billingAccount_svaWallet_kyc_documents_type_',
      this.$translate,
    );

    this.documentNatures = buildEnumList(
      this.documentNatureEnum,
      'telephony_billingAccount_svaWallet_kyc_documents_nature_',
      this.$translate,
    );

    this.getSvaWallet().then((svaWallet) => {
      this.svaWallet = svaWallet;

      const beneficiaries = getBeneficiaries(this.svaWallet);

      this.documents = this.svaWallet.kyc.documents.map((document) => {
        return {
          ...document,
          beneficiary: beneficiaries.find(
            (beneficiary) => beneficiary.id === document.personalInfoId,
          ),
          isValid: isValid(document),
          isPending: isPending(document),
          canDownload: canDownload(document),
        };
      });
      this.isLoading = false;
    });
  }

  download(documentId) {
    // TODO : add download on documentToDownload
    const documentToDownload = this.documents.find(
      (document) => document.id === documentId,
    );
    // eslint-disable-next-line no-console
    console.log('download', documentToDownload);
  }
}
