import React from "react";
// State
import { useGetUsersQuery } from "../app/apiSlice";
import { useTranslation } from "react-i18next";
// Components
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
// Config
import { filteredProjects } from "../config";
// Utils
import { updateTitle } from "../utils";

// #region component
const Home = () => {
  const { t, i18n } = useTranslation();
  const { data: userData } = useGetUsersQuery();

  React.useEffect(() => {
    updateTitle(t("site.title", { name: userData.name }));
  }, [i18n.resolvedLanguage, t, userData.name]);

  return (
    <>
      <Hero name={userData.name} />
      <main>
        <AboutMe avatarUrl={userData.avatar_url} />
        <Skills />
        <Projects filteredProjects={filteredProjects} />
        <Contact />
      </main>
    </>
  );
};
// #endregion

export default Home;
