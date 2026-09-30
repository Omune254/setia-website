import { whatsAppLink } from "../config";
import "./CustomOrder.css";

const STEPS = [
  {
    title: "Tell us your idea",
    body: "Send a photo, sketch, or simply describe what you have in mind fabric, colour, occasion.",
  },
  {
    title: "We confirm the details",
    body: "We'll talk through measurements, fabric options, timeline and price on WhatsApp before anything is cut.",
  },
  {
    title: "Your piece is made",
    body: "Each outfit is cut and sewn for you specifically, whether it's one dress or an order for a group.",
  },
];

export default function CustomOrder() {
  return (
    <section id="custom" className="custom">
      <div className="wrap custom__inner">
        <div className="custom__intro">
          <p className="section-label">Made to order</p>
          <h2>Have a design in mind? Let's make it.</h2>
          <p className="custom__lede">
            Not everyone finds exactly what they're looking for on the shelf
            — and that's exactly what Setia is for. Bring us an idea, and
            we'll make it for you, whether it's a single dress for an
            occasion or a bulk order for a bridal party, church group, or
            event.
          </p>

          <div className="custom__ctas">
            <a
              className="btn btn-on-dark"
              href={whatsAppLink(
                "Hi Setia, I'd like to request a custom design for myself. Here's what I have in mind:"
              )}
              target="_blank"
              rel="noreferrer"
            >
              Request a single design
            </a>
            <a
              className="btn btn-on-dark btn-outline"
              href={whatsAppLink(
                "Hi Setia, I'd like to request a bulk order (please share group size and occasion). Here's what I have in mind:"
              )}
              target="_blank"
              rel="noreferrer"
            >
              Request a bulk order
            </a>
          </div>
        </div>

        <ol className="custom__steps">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="custom__step-index">{i + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
