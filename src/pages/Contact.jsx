import Header from "../components/Header";
import Footer from "../components/Footer";

import { FaInstagram, FaTelegramPlane } from "react-icons/fa";

import contactBanner from "../assets/contact-banner.jpg";

import "../styles/Contact.css";

function Contact() {

    return (

        <>

            <Header />

            <main className="contact-page">

                <div className="container">

                    {/* ==========================
                        Banner
                    =========================== */}

                    <section className="contact-banner">

                        <img
                            src={contactBanner}
                            alt="Contact Haryana Village Digital Shajra"
                        />

                        <div className="contact-overlay">

                            <h1>

                                Contact Us

                            </h1>

                            <p>

                                Have a question, suggestion or feedback?
                                We'd love to hear from you.

                            </p>

                        </div>

                    </section>

                    {/* ==========================
                        Contact Intro
                    =========================== */}

                    <section className="contact-card">

                        <span className="contact-tag">

                            GET IN TOUCH

                        </span>

                        <h2>

                            Connect With Us

                        </h2>

                        <p>

                            If you have any questions, suggestions or
                            feedback regarding Haryana Village Digital
                            Shajra, feel free to connect with us through
                            our official social platforms below.

                        </p>

                    </section>

                    {/* ==========================
                        Social Cards
                    =========================== */}

                    <section className="social-grid">

                        <a
                            href="https://instagram.com/vishnu__patwari"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-card instagram"
                        >

                            <div className="social-icon">

                                <FaInstagram />

                            </div>

                            <h3>

                                Instagram

                            </h3>

                            <p>

                                @vishnu__patwari

                            </p>

                            <span>

                                Follow on Instagram →

                            </span>

                        </a>

                        <a
                            href="https://t.me/patwari8120"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-card telegram"
                        >

                            <div className="social-icon">

                                <FaTelegramPlane />

                            </div>

                            <h3>

                                Telegram

                            </h3>

                            <p>

                                @patwari8120

                            </p>

                            <span>

                                Join Telegram →

                            </span>

                        </a>

                    </section>

                    {/* ==========================
                        Stay Connected
                    =========================== */}

                    <section className="stay-connected">

                        <h2>

                            Stay Connected

                        </h2>

                        <p>

                            Follow us on Instagram or join our Telegram
                            channel to receive updates about newly
                            available Digital Shajra maps, portal
                            improvements and important announcements.

                        </p>

                    </section>

                </div>

            </main>

            <Footer />

        </>

    );

}

export default Contact;