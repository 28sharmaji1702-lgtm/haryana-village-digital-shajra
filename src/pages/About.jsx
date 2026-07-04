import Header from "../components/Header";
import Footer from "../components/Footer";

import aboutBanner from "../assets/about-banner.jpg";

import "../styles/About.css";

function About() {

    return (

        <>

            <Header />

            <main className="about-page">

                <div className="container">

                    {/* ==========================
                        Banner
                    =========================== */}

                    <section className="about-banner">

                        <img
                            src={aboutBanner}
                            alt="Haryana Village Digital Shajra"
                        />

                        <div className="banner-overlay">

                            <h1>

                                Haryana Village
                                Digital Shajra

                            </h1>

                            <p>

                                Making Village Digital Shajra
                                Accessible Across Haryana

                            </p>

                        </div>

                    </section>

                    {/* ==========================
                        About
                    =========================== */}

                    <section className="about-card">

                        <span className="about-tag">

                            ABOUT THE PORTAL

                        </span>

                        <h2>

                            About Haryana Village Digital Shajra

                        </h2>

                        <p>

                            Haryana Village Digital Shajra is a portal that
                            provides easy access to village-wise Digital
                            Shajra maps across Haryana. It helps users
                            quickly locate and view the available Digital
                            Shajra for their selected village.

                        </p>

                        <p>

                            Users can simply select a district, choose a
                            tehsil, and then select a village to open the
                            available Digital Shajra map from one place,
                            making the search process easy and organized.

                        </p>

                    </section>

                    {/* ==========================
                        Vision
                    =========================== */}

                    <section className="vision-card">

                        <h2>

                            Our Vision

                        </h2>

                        <p>

                            Our vision is to make village-wise Digital
                            Shajra maps easily accessible, organized,
                            and available at one place for everyone
                            across Haryana.

                        </p>

                    </section>

                </div>

            </main>

            <Footer />

        </>

    );

}

export default About;