
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, MenuButton, Divider } from '@aws-amplify/ui-react';
import { GrUserAdmin } from "react-icons/gr";
import './style.css'



const NavBar = () => {
   let navigate = useNavigate();
   return (

      <nav>


         <Menu
            trigger={
               <MenuButton className="colorful-button" size="middle" width="40%">
                  <GrUserAdmin size={25} /><span>&nbsp;&nbsp;&nbsp;&nbsp;</span> Choose A Login Entry
               </MenuButton>
            }
            menuAlign="start"
         >
            <MenuItem onClick={() => navigate("/")}>
               Customer Login
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => navigate("/TechnicianEntry")}>
               Technician Login
            </MenuItem>
            <Divider />
         </Menu>


      </nav>

   );
};

export default NavBar;