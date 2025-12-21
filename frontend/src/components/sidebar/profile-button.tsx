import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu"
import "@szhsin/react-menu/dist/index.css";
import { ChevronUpDown } from "../icons"
import { logout } from "@/action";


export const ProfileMenuButton = () => {
  return (
    <Menu menuButton={
      <MenuButton className="cursor-pointer">
        <ChevronUpDown />
      </MenuButton>
    }>
      <MenuItem className="font-semibold" onClick={() => {
        logout();
      }}>Logout</MenuItem>
    </Menu>
  )
}
