import { faker } from "@faker-js/faker";

const PHONE_NUMBER_FORMATS = {
  en_US: [
    "+1(###)###-##-##",
    "+1##########",
    "(###)###-##-##",
    "###-###-##-##",
  ],
  ru: ["+7(###)###-##-##", "+7##########", "(###)###-##-##", "###-###-##-##"],
  fr: ["+33(###)###-##-##", "+33##########", "(###)###-##-##", "###-###-##-##"],
};

const generatePhoneNumber = () => {
  const phoneNumberTemplates = PHONE_NUMBER_FORMATS[faker.locale];
  const phoneNumberTemplate =
    phoneNumberTemplates[
      faker.datatype.number({ min: 0, max: phoneNumberTemplates.length - 1 })
    ];
  return faker.phone.number(phoneNumberTemplate);
};

export default generatePhoneNumber;
