import React from "react";
// Styles
import styled from "styled-components";
// Components
import { Alert, Button, Form, Spinner } from "react-bootstrap";
// Config
import { formspreeUrl } from "../config";
// Util
import { postData } from "../utils";

// #region styled-components
const StyledForm = styled.div`
  background: #101414;
  color: #f4f1e8;
  overflow: hidden;
  padding: clamp(1.25rem, 4vw, 2.5rem);
  position: relative;

  &::before {
    background: radial-gradient(circle, rgba(32, 199, 217, 0.18), transparent 68%);
    content: "";
    height: 18rem;
    opacity: 0.32;
    pointer-events: none;
    position: absolute;
    right: -9rem;
    top: -9rem;
    transform: scale(0.72);
    transition: opacity 500ms ease, transform 700ms ease;
    width: 18rem;
  }

  &:focus-within::before {
    opacity: 1;
    transform: scale(1.15);
  }

  form {
    position: relative;
    z-index: 1;
  }

  .form-group {
    transition: transform 240ms ease;
  }

  .form-group:focus-within {
    transform: translateX(5px);
  }

  .form-label {
    font-family: var(--mono-font);
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transform-origin: left;
    transition: color 220ms ease, transform 220ms ease;
  }

  .form-group:focus-within .form-label {
    color: var(--cyan);
    transform: translateX(4px);
  }

  .form-control {
    background: transparent;
    border: 0;
    border-bottom: 1px solid rgba(244, 241, 232, 0.35);
    border-radius: 0;
    color: #f4f1e8;
    padding-left: 0;
    transition: border-color 240ms ease, box-shadow 240ms ease;
  }

  .form-control:focus {
    border-bottom-color: var(--cyan);
    box-shadow: 0 4px 0 -3px var(--cyan);
  }

  .was-validated .form-control:invalid,
  .form-control.is-invalid {
    border-bottom-color: var(--bs-form-invalid-border-color);
    box-shadow: none;
  }

  .was-validated .form-control:valid,
  .form-control.is-valid {
    border-bottom-color: var(--bs-form-valid-border-color);
  }

  .form-control::placeholder { color: #788383; }
  textarea.form-control { min-height: 8rem; }

  .submit-button {
    background: var(--yellow);
    border: 1px solid var(--yellow);
    color: #101414;
    font-family: var(--mono-font);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    padding: 0.85rem 1.2rem;
    text-transform: uppercase;
  }
`;
// #endregion

// #region component
const ContactForm = () => {
  const [isValidated, setIsValidated] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [danger, setDanger] = React.useState(false);
  const [dangerMessage, setDangerMessage] = React.useState(null);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    setSuccess(false);
    setDanger(false);
    setDangerMessage(null);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setIsValidated(true);
    const { name, email, subject, message } = form.elements;
    const data = {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    };
    if (form.checkValidity()) {
      event.preventDefault();
      event.persist();
      setIsProcessing(true);
      try {
        const response = await postData(formspreeUrl, data);
        if (!response.ok) {
          throw new Error(`${response.status}: check formspreeUrl in data.js`);
        }
        setIsProcessing(false);
        setIsValidated(false);
        event.target.reset();
        setSuccess(true);
      } catch (error) {
        setIsProcessing(false);
        setIsValidated(false);
        event.target.reset();
        setDangerMessage(error.message);
        setDanger(true);
      }
    }
  };

  return (
    <StyledForm>
      <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
        <Form.Group className="mx-auto mb-3 form-group" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control required type="text" placeholder="Your name" />
          <Form.Control.Feedback type="invalid">
            <h5>Name must be at least one character.</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto mb-3 form-group" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
            placeholder="someone@something.com"
          />
          <Form.Control.Feedback type="invalid">
            <h5>Please enter a valid email.</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto mb-3 form-group" controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control required type="text" placeholder="What would you like to discuss?" />
          <Form.Control.Feedback type="invalid">
            <h5>Please provide a subject.</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto mb-3 form-group" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control required as="textarea" placeholder="Your message..." />
          <Form.Control.Feedback type="invalid">
            <h5>Please provide a valid message.</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto text-center form-group">
          {formspreeUrl && (
            <Button
              type="submit"
              disabled={isProcessing}
              className="submit-button my-4"
            >
              Send message{" "}
              {isProcessing && (
                <Spinner animation="border" variant="success" size="sm" />
              )}
            </Button>
          )}
          <Alert
            show={success}
            variant="success"
            onClose={() => setSuccess(false)}
            dismissible
          >
            <Alert.Heading>Success! I will contact you soon.</Alert.Heading>
          </Alert>
          <Alert
            show={danger}
            variant="danger"
            onClose={() => setDanger(false)}
            dismissible
          >
            <Alert.Heading>{dangerMessage}</Alert.Heading>
          </Alert>
          <Alert show={!formspreeUrl} variant="danger">
            <Alert.Heading>
              You must provide a valid formspree url in src/config.js
            </Alert.Heading>
          </Alert>
        </Form.Group>
      </Form>
    </StyledForm>
  );
};
// #endregion

export default ContactForm;
