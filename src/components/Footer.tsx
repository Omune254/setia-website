import { Link } from "react-router-dom";
import { SOCIALS, WHATSAPP_NUMBER, whatsAppLink } from "../config";
import SocialIcon from "./SocialIcon";
import Reveal from "./Reveal";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return <footer id="contact" className="footer"><Reveal><div className="wrap footer__inner"><div className="footer__brand"><Link to="/"><img src="/logo.jpeg" alt="Setia" /></Link><p>Modest, feminine clothing</p></div><div className="footer__col"><p className="section-label">Get in touch</p><a className="footer__contact" href={whatsAppLink("Hi Setia, I have a question.")} target="_blank" rel="noreferrer"><SocialIcon name="whatsapp" /><span>WhatsApp: +{WHATSAPP_NUMBER.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4")}</span></a></div><div className="footer__col"><p className="section-label">Follow along</p><a className="footer__social" href={SOCIALS.instagram} target="_blank" rel="noreferrer"><SocialIcon name="instagram" /><span>Instagram</span></a><a className="footer__social" href={SOCIALS.tiktok} target="_blank" rel="noreferrer"><SocialIcon name="tiktok" /><span>TikTok</span></a></div><div className="footer__col"><p className="section-label">Explore</p><Link to="/shop">Shop the collection</Link><Link to="/custom-order">Custom orders</Link><Link to="/our-story">Our story</Link></div></div></Reveal><div className="wrap footer__bottom"><p>© {year} Setia. All rights reserved.</p><span>Made with intention.</span></div></footer>;
}
