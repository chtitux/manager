export default class ProfileTileController {
  $onInit() {
    this.svaWalletStatus = {
      valid: this.svaWallet.kyc.status === 'UP_TO_DATE',
      pending: this.svaWallet.kyc.status === 'INIT',
      error: !['UP_TO_DATE', 'INIT'].includes(this.svaWallet.kyc),
    };
  }
}
