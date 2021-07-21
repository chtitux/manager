export const STATUS = {
  EXPIRED: 'EXPIRED',
  INIT: 'INIT',
  INVALID: 'INVALID',
  NEED_MANUAL_VALIDATION: 'NEED_MANUAL_VALIDATION',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  UP_TO_DATE: 'UP_TO_DATE',
  WAITING_FOR_UPLOAD: 'WAITING_FOR_UPLOAD',
};

export const STATUS_DOWNLOAD = [
  STATUS.INIT,
  STATUS.WAITING_FOR_UPLOAD,
  STATUS.INVALID,
  STATUS.REJECTED,
  STATUS.EXPIRED,
];

export const STATUS_OK = [STATUS.UP_TO_DATE];

export const STATUS_PENDING = [STATUS.NEED_MANUAL_VALIDATION, STATUS.PENDING];

export const canDownload = (document) =>
  STATUS_DOWNLOAD.includes(document.status);
export const isValid = (document) => STATUS_OK.includes(document.status);
export const isPending = (document) => STATUS_PENDING.includes(document.status);

export const getBeneficiaries = (wallet) => {
  return [
    ...wallet.beneficiaries,
    ...(wallet.company.representativeIsBeneficiary
      ? [wallet.company.representative]
      : []),
  ];
};

export default {
  STATUS,
  canDownload,
  isValid,
  isPending,
  getBeneficiaries,
};
