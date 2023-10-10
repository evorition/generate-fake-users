import { faker } from "@faker-js/faker";

const USER_LIMITS = {
  uuid: 40,
  fullName: 30,
  address: 70,
  phoneNumber: 25,
};

const ALPHABET = {
  en_US: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  ru: "абвгдежзийклмнопрстуфхцчшщъыьэюяАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789",
  fr: "abcdefghijklmnopqrstuvwxyzàâæçéèêëîïôœùûüÿABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ0123456789",
};

const removeRandomSymbol = (field) => {
  const symbolToRemove = faker.datatype.number(field.length - 1);
  return field.slice(0, symbolToRemove) + field.slice(symbolToRemove + 1);
};

const addRandomSymbol = (field) => {
  const localeAlphabet = ALPHABET[faker.locale];
  const symbolToAdd = faker.datatype.number(localeAlphabet.length - 1);
  const positionToAdd = faker.datatype.number(field.length);
  return (
    field.slice(0, positionToAdd) +
    localeAlphabet[symbolToAdd] +
    field.slice(positionToAdd)
  );
};

const swapRandomSymbols = (field) => {
  if (field.length < 2) {
    return field;
  }
  const symbolToSwap = faker.datatype.number(field.length - 2);
  const nextSymboltoSwap = symbolToSwap + 1;
  const symbolsArray = field.split("");
  [symbolsArray[symbolToSwap], symbolsArray[nextSymboltoSwap]] = [
    symbolsArray[nextSymboltoSwap],
    symbolsArray[symbolToSwap],
  ];
  return symbolsArray.join("");
};

const chooseErrorType = (min, max) => {
  const errorTypes = [removeRandomSymbol, swapRandomSymbols, addRandomSymbol];
  return errorTypes[faker.datatype.number({ min, max })];
};

const chooseRandomField = () => {
  const fields = ["uuid", "fullName", "address", "phoneNumber"];
  return fields[faker.datatype.number(fields.length - 1)];
};

const generateRandomErrors = (user, errors) => {
  while (errors) {
    if (
      errors < 1 &&
      !faker.helpers.maybe(() => true, { probability: errors })
    ) {
      break;
    }
    const randomField = chooseRandomField();
    let min = 0;
    let max = 2;
    if (user[randomField].length < 1) {
      min = 1;
    } else if (user[randomField].length === USER_LIMITS[randomField]) {
      max = 1;
    }
    user[randomField] = chooseErrorType(min, max)(user[randomField]);
    --errors;
  }
  return user;
};

export default generateRandomErrors;
