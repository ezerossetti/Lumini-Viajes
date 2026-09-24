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
        <a className="nav-cta" href="https://wa.me/5493541272605?text=Hola%20Lumini%20Viajes%2C%20quiero%20hacer%20una%20consulta." target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5A9 9 0 1 1 21 11.5Z"/><path d="M8 7c0 5 4 8 8 8l1-2-3-1-1 1-3-3 1-1-1-2Z"/></svg>
          <span>WhatsApp</span><span className="nav-cta-arrow" aria-hidden="true">→</span>
        </a>
      </nav>
    </div>
  </header>;
}
