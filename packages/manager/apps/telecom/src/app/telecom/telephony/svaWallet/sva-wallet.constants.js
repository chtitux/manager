export const buildEnumList = (list, translataionPrefix, $translate) =>
  list
    .map((value) => ({
      name: $translate.instant(`${translataionPrefix}${value}`),
      value,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

export default {
  buildEnumList,
};
