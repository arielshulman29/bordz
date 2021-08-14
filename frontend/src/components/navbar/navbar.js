import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { connect } from 'react-redux'
// import styles from './Counter.module.css';
import * as navbarStyles from './navbar.module.scss'

function NavBar(props) {
    var userLink = typeof props.user === "undefined" ? <Nav.Link className={navbarStyles.navLinkStyle} href="/login">LOGIN</Nav.Link>
        : <Nav.Link className={navbarStyles.navLinkStyle} href="/lougout">LOGOUT</Nav.Link>


    var sellLink = typeof props.user === "undefined" ? '' : <Nav.Link className={navbarStyles.navLinkStyle} href="/new">SELL</Nav.Link>

    return (
        <Navbar className={navbarStyles.colorNav} variant="light" sticky="top">
            <Container>
                <Navbar.Brand className={navbarStyles.brandStyle} href="/">BORDZ
                    <img className={navbarStyles.logo} src="/wave.png" />
                </Navbar.Brand>
                <Nav className={navbarStyles.navbarStyle}>
                    <Nav.Link className={navbarStyles.navLinkStyle} href="/">FIND</Nav.Link>
                    {sellLink}
                </Nav>
                <Nav>
                    {userLink}
                </Nav>
            </Container>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}
export default connect(mapStateToProps)(NavBar);

