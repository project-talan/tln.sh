import React from 'react';
import './Navbar.css';
import Nav from 'react-bootstrap/Nav';
import brand from './../../media/brand.png';
import github from './../../media/github.png';

export default class Navbar extends React.Component {
  render() {
    return (
      <Nav className={"navbar navbar-light bg-light p-0 pl-4 pr-4 border-bottom" + ((this.props.hide)?(" d-none"):(""))}>
        <a className="navbar-brand" href={this.props.hostUrl}>
          <img className="Navbar__logo" src={brand} alt=""></img>
          <span className="pl-3 d-sm-none">{this.props.titleShort}</span>
          <span className="pl-3 d-none d-sm-inline-block">{this.props.titleLong}</span>
        </a>
        <Nav className="nav text-black d-none">
          UA, Kyiv
        </Nav>
        <Nav className="nav">
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/project-talan/tln-cli"><img className="Navbar__logo" src={github} alt=""></img></a>
        </Nav>
      </Nav>
    );
  }
}