import Header from "../components/Header";
import Footer from "../components/Footer";

import contactBanner from "../assets/contact-banner.jpg";

import "../styles/Contact.css";

function Contact() {

    return (

        <>

            <Header />

            <main className="contact-page">

                {/* ==========================================
                    Hero Banner
                ========================================== */}

                <section className="contact-banner">

                    <img
                        src={contactBanner}
                        alt="Contact Haryana Village Digital Shajra"
                    />

                    <div className="contact-overlay">

                        <span className="contact-tag">

                            CONTACT US

                        </span>

                        <h1>

                            Contact Us

                        </h1>

                        <p>

                            Connect with Haryana Village Digital
                            Shajra through our official social
                            platforms for updates, announcements
                            and project information.

                        </p>

                    </div>

                </section>

                <div className="container">

                    {/* ==========================================
                        Contact
                    ========================================== */}

                    <section className="contact-card">

                        <h2>

                            Get in Touch

                        </h2>

                        <p>

                            Haryana Village Digital Shajra is
                            continuously improving to make
                            Digital Shajra easily accessible
                            across Haryana.

                            If you have suggestions, feedback,
                            corrections or project-related
                            queries, feel free to connect with
                            us using the platforms below.

                        </p>

                    </section>

                    {/* ==========================================
                        Social Links
                    ========================================== */}

                    <section className="social-grid">

                        <a

                            href="https://instagram.com/"

                            target="_blank"

                            rel="noopener noreferrer"

                            className="social-card instagram"

                        >

                            <div className="social-icon">

                                📷

                            </div>

                            <h3>

                                Instagram

                            </h3>

                            <p>

                                Follow us for updates,
                                announcements and new
                                Digital Shajra coverage.

                            </p>

                            <span>

                                Follow Now

                            </span>

                        </a>

                        <a

                            href="https://t.me/"

                            target="_blank"

                            rel="noopener noreferrer"

                            className="social-card telegram"

                        >

                            <div className="social-icon">

                                ✈️

                            </div>

                            <h3>

                                Telegram

                            </h3>

                            <p>

                                Join our Telegram channel
                                to receive the latest
                                project updates instantly.

                            </p>

                            <span>

                                Join Channel

                            </span>

                        </a>

                    </section>

                    {/* ==========================================
                        Stay Connected
                    ========================================== */}

                    <section className="stay-connected">

                        <h2>

                            Stay Connected

                        </h2>

                        <p>

                            We are continuously expanding
                            Haryana Village Digital Shajra.

                            Stay connected through our
                            official social platforms to
                            receive the latest updates
                            and newly added villages.

                        </p>

                    </section>

                    {/* ==========================================
                        Follow
                    ========================================== */}

                    <section className="follow-card">

                        <h2>

                            Thank You

                        </h2>

                        <p>

                            Thank you for visiting
                            Haryana Village Digital
                            Shajra.

                            Your support and valuable
                            feedback help us improve
                            this platform for everyone.

                        </p>

                    </section>

                </div>

            </main>

            <Footer />

        </>

    );

}

export default Contact;