import React from 'react'
import { IndexLink, Link } from 'react-router'

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	toggleNavOpen() {
		const nav = document.querySelector('.navbar')
		if (nav.classList.contains('navbar-collapsed'))
			nav.classList.toggle('navbar-collapsed-open');
	}

	resizeNavbar() {
		const nav = document.querySelector('.navbar');
		if (window.innerWidth <= 400 && !nav.classList.contains('navbar-collapsed'))
			nav.classList.add('navbar-collapsed');
		else if (window.innerWidth > 400 && nav.classList.contains('navbar-collapsed'))
			nav.classList.remove('navbar-collapsed');
	}

	componentWillMount() {
		window.addEventListener('resize', this.resizeNavbar);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeNavbar);
	}

	render() {
		const { location } = this.props;
		const homeClass = location.pathname === '/' ? 'active' : '';
		const researchClass = location.pathname.match(/^\/research/) ? 'active' : '';
		const teachingClass = location.pathname.match(/^\/teaching/) ? 'active' : '';
		const contactClass = location.pathname.match(/^\/contact/) ? 'active' : '';

		return (
			<nav className={"navbar " + ((window.innerWidth <= 400) ? "navbar-collapsed" : "")}>
				<button onClick={this.toggleNavOpen.bind(this)}><span className="menu-button-bar"></span><span className="menu-button-bar"></span><span className="menu-button-bar"></span></button>
				<ul>
					<li><IndexLink className={homeClass} onClick={this.toggleNavOpen.bind(this)} to='/'>Home</IndexLink></li>
					<li><Link className={researchClass} onClick={this.toggleNavOpen.bind(this)} to='/research'>Research</Link></li>
					<li><Link className={teachingClass} onClick={this.toggleNavOpen.bind(this)} to='/teaching'>Teaching</Link></li>
					<li><Link className={contactClass} onClick={this.toggleNavOpen.bind(this)} to='/contact'>Contact</Link></li>
				</ul>
			</nav>
		);
	}
}