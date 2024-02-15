import React from 'react';
import './navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className='navbar'>
            <div className="navbar-items">
                <a href="/">Accueil</a>
                <a href="/">Pokedex</a>
                <a href="/">Equipe</a>
                <a href="/">Contact</a>
                <a href="#top">&#8593;</a>
            </div>
            <div className="navbar-title">
                <h1>PokeBuild</h1>
            </div>
        </nav>
    );
};

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    const navbarTitle = document.querySelector('.navbar-title') as HTMLElement;
    const navbarItems = document.querySelector('.navbar-items') as HTMLElement;
    const scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
        // Défilement vers le bas
        navbar.style.backgroundColor = 'white';
        navbar.style.color = 'red';
        navbarTitle.style.color = 'red';
        navbar.style.borderBottomColor = 'black';
        navbarItems.querySelectorAll('a').forEach((item: HTMLElement) => {
            item.style.color = 'red';
        });
    } else {
        // Retour en haut de la page
        navbar.style.backgroundColor = 'inherit';
        navbar.style.color = 'white';
        navbarTitle.style.color = 'inherit';
        navbar.style.borderBottomColor = 'white';
        navbarItems.querySelectorAll('a').forEach((item: HTMLElement) => {
            item.style.color = 'white';
        });
    }
});


export default Navbar;
