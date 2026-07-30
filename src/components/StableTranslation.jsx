import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StableText = styled.span`
  display: grid;

  > span {
    grid-area: 1 / 1;
  }

  .translation-measure {
    pointer-events: none;
    visibility: hidden;
  }
`;

const propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  translationKey: PropTypes.string.isRequired,
  values: PropTypes.object,
};

const StableTranslation = ({
  as = "span",
  className,
  translationKey,
  values = {},
}) => {
  const { t } = useTranslation();

  return (
    <StableText as={as} className={className}>
      <span>{t(translationKey, values)}</span>
      {[
        ["en", "en"],
        ["pt-BR", "pt-BR"],
      ].map(([key, language]) => (
        <span className="translation-measure" aria-hidden="true" key={key}>
          {t(translationKey, { ...values, lng: language })}
        </span>
      ))}
    </StableText>
  );
};

StableTranslation.propTypes = propTypes;

export default StableTranslation;