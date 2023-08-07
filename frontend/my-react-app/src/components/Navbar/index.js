import React, {useContext} from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {

    return (
		<Nav>
			<NavMenu>
			
					<>
					<NavLink to="/Login"> Login </NavLink>
					<NavLink to="/Recipe"> Recipe </NavLink>
					<NavLink to="/Recipe_Ingredient">Recipe's Ingredients</NavLink>
                    <NavLink to="/Ingredients"> Ingredients </NavLink>
					</>
               
			</NavMenu>
		</Nav>
    );
};

export default Navbar;