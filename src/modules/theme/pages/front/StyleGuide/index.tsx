import React from 'react';
import { observer } from 'mobx-react';
import {
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  InputGroup,
  FormControl,
  Col,
  Row,
} from 'react-bootstrap';
import './index.scss';

const StyleGuidePage = () => {
  return (
    <>
      <div className="bkg-ui">
        <section>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="info">Info</Button>
          <Button variant="light">Light</Button>
          <Button variant="dark">Dark</Button>
          <Button variant="link">Link</Button>
          <Button>Button</Button>
        </section>
        <section>
          <Button variant="outline-primary">Primary</Button>{' '}
          <Button variant="outline-secondary">Secondary</Button>{' '}
          <Button variant="outline-success">Success</Button>{' '}
          <Button variant="outline-warning">Warning</Button>{' '}
          <Button variant="outline-danger">Danger</Button>{' '}
          <Button variant="outline-info">Info</Button>{' '}
          <Button variant="outline-light">Light</Button>{' '}
          <Button variant="outline-dark">Dark</Button>
        </section>
        <section>
          <Button href="#">Link</Button> <Button type="submit">Button</Button>{' '}
          <Button as="input" type="button" value="Input" />{' '}
          <Button as="input" type="submit" value="Submit" />{' '}
          <Button as="input" type="reset" value="Reset" />
        </section>
        <section>
          <div className="mb-2">
            <Button variant="primary" size="lg">
              Large button
            </Button>{' '}
            <Button variant="secondary" size="lg">
              Large button
            </Button>
          </div>
          <div>
            <Button variant="primary" size="sm">
              Small button
            </Button>{' '}
            <Button variant="secondary" size="sm">
              Small button
            </Button>
          </div>
          <Button variant="primary" size="lg" block>
            Block level button
          </Button>
          <Button variant="secondary" size="lg" block>
            Block level button
          </Button>
          <Button variant="primary" size="lg" active>
            Primary button
          </Button>{' '}
          <Button variant="secondary" size="lg" active>
            Button
          </Button>
          <Button variant="primary" size="lg" disabled>
            Primary button
          </Button>{' '}
          <Button variant="secondary" size="lg" disabled>
            Button
          </Button>{' '}
          <Button href="#" variant="secondary" size="lg" disabled>
            Link
          </Button>
          <ToggleButtonGroup
            type="checkbox"
            defaultValue={[1, 3]}
            className="mb-2"
          >
            <ToggleButton value={1}>Checkbox 1 (pre-checked)</ToggleButton>
            <ToggleButton value={2}>Checkbox 2</ToggleButton>
            <ToggleButton value={3}>Checkbox 3 (pre-checked)</ToggleButton>
          </ToggleButtonGroup>
          <br />
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton value={1}>Radio 1 (pre-checked)</ToggleButton>
            <ToggleButton value={2}>Radio 2</ToggleButton>
            <ToggleButton value={3}>Radio 3</ToggleButton>
          </ToggleButtonGroup>
        </section>

        <div>
          <Form>
            <Form.File id="custom-file" label="Custom file input" custom />
          </Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Example select</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Example multiple select</Form.Label>
            <Form.Control as="select" multiple>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Form>
            <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Example file input"
              />
            </Form.Group>
          </Form>
          <Form.Group>
            <Form.Control size="lg" type="text" placeholder="Large text" />
            <br />
            <Form.Control type="text" placeholder="Normal text" />
            <br />
            <Form.Control size="sm" type="text" placeholder="Small text" />
          </Form.Group>
          <Form.Group>
            <Form.Control as="select" size="lg">
              <option>Large select</option>
            </Form.Control>
            <br />
            <Form.Control as="select">
              <option>Default select</option>
            </Form.Control>
            <br />
            <Form.Control size="sm" as="select">
              <option>Small select</option>
            </Form.Control>
            <Form.Control
              type="text"
              placeholder="Readonly input here..."
              readOnly
            />
          </Form.Group>
          <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue="email@example.com"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>
            <Form>
              <Form.Group controlId="formBasicRange">
                <Form.Label>Range</Form.Label>
                <Form.Control type="range" />
              </Form.Group>
            </Form>
          </Form>
          {/* <Form>
            {['checkbox', 'radio'].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  type={type}
                  id={`default-${type}`}
                  label={`default ${type}`}
                />

                <Form.Check
                  disabled
                  type={type}
                  label={`disabled ${type}`}
                  id={`disabled-default-${type}`}
                />
              </div>
            ))}
          </Form> */}
          {/* <Form>
            {['checkbox', 'radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="1"
                  type={type}
                  id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  label="2"
                  type={type}
                  id={`inline-${type}-2`}
                />
                <Form.Check
                  inline
                  disabled
                  label="3 (disabled)"
                  type={type}
                  id={`inline-${type}-3`}
                />
              </div>
            ))}
          </Form> */}
          <>
            <Form.Check aria-label="option 1" />
            <Form.Check type="radio" aria-label="radio 1" />
          </>
        </div>
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
        <Form>
          <Row>
            <Col>
              <Form.Control placeholder="First name" />
            </Col>
            <Col>
              <Form.Control placeholder="Last name" />
            </Col>
          </Row>
        </Form>
        <Form>
          <Form.Row>
            <Col>
              <Form.Control placeholder="First name" />
            </Col>
            <Col>
              <Form.Control placeholder="Last name" />
            </Col>
          </Form.Row>
        </Form>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Radios
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="first radio"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="second radio"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="third radio"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
          </fieldset>
          <Form.Group as={Row} controlId="formHorizontalCheck">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Remember me" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Sign in</Button>
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Label column="lg" lg={2}>
                Large Text
              </Form.Label>
              <Col>
                <Form.Control size="lg" type="text" placeholder="Large text" />
              </Col>
            </Form.Row>
            <br />
            <Form.Row>
              <Form.Label column lg={2}>
                Normal Text
              </Form.Label>
              <Col>
                <Form.Control type="text" placeholder="Normal text" />
              </Col>
            </Form.Row>
            <br />
            <Form.Row>
              <Form.Label column="sm" lg={2}>
                Small Text
              </Form.Label>
              <Col>
                <Form.Control size="sm" type="text" placeholder="Small text" />
              </Col>
            </Form.Row>
          </Form.Group>
        </Form>
        <Form>
          <Form.Row>
            <Col xs={7}>
              <Form.Control placeholder="City" />
            </Col>
            <Col>
              <Form.Control placeholder="State" />
            </Col>
            <Col>
              <Form.Control placeholder="Zip" />
            </Col>
          </Form.Row>
        </Form>
        <Form>
          <Form.Row className="align-items-center">
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInput" srOnly>
                Name
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Jane Doe"
              />
            </Col>
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                Username
              </Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="inlineFormInputGroup" placeholder="Username" />
              </InputGroup>
            </Col>
            <Col xs="auto">
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Remember me"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" className="mb-2">
                Submit
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <Form>
          <Form.Row className="align-items-center">
            <Col sm={3} className="my-1">
              <Form.Label htmlFor="inlineFormInputName" srOnly>
                Name
              </Form.Label>
              <Form.Control id="inlineFormInputName" placeholder="Jane Doe" />
            </Col>
            <Col sm={3} className="my-1">
              <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                Username
              </Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  id="inlineFormInputGroupUsername"
                  placeholder="Username"
                />
              </InputGroup>
            </Col>
            <Col xs="auto" className="my-1">
              <Form.Check
                type="checkbox"
                id="autoSizingCheck2"
                label="Remember me"
              />
            </Col>
            <Col xs="auto" className="my-1">
              <Button type="submit">Submit</Button>
            </Col>
          </Form.Row>
        </Form>
        <Form>
          <Form.Row className="align-items-center">
            <Col xs="auto" className="my-1">
              <Form.Label
                className="mr-sm-2"
                htmlFor="inlineFormCustomSelect"
                srOnly
              >
                Preference
              </Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                custom
              >
                <option value="0">Choose...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Control>
            </Col>
            <Col xs="auto" className="my-1">
              <Form.Check
                type="checkbox"
                id="customControlAutosizing"
                label="Remember my preference"
                custom
              />
            </Col>
            <Col xs="auto" className="my-1">
              <Button type="submit">Submit</Button>
            </Col>
          </Form.Row>
        </Form>
        <Form inline>
          <Form.Label htmlFor="inlineFormInputName2" srOnly>
            Name
          </Form.Label>
          <Form.Control
            className="mb-2 mr-sm-2"
            id="inlineFormInputName2"
            placeholder="Jane Doe"
          />
          <Form.Label htmlFor="inlineFormInputGroupUsername2" srOnly>
            Username
          </Form.Label>
          <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
              <InputGroup.Text>@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="inlineFormInputGroupUsername2"
              placeholder="Username"
            />
          </InputGroup>
          <Form.Check
            type="checkbox"
            className="mb-2 mr-sm-2"
            id="inlineFormCheck"
            label="Remember me"
          />
          <Button type="submit" className="mb-2">
            Submit
          </Button>
        </Form>
        <Form inline>
          <Form.Label
            className="my-1 mr-2"
            htmlFor="inlineFormCustomSelectPref"
          >
            Preference
          </Form.Label>
          <Form.Control
            as="select"
            className="my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
            custom
          >
            <option value="0">Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Control>
          <Form.Check
            type="checkbox"
            className="my-1 mr-sm-2"
            id="customControlInline"
            label="Remember my preference"
            custom
          />
          <Button type="submit" className="my-1">
            Submit
          </Button>
        </Form>
        <>
          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text>
        </>
        <Form inline>
          <Form.Group>
            <Form.Label htmlFor="inputPassword6">Password</Form.Label>
            <Form.Control
              type="password"
              className="mx-sm-3"
              id="inputPassword6"
              aria-describedby="passwordHelpInline"
            />
            <Form.Text id="passwordHelpBlock" muted>
              Must be 8-20 characters long.
            </Form.Text>
          </Form.Group>
        </Form>
        <>
          <Form.Group>
            <Form.Label>Disabled input</Form.Label>
            <Form.Control placeholder="Disabled input" disabled />
          </Form.Group>
          <Form.Group>
            <Form.Label>Disabled select menu</Form.Label>
            <Form.Control as="select" disabled>
              <option>Disabled select</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Can't check this" disabled />
          </Form.Group>
        </>
        <Form>
          <fieldset disabled>
            <Form.Group>
              <Form.Label htmlFor="disabledTextInput">
                Disabled input
              </Form.Label>
              <Form.Control
                id="disabledTextInput"
                placeholder="Disabled input"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="disabledSelect">
                Disabled select menu
              </Form.Label>
              <Form.Control as="select" id="disabledSelect">
                <option>Disabled select</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                id="disabledFieldsetCheck"
                label="Can't check this"
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </fieldset>
        </Form>
      </div>
    </>
  );
};

export default observer(StyleGuidePage);
