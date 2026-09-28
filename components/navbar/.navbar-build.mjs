// Navbar.jsx
import React from "../coverage/node_modules/react/index.js";
var links = [
  ["inicio", "Inicio"],
  ["eventos", "Eventos"],
  ["nosotros", "Nosotros"],
  ["traslados", "Traslados"],
  ["excursiones", "Excursiones"],
  ["servicios", "Servicios"],
  ["experiencias", "Experiencias"],
  ["armatuviaje", "Arm\xE1 tu viaje"],
  ["contacto", "Contacto"]
];
function Navbar() {
  return /* @__PURE__ */ React.createElement("header", { className: "site-header navbar-editorial", id: "top" }, /* @__PURE__ */ React.createElement("div", { className: "navbar-inner" }, /* @__PURE__ */ React.createElement("a", { className: "brand", href: "index.html#inicio", "aria-label": "Lumini Viajes, inicio" }, /* @__PURE__ */ React.createElement("span", { className: "lumini-logo lumini-logo-light" }, /* @__PURE__ */ React.createElement("img", { src: "assets/images/lumini-logos.png", alt: "Lumini Viajes", width: "4268", height: "5021" }))), /* @__PURE__ */ React.createElement("button", { className: "menu-toggle", type: "button", "aria-label": "Abrir men\xFA", "aria-expanded": "false", "aria-controls": "main-navigation" }, /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null)), /* @__PURE__ */ React.createElement("nav", { className: "main-nav", id: "main-navigation", "aria-label": "Navegaci\xF3n principal" }, /* @__PURE__ */ React.createElement("div", { className: "navbar-links" }, links.map(([id, label], index) => /* @__PURE__ */ React.createElement("a", { key: id, className: "nav-link" + (index === 0 ? " active" : ""), href: "#" + id, "aria-current": index === 0 ? "location" : void 0 }, label))))));
}
export {
  Navbar as default
};
