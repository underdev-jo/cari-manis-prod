import { lazy } from "react";

import Spinner from "./Spinner/Spinner";

const Dropdown = lazy(() => import("./Dropdown/Dropdown"));
const Alert = lazy(() => import("./Alert/Alert"));
const Button = lazy(() => import("./Button/Button"));
const Section = lazy(() => import("./Sections/Section"));
const DrinkCard = lazy(() => import("./DrinkCard"));

export { Alert, Spinner, Dropdown, Button, Section, DrinkCard };
