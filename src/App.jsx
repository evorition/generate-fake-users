import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersTable from "./components/UsersTable";

function App() {
  const MAX_SEED_NUMBER = 10_000_000;

  const [locale, setLocale] = useState("en_US");
  const [seed, setSeed] = useState(42);
  const [errors, setErrors] = useState(0);

  return (
    <Container>
      <FloatingLabel label="Select a region">
        <Form.Select
          value={locale}
          onChange={({ target }) => setLocale(target.value)}
        >
          <option value="en_US">USA</option>
          <option value="ru">Russia</option>
          <option value="fr">France</option>
        </Form.Select>
      </FloatingLabel>
      <Form.Range
        min={0}
        max={10}
        step={0.25}
        value={errors}
        onChange={({ target }) => setErrors(+target.value)}
      />
      <Form.Control
        type="number"
        value={errors}
        onChange={({ target }) => setErrors(Math.min(1000, +target.value))}
      />
      <FloatingLabel label="Seed">
        <Form.Control
          type="number"
          min={0}
          value={seed}
          onChange={({ target }) =>
            setSeed(Math.min(MAX_SEED_NUMBER, +target.value))
          }
        />
      </FloatingLabel>
      <Button
        onClick={() => setSeed(Math.floor(Math.random() * MAX_SEED_NUMBER))}
      >
        Generate
      </Button>
      <UsersTable seed={seed} locale={locale} />
    </Container>
  );
}

export default App;
