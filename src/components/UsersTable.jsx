import { useState, useEffect, useRef } from "react";
import { faker } from "@faker-js/faker";
import { mkConfig, generateCsv, download } from "export-to-csv";
import Table from "react-bootstrap/Table";

import FloatingButton from "./FloatingButton";
import createRandomUser from "../utils/createRandomUser";
import generateRandomErrors from "../utils/generateRandomErrors";

const UsersTable = ({ seed, locale, errors }) => {
  const [fakeUsers, setFakeUsers] = useState([]);
  const page = useRef(0);

  const generateFakeUsers = (reset = false) => {
    faker.seed(seed + page.current);
    const numberToGenerate = reset ? 20 : 10;
    const newFakeUsers = Array.from(
      { length: numberToGenerate },
      createRandomUser
    );
    newFakeUsers.forEach((user) => generateRandomErrors(user, errors));
    setFakeUsers((prevFakeUsers) =>
      reset ? newFakeUsers : [...prevFakeUsers, ...newFakeUsers]
    );
    page.current += 1;
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
    page.current = 0;
    faker.setLocale(locale);
    generateFakeUsers(true);
  }, [locale, seed, errors]);

  const onButtonClick = () => {
    const csvConfig = mkConfig({ useKeysAsHeaders: true });
    const csv = generateCsv(csvConfig)(fakeUsers);
    download(csvConfig)(csv);
  };

  return (
    <>
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
        <tbody style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
          {fakeUsers.map((fakeUser, index) => {
            return (
              <tr key={fakeUser.uuid}>
                <td style={{ width: "3.5rem" }}>{index + 1}</td>
                <td style={{ maxWidth: "10rem" }}>{fakeUser.uuid}</td>
                <td>{fakeUser.fullName}</td>
                <td>{fakeUser.address}</td>
                <td>{fakeUser.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <FloatingButton onClick={() => onButtonClick()} />
    </>
  );
};

export default UsersTable;
