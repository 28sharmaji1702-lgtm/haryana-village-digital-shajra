import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { getVillage } from "../services/googleSheet";

import villageBanner from "../assets/village-banner.jpg";

import "../styles/VillagePage.css";

function VillagePage() {

    const { code } = useParams();

    const [loading, setLoading] = useState(true);

    const [village, setVillage] = useState(null);

    useEffect(() => {

    window.scrollTo({

        top: 0,

        left: 0,

        behavior: "instant"

    });

    loadVillage();

}, [code]);
    async function loadVillage() {

        setLoading(true);

        try {

            const data = await getVillage(code);

console.log("Village Data:", data);

setVillage(data);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <>

                <Header />

                <main className="village-page">

                    <div className="container">

                        <div className="loading-card">

                            <div className="loading-spinner"></div>

                            <h2>

                                Loading Digital Shajra...

                            </h2>

                        </div>

                    </div>

                </main>

                <Footer />

            </>

        );

    }

    if (!village) {

        return (

            <>

                <Header />

                <main className="village-page">

                    <div className="container">

                        <div className="not-found-card">

                            <h2>

                                Village Not Found

                            </h2>

                            <p>

                                The requested village could not be found.

                            </p>

                            <Link
                                to="/"
                                className="back-home-btn"
                            >

                                ← Back to Home

                            </Link>

                        </div>

                    </div>

                </main>

                <Footer />

            </>

        );

    }

    return (

        <>

            <Header />

            <main className="village-page">

                <div className="container">
<section className="banner-section">

    <Link
        to="/"
        className="back-btn"
    >
        ← Back
    </Link>

    <img
        src={villageBanner}
        alt="Village Banner"
    />

    <div className="banner-overlay">

        <h1>

            {village.village}

        </h1>

        <p>

            {village.district}

            <span> • </span>

            {village.tehsil}

        </p>

    </div>

</section>              
                    
                    <section className="details-grid">

                        <div className="detail-card">

                            <span>

                                Village Name

                            </span>

                            <h3>

                                {village.village}

                            </h3>

                        </div>

                        <div className="detail-card">

                            <span>

                                District

                            </span>

                            <h3>

                                {village.district}

                            </h3>

                        </div>

                        <div className="detail-card">

                            <span>

                                Tehsil

                            </span>

                            <h3>

                                {village.tehsil}

                            </h3>

                        </div>

                        <div className="detail-card">

                            <span>

                                Digital Shajra

                            </span>

                            <h3
                                className={
                                    village.link
                                        ? "status-available"
                                        : "status-coming"
                                }
                            >

                                {
                                    village.link
                                        ? "Available"
                                        : "Coming Soon"
                                }

                            </h3>

                        </div>

                    </section>
                                        <section className="action-section">

                        {

                            village.link ? (

                                <a
                                    href={village.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="open-btn"
                                >

                                    🗺 Open Digital Shajra

                                </a>

                            ) : (

                                <button
                                    className="coming-btn"
                                    disabled
                                >

                                    ⏳ Digital Shajra Coming Soon

                                </button>

                            )

                        }

                    </section>

{/* ==========================
    Need Help
========================== */}

<section className="help-card">

    <h3>

        Need Help?

    </h3>

    <p>

        For corrections, updates, or any issues related to
        Digital Shajra maps, please contact the{" "}

        <a
            href="https://t.me/patwari8120"
            target="_blank"
            rel="noopener noreferrer"
        >
            Portal Administrator
        </a>.

    </p>

</section>

                    <section className="disclaimer">

                        <div className="disclaimer-icon">

                            ⚠️

                        </div>

                        <div className="disclaimer-content">

                            <h3>

                                Disclaimer

                            </h3>

                            <p>

                                The Digital Shajra maps available through this
                                portal are provided solely for informational and
                                reference purposes. They should not be treated
                                as official land records or legal documents.
                                Users are advised to verify all information
                                with the concerned Revenue Department or other
                                official government records before relying on
                                it for any legal, administrative, or official
                                purpose.

                            </p>

                        </div>

                    </section>


{/* ==========================
    Need Help
========================== */}



                </div>

            </main>

            <Footer />

        </>

    );

}

export default VillagePage;