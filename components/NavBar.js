/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';
import {
  Navbar, //
  Container,
  Nav,
  // Button,
} from 'react-bootstrap';
import { BsPerson } from 'react-icons/bs';
import { IoIosAddCircle } from 'react-icons/io';
import { SlCalender, SlMagnifier } from 'react-icons/sl';

export default function NavBar() {
  return (
    <Navbar className="bg-body-tertiary shadow-sm" id="navbar">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>MM</Navbar.Brand>
        </Link>
        <Link passHref href="/search">
          <Nav.Link><SlMagnifier size={25} /></Nav.Link>
        </Link>
        <Link passHref href="/events/new">
          <Nav.Link><IoIosAddCircle size={25} /></Nav.Link>
        </Link>
        <Link passHref href="/calendar">
          <Nav.Link><SlCalender size={25} /></Nav.Link>
        </Link>
        <Link passHref href="/profile">
          <Nav.Link><BsPerson size={25} /></Nav.Link>
        </Link>
      </Container>
    </Navbar>
  );
}
