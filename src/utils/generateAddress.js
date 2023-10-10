import { faker } from "@faker-js/faker";

const STATE = faker.address.state;
const CITY = faker.address.city;
const STREET = faker.address.street;
const STREET_ADDRESS = faker.address.streetAddress;
const BUILDING_NUMBER = faker.address.buildingNumber;

const addressTemplates = [
  [STATE, CITY, STREET_ADDRESS],
  [CITY, STREET_ADDRESS],
  [CITY, STREET, BUILDING_NUMBER],
  [STATE, CITY, STREET, BUILDING_NUMBER],
];

const generateAddress = () => {
  const addressTemplate =
    addressTemplates[
      faker.datatype.number({ min: 0, max: addressTemplates.length - 1 })
    ];
  const addressParts = addressTemplate.map((fn) => fn());
  return addressParts.join(", ");
};

export default generateAddress;
