import { lazy } from "react";
import Alert from "./Alert/Alert";
import Dropdown from "./Dropdown/Dropdown";
import LinkWrapper from "./LinkWrapper/LinkWrapper";
import Spinner from "./Spinner/Spinner";

const Button = lazy(() => import("./Button/Button"));
const Section = lazy(() => import("./Sections/Section"));
const DrinkCard = lazy(() => import("./DrinkCard"));

export { Alert, Spinner, Dropdown, LinkWrapper, Button, Section, DrinkCard };
