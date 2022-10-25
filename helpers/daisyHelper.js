export const badge = (type) => {
  const classType = {
    primary: "badge badge-primary",
    secondary: "badge badge-secondary",
    accent: "badge badge-accent",
    warning: "badge badge-warning",
    error: "badge badge-error",
    info: "badge badge-info",
  };
  return classType[type];
};

export const progress = (type) => {
  const classType = {
    primary: "progress progress-primary",
    secondary: "progress progress-secondary",
    accent: "progress progress-accent",
    warning: "progress progress-warning",
    error: "progress progress-error",
    info: "progress progress-info",
  };
  return classType[type];
};
