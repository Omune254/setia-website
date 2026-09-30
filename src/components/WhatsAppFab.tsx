import { whatsAppLink } from "../config";
import SocialIcon from "./SocialIcon";
import "./WhatsAppFab.css";

export default function WhatsAppFab() {
  return <a className="fab" href={whatsAppLink("Hi Setia, I have a question.")} target="_blank" rel="noreferrer" aria-label="Chat with Setia on WhatsApp"><SocialIcon name="whatsapp" /></a>;
}
