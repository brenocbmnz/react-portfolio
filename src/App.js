import React from "react";
// Styles
import { ThemeProvider } from "styled-components";
// State
import { useDispatch, useSelector } from "react-redux";
import { selectMode, setMode } from "./app/appSlice";
import {
  setProjects,
  setMainProjects,
  selectProjects,
} from "./app/projectsSlice";
import { useGetUsersQuery, useGetProjectsQuery } from "./app/apiSlice";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
// Router
import { HashRouter, Routes, Route } from "react-router-dom";
// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
// Components
import { ErrorBoundary } from "react-error-boundary";
import AppFallback from "./components/AppFallback";
import GlobalStyles from "./components/GlobalStyles";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import { Element } from "react-scroll";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import EasterThemeEffects from "./components/EasterThemeEffects";
import ScrollProgress from "./components/ScrollProgress";
// Config
import { footerTheme, githubUsername, linkedin, navLogo } from "./config";
// Util
import { getStoredTheme, getPreferredTheme, setTheme } from "./utils";

// #region component
const propTypes = {
  filteredProjects: PropTypes.arrayOf(PropTypes.string),
  projectCardImages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.node.isRequired,
    })
  ),
  projectDescriptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  projectMetadata: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      stack: PropTypes.arrayOf(PropTypes.string),
      featuredOrder: PropTypes.number,
    })
  ),
};

const App = ({
  projectCardImages = [],
  filteredProjects = [],
  projectDescriptions = [],
  projectMetadata = [],
}) => {
  const { t } = useTranslation();
  const theme = useSelector(selectMode);
  const [easterTheme, setEasterTheme] = React.useState(null);
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, error } = useGetUsersQuery();
  const { data: projectsData } = useGetProjectsQuery();
  let content;

  // Set all projects state
  React.useEffect(() => {
    if (!projectsData?.length) return;

    const byName = (items) =>
      new Map(items.map((item) => [item.name.toLowerCase(), item]));
    const images = byName(projectCardImages);
    const descriptions = byName(projectDescriptions);
    const metadata = byName(projectMetadata);

    const mergedProjects = projectsData
      .map((project) => {
        const key = project.name.toLowerCase();
        const configured = metadata.get(key) || {};

        return {
          id: project.id,
          homepage: project.homepage,
          description:
            configured.description ||
            descriptions.get(key)?.description ||
            project.description ||
            "Open-source work from my GitHub profile.",
          image: configured.image || images.get(key)?.image || null,
          name: project.name,
          html_url: project.html_url,
          category: configured.category || "Open Source",
          stack: configured.stack || project.topics || [],
          featuredOrder: configured.featuredOrder ?? Number.MAX_SAFE_INTEGER,
        };
      })
      .sort(
        (first, second) =>
          first.featuredOrder - second.featuredOrder ||
          first.name.localeCompare(second.name)
      );

    dispatch(setProjects(mergedProjects));
  }, [
    projectsData,
    projectCardImages,
    projectDescriptions,
    projectMetadata,
    dispatch,
  ]);

  // Set main projects state
  React.useEffect(() => {
    if (projects.length !== 0) {
      if (
        filteredProjects !== (undefined && null) &&
        filteredProjects.length !== 0
      ) {
        const tempArray = projects.filter((obj) =>
          filteredProjects.includes(obj.name)
        );
        tempArray.length !== 0
          ? dispatch(setMainProjects([...tempArray]))
          : dispatch(setMainProjects([...projects.slice(0, 3)]));
      } else {
        dispatch(setMainProjects([...projects.slice(0, 3)]));
      }
    }
  }, [projects, filteredProjects, dispatch]);

  // Theme
  const setThemes = React.useCallback(
    (theme) => {
      setEasterTheme(null);
      if (theme) {
        dispatch(setMode(theme));
        setTheme(theme);
      } else {
        dispatch(setMode(getPreferredTheme()));
        setTheme(getPreferredTheme());
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    setThemes();
  }, [setThemes]);

  React.useEffect(() => {
    if (easterTheme) {
      document.documentElement.setAttribute("data-easter-theme", easterTheme);
    } else {
      document.documentElement.removeAttribute("data-easter-theme");
    }

    return () => document.documentElement.removeAttribute("data-easter-theme");
  }, [easterTheme]);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setThemes();
      }
    });

  if (isLoading) {
    content = (
      <Container className="d-flex vh-100 align-items-center">
        <Loading />
      </Container>
    );
  } else if (isSuccess) {
    content = (
      <>
        <Element name={"Home"} id="home">
          <NavBar Logo={navLogo} callBack={(theme) => setThemes(theme)} />
        </Element>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer mode={footerTheme} />
      </>
    );
  } else if (isError) {
    content = (
      <Container className="d-flex vh-100 align-items-center justify-content-center">
        <h2>
          {error.status !== "FETCH_ERROR"
            ? `${error.status}: ${error.data.message} - ${t("errors.userRequest")}`
            : `${error.status} - ${t("errors.fetch")}`}
        </h2>
      </Container>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={AppFallback}>
      {/* https://reactrouter.com/6.28.0/upgrading/future#v7_starttransition */}
      {/* https://reactrouter.com/6.28.0/upgrading/future#v7_relativesplatpath */}
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
        <ThemeProvider theme={{ name: theme }}>
          <ScrollToTop />
          <GlobalStyles />
          <EasterThemeEffects theme={easterTheme} />
          <ScrollProgress />
          {content}
          <CommandPalette
            easterTheme={easterTheme}
            githubUrl={`https://github.com/${githubUsername}`}
            linkedinUrl={linkedin}
            onToggleTheme={() => setThemes(theme === "light" ? "dark" : "light")}
            onSetEasterTheme={setEasterTheme}
          />
        </ThemeProvider>
      </HashRouter>
    </ErrorBoundary>
  );
};

App.propTypes = propTypes;
// #endregion

export default App;
