import { logout } from "../helpers";
import { Button } from "./Button";

export const LogoutDropDown = () => {
  const dropDown = document.createElement("dropDown");
  dropDown.classList.add("avatarDropDown");
  dropDown.setAttribute("id", "logoutDropDown");

  const logoutButton = Button("Wyloguj się", () => {    
    logout();
    window.location.reload();
  });

  logoutButton.style.backgroundColor = '#f87474';

  dropDown.append(logoutButton);

  return dropDown;
}
