import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const LINKS = [
  { to: "/shop", label: "Shop" },
  { to: "/custom-order", label: "Custom orders" },
  { to: "/our-story", label: "Our story" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const closeMenu = () => setOpen(false);
  const navClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav__link nav__link--active" : "nav__link";

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="wrap nav__inner">
        <Link to="/" className="nav__brand" aria-label="Setia home" onClick={closeMenu}>
          <span className="nav__brand-frame"><img src="/logo.jpeg" alt="" /></span>
          <span className="nav__brand-word"><strong>Setia</strong><em>Modest womenswear</em></span>
        </Link>
        <nav className="nav__links" aria-label="Primary navigation">
          {LINKS.map((link) => <NavLink key={link.to} to={link.to} className={navClassName}>{link.label}</NavLink>)}
        </nav>
        <div className="nav__actions">
          <Link className="nav__explore" to="/shop"><span>Explore</span><span className="nav__arrow" aria-hidden="true">↗</span></Link>
          <button className={`nav__toggle ${open ? "nav__toggle--open" : ""}`} type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}><span /><span /></button>
        </div>
      </div>
      <div id="mobile-menu" className={`nav__mobile ${open ? "nav__mobile--open" : ""}`} aria-hidden={!open}>
        <div className="nav__mobile-inner">
          <div className="nav__mobile-top"><p className="nav__mobile-label">Navigate</p><button type="button" className="nav__mobile-close" aria-label="Close menu" onClick={closeMenu}>×</button></div>
          {LINKS.map((link, index) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav__mobile-link ${isActive ? "nav__mobile-link--active" : ""}`} onClick={closeMenu} style={{ "--mobile-delay": `${index * 70}ms` } as React.CSSProperties}><span>{link.label}</span><span aria-hidden="true">↗</span></NavLink>)}
          <Link to="/shop" className="nav__mobile-cta" onClick={closeMenu}>Explore the collection <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </header>
  );
}
