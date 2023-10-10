import { faker } from "@faker-js/faker";

import generateAddress from "./generateAddress";
import generatePhoneNumber from "./generatePhoneNumber";

const createRandomUser = () => {
  const uuid = faker.datatype.uuid();
  const fullName = faker.name.fullName();
  const address = generateAddress();
  const phoneNumber = generatePhoneNumber();

  return {
    uuid,
    fullName,
    address,
    phoneNumber,
  };
};

export default createRandomUser;
