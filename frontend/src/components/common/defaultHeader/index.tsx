import React from "react";
import { Navbar, Container } from "react-bootstrap";
import Logo from "../logo";
import LogoutButton from "../logoutButton";

export default function DefaultHeader(): JSX.Element {
	return (
		<Navbar bg="dark">
			<Container>
				<Navbar.Brand href="#home">
					<Logo />
				</Navbar.Brand>
				<div>
					<LogoutButton>Logout</LogoutButton>
				</div>
			</Container>
		</Navbar>
	)
}