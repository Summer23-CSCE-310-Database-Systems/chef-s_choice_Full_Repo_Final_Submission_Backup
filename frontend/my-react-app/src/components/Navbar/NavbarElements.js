import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
background: #f1f1f1;
height: 85px;
display: flex;
justify-content: space-between;
padding: 20px;
z-index: 12;
`;

export const NavAdmin = styled.nav`
background: #800000;
height: 85px;
display: flex;
justify-content: space-between;
padding: 0.2rem calc((100vw - 1000px) / 2);
z-index: 12;
`;

export const NavLink = styled(Link)`
color: gray;
display: flex;
align-items: center;
text-decoration: none;
font-size: 20px;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&.active {
	color: #233067;
}
&:hover {
    color: #233067;
  }
`;

export const Bars = styled(FaBars)`
display: none;
color: #808080;
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;
