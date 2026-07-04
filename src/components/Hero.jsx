import heroMap from "../assets/hero-map.png";

import useReveal from "../hooks/useReveal";

import "../styles/Hero.css";

function Hero() {

  const reveal = useReveal();

  return (

    <section
      className="hero"
      style={{
        backgroundImage: `url(${heroMap})`,
      }}
    >

      <div className="container hero-container">

        <div
          ref={reveal}
          className="hero-content reveal"
        >
          <span className="hero-badge">
    Village-wise Digital Shajra Portal
</span>
          <h2>
            Haryana Village
            <br />
            Digital Shajra Portal
          </h2>

          <p>
            Browse districts, tehsils and villages to access Digital
            Shajra maps quickly and securely through a simple and
            user-friendly interface.
          </p>

        </div>

      </div>

    </section>

  );

}

export default Hero;