// utils/convertKeys.ts

export const snakeToCamel = (str: string) =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );

export const convertObjectKeysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertObjectKeysToCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result: any, key: string) => {
      result[snakeToCamel(key)] = convertObjectKeysToCamelCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
};