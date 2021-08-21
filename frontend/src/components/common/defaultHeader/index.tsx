import React from "react";
import { Navbar, Container } from "react-bootstrap";
import Logo from "../logo";

export default function DefaultHeader(): JSX.Element {
	return (
		<Navbar bg="dark">
			<Container>
				<Navbar.Brand href="#home">
					<Logo />
				</Navbar.Brand>
			</Container>
		</Navbar>
	)
}