import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import Table from "react-bootstrap/Table";

import createRandomUser from "../utils/createRandomUser";

const UsersTable = ({ seed, locale }) => {
  const [fakeUsers, setFakeUsers] = useState([]);

  const generateFakeUsers = (reset = false) => {
    const numberToGenerate = reset ? 20 : 10;
    const newFakeUsers = Array.from(
      { length: numberToGenerate },
      createRandomUser
    );
    setFakeUsers((prevFakeUsers) =>
      reset ? newFakeUsers : [...prevFakeUsers, ...newFakeUsers]
    );
  };

  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      generateFakeUsers();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  useEffect(() => {
    faker.setLocale(locale);
    faker.seed(seed);
    generateFakeUsers(true);
  }, [locale, seed]);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>UUID</th>
          <th>Full Name</th>
          <th>Address</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {fakeUsers.map((fakeUser, index) => {
          return (
            <tr key={fakeUser.uuid}>
              <td>{index + 1}</td>
              <td>{fakeUser.uuid}</td>
              <td>{fakeUser.fullName}</td>
              <td>{fakeUser.address}</td>
              <td>{fakeUser.phoneNumber}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default UsersTable;
