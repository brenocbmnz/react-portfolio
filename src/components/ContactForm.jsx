import React from "react";
import { useTranslation } from "react-i18next";
// Styles
import styled from "styled-components";
// Components
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { Icon } from "@iconify/react";
// Config
import { formspreeUrl } from "../config";
// Util
import { postData } from "../utils";

// #region styled-components
const StyledForm = styled.div`
  --form-background: ${({ theme }) => theme.name === "light" ? "#eee3ce" : "#101414"};
  --form-text: ${({ theme }) => theme.name === "light" ? "#101414" : "#f4f1e8"};
  --form-line: ${({ theme }) => theme.name === "light" ? "rgba(16, 20, 20, 0.35)" : "rgba(244, 241, 232, 0.35)"};
  --form-placeholder: ${({ theme }) => theme.name === "light" ? "#667070" : "#788383"};
  background: var(--form-background);
  color: var(--form-text);
  overflow: hidden;
  padding: clamp(1.25rem, 4vw, 2.5rem);
  position: relative;
  transition: background-color var(--theme-transition), color var(--theme-transition);

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
    border-bottom: 1px solid var(--form-line);
    border-radius: 0;
    color: var(--form-text);
    padding-left: 0;
    transition: border-color 240ms ease, box-shadow 240ms ease,
      color var(--theme-transition);
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

  .form-control::placeholder { color: var(--form-placeholder); }
  textarea.form-control { min-height: 8rem; }

  .submit-button {
    align-items: center;
    background: var(--yellow);
    border: 1px solid var(--yellow);
    color: #101414;
    display: inline-flex;
    font-family: var(--mono-font);
    font-size: 0.72rem;
    gap: 0.55rem;
    justify-content: center;
    letter-spacing: 0.08em;
    padding: 0.85rem 1.2rem;
    text-transform: uppercase;
    transition: background 220ms ease, box-shadow 220ms ease, transform 220ms ease;
  }

  .submit-button:hover,
  .submit-button:focus-visible {
    background: color-mix(in srgb, var(--yellow) 82%, white);
    border-color: var(--yellow);
    box-shadow: 5px 5px 0 var(--cyan);
    color: #101414;
    transform: translate(-2px, -2px);
  }

  .submit-icon {
    font-size: 1rem;
    transition: transform 260ms cubic-bezier(0.2, 0.75, 0.2, 1);
  }

  .submit-button:hover .submit-icon,
  .submit-button:focus-visible .submit-icon {
    transform: translate(3px, -3px) rotate(-8deg);
  }

  .submit-button:disabled {
    box-shadow: none;
    transform: none;
  }

  .success-alert {
    align-items: center;
    background: color-mix(in srgb, var(--form-background) 88%, var(--cyan));
    border: 1px solid var(--cyan);
    box-shadow: 5px 5px 0 color-mix(in srgb, var(--cyan) 35%, transparent);
    color: var(--form-text);
    display: grid;
    gap: 0.85rem;
    grid-template-columns: auto minmax(0, 1fr) auto;
    margin-top: 0.5rem;
    padding: 0.9rem;
    text-align: left;
  }

  .success-alert > svg {
    background: var(--cyan);
    color: #101414;
    font-size: 2rem;
    padding: 0.4rem;
  }

  .success-alert p {
    font-size: 0.9rem;
    line-height: 1.55;
    margin: 0;
  }

  .success-close {
    align-items: center;
    background: transparent;
    border: 0;
    color: inherit;
    display: inline-flex;
    height: 2rem;
    justify-content: center;
    opacity: 0.65;
    padding: 0;
    transition: background 180ms ease, opacity 180ms ease;
    width: 2rem;
  }

  .success-close:hover {
    background: color-mix(in srgb, var(--cyan) 20%, transparent);
    opacity: 1;
  }
`;
// #endregion

// #region component
const ContactForm = () => {
  const { t } = useTranslation();
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
          throw new Error(t("contact.form.submitError", { status: response.status }));
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
          <Form.Label>{t("contact.form.name")}</Form.Label>
          <Form.Control required type="text" placeholder={t("contact.form.namePlaceholder")} />
          <Form.Control.Feedback type="invalid">
            <h5>{t("contact.form.nameInvalid")}</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto mb-3 form-group" controlId="email">
          <Form.Label>{t("contact.form.email")}</Form.Label>
          <Form.Control
            required
            pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
            placeholder={t("contact.form.emailPlaceholder")}
          />
          <Form.Control.Feedback type="invalid">
            <h5>{t("contact.form.emailInvalid")}</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto mb-3 form-group" controlId="subject">
          <Form.Label>{t("contact.form.subject")}</Form.Label>
          <Form.Control required type="text" placeholder={t("contact.form.subjectPlaceholder")} />
          <Form.Control.Feedback type="invalid">
            <h5>{t("contact.form.subjectInvalid")}</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto mb-3 form-group" controlId="message">
          <Form.Label>{t("contact.form.message")}</Form.Label>
          <Form.Control required as="textarea" placeholder={t("contact.form.messagePlaceholder")} />
          <Form.Control.Feedback type="invalid">
            <h5>{t("contact.form.messageInvalid")}</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto text-center form-group">
          {formspreeUrl && (
            <Button
              type="submit"
              disabled={isProcessing}
              className="submit-button my-4"
            >
              <span>{t("contact.form.send")}</span>
              {isProcessing ? (
                <Spinner animation="border" variant="success" size="sm" />
              ) : (
                <Icon className="submit-icon" icon="lucide:send" aria-hidden="true" />
              )}
            </Button>
          )}
          {success && (
            <div className="success-alert" role="status">
              <Icon icon="lucide:check" aria-hidden="true" />
              <p>{t("contact.form.success")}</p>
              <button
                className="success-close"
                type="button"
                aria-label={t("contact.form.dismissSuccess")}
                onClick={() => setSuccess(false)}
              >
                <Icon icon="lucide:x" aria-hidden="true" />
              </button>
            </div>
          )}
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
              {t("contact.form.missingEndpoint")}
            </Alert.Heading>
          </Alert>
        </Form.Group>
      </Form>
    </StyledForm>
  );
};
// #endregion

export default ContactForm;
