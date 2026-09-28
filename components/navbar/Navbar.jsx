import React from '../coverage/node_modules/react/index.js';

const links = [
  ['inicio', 'Inicio'], ['eventos', 'Eventos'], ['nosotros', 'Nosotros'],
  ['traslados', 'Traslados'], ['excursiones', 'Excursiones'], ['servicios', 'Servicios'],
  ['experiencias', 'Experiencias'], ['armatuviaje', 'Armá tu viaje'], ['contacto', 'Contacto'],
];

export default function Navbar() {
  return <header className="site-header navbar-editorial" id="top">
    <div className="navbar-inner">
      <a className="brand" href="index.html#inicio" aria-label="Lumini Viajes, inicio"><span className="lumini-logo lumini-logo-light"><img src="assets/images/lumini-logos.png" alt="Lumini Viajes" width="4268" height="5021" /></span></a>
      <button className="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="main-navigation"><span></span><span></span><span></span></button>
      <nav className="main-nav" id="main-navigation" aria-label="Navegación principal">
        <div className="navbar-links">{links.map(([id, label], index) => <a key={id} className={'nav-link' + (index === 0 ? ' active' : '')} href={'#' + id} aria-current={index === 0 ? 'location' : undefined}>{label}</a>)}</div>
      </nav>
    </div>
  </header>;
}
