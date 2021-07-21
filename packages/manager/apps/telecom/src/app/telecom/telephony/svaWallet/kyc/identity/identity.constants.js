export const FIELDS_BY_TYPES = {
  RESELLER: [
    'companyArcep',
    'companySocial',
    'companySiret',
    'companyApe',
    'companyKind',
    'companyDescription',
    'companyAddress',
    'companyCountry',
    'representativeLastname',
    'representativeFirstname',
    'representativeBirthcity',
    'representativeBirthcountry',
    'representativeCountry',
    'representativeEmail',
    'representativeNationality',
    'confirmReseller',
  ],
  PRO: [
    'companySocial',
    'companySiret',
    'companyApe',
    'companyKind',
    'companyDescription',
    'companyAddress',
    'companyCountry',
    'representativeLastname',
    'representativeFirstname',
    'representativeBirthcity',
    'representativeBirthcountry',
    'representativeCountry',
    'representativeEmail',
    'representativeNationality',
  ],
};

export const TYPES = {
  PRO: 'PRO',
  RESELLER: 'RESELLER',
};

export const DISPLAY_BENEFICIARIES_KINDS = ['EARL', 'UNLISTED_COMPANY'];

export default {
  FIELDS_BY_TYPES,
  DISPLAY_BENEFICIARIES_KINDS,
  TYPES,
};
