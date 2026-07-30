import React from "react";
// Styles
import styled from "styled-components";
// State
import { useGetUsersQuery, useGetSocialsQuery } from "../app/apiSlice";
import { useTranslation } from "react-i18next";
// Icons
import { Icon } from "@iconify/react";
// Config
import { Blog, linkedin } from "../config";

// #region styled-components
const StyledSocialLinks = styled.div`
  display: flex;
  gap: 0.75rem;

  a {
    align-items: center;
    display: inline-flex;
    height: 2.6rem;
    justify-content: center;
    margin: 0;
    width: 2.6rem;
  }
`;
// #endregion

// #region component
const SocialLinks = () => {
  const { t } = useTranslation();
  const { data: userData } = useGetUsersQuery();
  const { isSuccess, error, data: socialsData } = useGetSocialsQuery();

  React.useEffect(() => {
    if (error) {
      console.log(
        `${error.status} - check getSocials query in src/app/apiSlice.js`
      );
    }
  }, [error, socialsData]);

  return (
    <StyledSocialLinks>
      <a
        href={userData.html_url}
        target="_blank"
        rel="noreferrer"
        aria-label={t("social.github")}
        className="link-icons"
      >
        <Icon icon="icomoon-free:github" />
      </a>
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={t("social.linkedin")}
          className="link-icons"
        >
          <Icon icon="fa-brands:linkedin" />
        </a>
      )}
      {isSuccess &&
        socialsData.map((element, index) => {
          let icon;
          switch (element.provider) {
            case "linkedin":
              icon = <Icon icon="fa-brands:linkedin" />;
              break;
            case "twitter":
              icon = <Icon icon="fa6-brands:square-x-twitter" />;
              break;
            case "facebook":
              icon = <Icon icon="fa-brands:facebook-square" />;
              break;
            case "instagram":
              icon = <Icon icon="fa-brands:instagram-square" />;
              break;
            case "tiktok":
              icon = <Icon icon="fa-brands:tiktok" />;
              break;

            default:
              icon = <Icon icon="ph:link-bold" />;
              break;
          }
          return (
            <a
              key={index}
              href={element.url}
              target="_blank"
              rel="noreferrer"
              aria-label={t("social.external")}
              className="link-icons"
            >
              {icon}
            </a>
          );
        })}
      {userData.blog && (
        <a
          href={userData.blog}
          target="_blank"
          rel="noreferrer"
          aria-label={t("social.external")}
          className="link-icons"
        >
          {Blog ? Blog : <Icon icon="ph:link-bold" />}
        </a>
      )}
    </StyledSocialLinks>
  );
};
// #endregion

export default SocialLinks;
