import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import UsersTable from "./components/UsersTable";

function App() {
  const MAX_SEED_NUMBER = 10_000_000;

  const [locale, setLocale] = useState("en_US");
  const [seed, setSeed] = useState(0);
  const [errors, setErrors] = useState(0);

  return (
    <Container>
      <Row md={3} xs={1} className="py-5 mx-0 bg-light">
        <Col className="pt-3">
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
        </Col>
        <Col className="pt-3">
          <FloatingLabel label="Number of errors">
            <Form.Control
              type="number"
              min={0}
              step={0.25}
              value={errors}
              onChange={({ target }) =>
                setErrors(Math.min(1000, +target.value))
              }
            />
          </FloatingLabel>
          <Form.Range
            min={0}
            max={10}
            step={0.25}
            value={errors}
            onChange={({ target }) => setErrors(+target.value)}
          />
        </Col>
        <Col className="pt-3">
          <Row>
            <InputGroup>
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
                onClick={() =>
                  setSeed(Math.floor(Math.random() * MAX_SEED_NUMBER))
                }
              >
                Generate
              </Button>
            </InputGroup>
          </Row>
        </Col>
      </Row>
      <UsersTable seed={seed} locale={locale} errors={errors} />
    </Container>
  );
}

export default App;
