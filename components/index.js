import { lazy } from "react";

const Alert = lazy(() => import("./Alert/Alert"));
const Dropdown = lazy(() => import("./Dropdown/Dropdown"));
const Container = lazy(() => import("./Layout/Container"));
const Spinner = lazy(() => import("./Spinner/Spinner"));
const LinkWrapper = lazy(() => import("./LinkWrapper/LinkWrapper"));
const Button = lazy(() => import("./Button/Button"));

export { Alert, Container, Spinner, Dropdown, LinkWrapper, Button };
