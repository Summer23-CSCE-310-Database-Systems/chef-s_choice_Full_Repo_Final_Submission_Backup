import React, {useContext} from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {

    return (
		<Nav>
			<NavMenu>
			
					<>
					<NavLink to="/Login"> Login </NavLink>
					<NavLink to="/Recipe"> Recipe </NavLink>
                    <NavLink to="/Ingredients"> Ingredients </NavLink>
					</>
               
			</NavMenu>
		</Nav>
    );
};

export default Navbar;