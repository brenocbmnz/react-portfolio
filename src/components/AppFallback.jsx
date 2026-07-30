import React from "react";
// State
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
// Components
import { Container } from "react-bootstrap";
// Utils
import { getPreferredTheme, setTheme } from "../utils";

// #region component
const propTypes = { error: PropTypes.object.isRequired };

const AppFallback = ({ error }) => {
  const { t } = useTranslation();
  React.useEffect(() => {
    setTheme(getPreferredTheme());
  }, []);

  return (
    <main className="d-flex flex-column vh-100 justify-content-center align-items-center">
      <Container className="text-center">
        <p>{t("errors.app")}</p>
        <pre
          className="text-wrap"
          style={{ color: "red" }}
        >{`${error.name}: ${error.message}`}</pre>
      </Container>
    </main>
  );
};

AppFallback.propTypes = propTypes;
// #endregion

export default AppFallback;
