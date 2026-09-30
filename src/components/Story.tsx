import "./Story.css";

export default function Story() {
  return (
    <section id="story" className="story">
      <div className="wrap story__inner">
        <figure className="story__portrait">
          <img src="/owner-portrait.jpeg" alt="The founder of Setia wearing a black dress" />
          <figcaption><span>Sheila, founder</span><span>Setia / Nairobi</span></figcaption>
        </figure>

        <div className="story__text">
          <p className="eyebrow">The story behind Setia</p>
          <h2>This is my story. And I'm just getting started.</h2>

          <div className="story__body">
            <p>
              Setia began with my own journey of discovering modesty not as a
              limitation, but as a beautiful way of expressing who I am and
              what I believe.
            </p>
            <p>
              As I grew in that journey, I realised how difficult it could be
              to find clothes that felt modest, feminine, beautiful and truly
              me. And somewhere along the way, a desire was born in my heart:
              what if I could create them?
            </p>
            <p>That little thought became Setia.</p>
            <p>
              What started as a personal journey slowly became a dream to
              create beautiful dresses for women who, like me, want to dress
              modestly without losing their femininity or sense of style.
              Setia is deeply rooted in my faith, my love for fashion, and my
              love for African creativity.
            </p>
          </div>

          <blockquote className="story__quote">
            You don't have to compromise your values to feel beautiful.
          </blockquote>

          <div className="story__body">
            <p>
              Setia is still growing, and so am I. But with every dress we
              create, I hope another woman feels confident, feminine, seen
              and beautifully herself.
            </p>
          </div>

          <p className="story__signoff">— Sheila, Setia</p>
        </div>
      </div>
    </section>
  );
}