import Header from "../components/Header";
import Footer from "../components/Footer";

import aboutBanner from "../assets/about-banner.jpg";

import "../styles/About.css";

function About() {

    return (

        <>

            <Header />

            <main className="about-page">

                {/* ==========================================
                    Hero Banner
                ========================================== */}

                <section className="about-banner">

                    <img
                        src={aboutBanner}
                        alt="Haryana Village Digital Shajra"
                    />

                    <div className="banner-overlay">

                        <span className="about-tag">

                            ABOUT THE PORTAL

                        </span>

                        <h1>

                            Haryana Village
                            <br />
                            Digital Shajra

                        </h1>

                        <p>

                            Making village-wise Digital Shajra
                            easily accessible, organized and
                            available across Haryana through a
                            simple, secure and user-friendly
                            digital platform.

                        </p>

                    </div>

                </section>

                <div className="container">

                    {/* ==========================================
                        About
                    ========================================== */}

                    <section className="about-card">

                        <h2>

                            About Haryana Village Digital Shajra

                        </h2>

                        <p>

                            Haryana Village Digital Shajra is an
                            initiative to provide quick and
                            convenient access to village-wise
                            Digital Shajra maps across Haryana
                            through a clean and easy-to-use web
                            portal.

                        </p>

                        <p>

                            Users can simply select a District,
                            choose a Tehsil and then browse the
                            available villages to open the
                            corresponding Digital Shajra map from
                            one place without searching across
                            multiple sources.

                        </p>

                        <p>

                            The portal is designed with a modern,
                            mobile-friendly interface to make land
                            record navigation simpler for citizens,
                            professionals and anyone looking for
                            village Digital Shajra information.

                        </p>

                    </section>

                    {/* ==========================================
                        Vision
                    ========================================== */}

                    <section className="vision-card">

                        <h2>

                            Our Vision

                        </h2>

                        <p>

                            Our vision is to make every available
                            village Digital Shajra across Haryana
                            easily accessible, organized and
                            available from a single digital
                            platform with a fast, reliable and
                            user-friendly experience.

                        </p>

                    </section>

                </div>

            </main>

            <Footer />

        </>

    );

}

export default About;