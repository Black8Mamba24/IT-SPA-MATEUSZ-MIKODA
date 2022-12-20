import { LogoutDropDown } from "./LogoutDropDown";

export const handleAvatarClick = () => {
  const logoutDropDown = document.getElementById("logoutDropDown");

  if (logoutDropDown) {
    logoutDropDown.parentNode.removeChild(logoutDropDown);
  } else {
    const main = document.querySelector("main");
    const logoutDropDown = LogoutDropDown();

    main.append(logoutDropDown);
  }
}
