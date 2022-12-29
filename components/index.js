import { lazy } from "react";
import LinkWrapper from "./LinkWrapper/LinkWrapper";

const Alert = lazy(() => import("./Alert/Alert"));
const Dropdown = lazy(() => import("./Dropdown/Dropdown"));
const Container = lazy(() => import("./Layout/Container"));
const Spinner = lazy(() => import("./Spinner/Spinner"));

const Button = lazy(() => import("./Button/Button"));
const Section = lazy(() => import("./Sections/Section"));
const DrinkCard = lazy(() => import("./DrinkCard"));

export {
  Alert,
  Container,
  Spinner,
  Dropdown,
  LinkWrapper,
  Button,
  Section,
  DrinkCard,
};
