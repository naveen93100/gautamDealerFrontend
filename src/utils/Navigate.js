let navigate;

export const setNavigate = (nav) => {
  navigate = nav;
};

export const redirectLogin = () => {
  if (navigate) {
    navigate("/login", { replace: true });
  } else {
    window.location.href = "/login";
  }
};
