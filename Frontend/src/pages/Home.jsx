import { Link } from "react-router-dom";

const highlights = [
  [
    "🏔️",
    "Mountain Escapes",
    "Explore breathtaking valleys and peaks."
  ],
  [
    "🏞️",
    "Beautiful Lakes",
    "Discover peaceful lakes and scenic views."
  ],
  [
    "🏛️",
    "Historic Places",
    "Experience Pakistan's rich history and culture."
  ]
];

function Home() {
  return (
    <>
      <section className="hero">

        <div className="hero-overlay">

          <div className="hero-content">

            <p className="eyebrow">
              EXPLORE • DISCOVER • TRAVEL
            </p>

            <h1>
              Discover the beauty of Pakistan.
            </h1>

            <p>
              From majestic mountains to historic cities,
              find your next unforgettable destination.
            </p>

            <Link
              to="/destinations"
              className="primary-button"
            >
              Explore Destinations
            </Link>

          </div>

        </div>

      </section>

      <section className="section">

        <div className="section-heading center">

          <p className="eyebrow dark">
            WHY TRAVEL WITH US
          </p>

          <h2>
            Places worth discovering
          </h2>

          <p>
            Find inspiration for your next journey across Pakistan.
          </p>

        </div>

        <div className="highlight-grid">

          {highlights.map(
            ([icon, title, text]) => (
              <div
                className="highlight-card"
                key={title}
              >

                <div className="highlight-icon">
                  {icon}
                </div>

                <h3>{title}</h3>

                <p>{text}</p>

              </div>
            )
          )}

        </div>

      </section>

      <section className="cta-section">

        <div>

          <p className="eyebrow">
            READY TO EXPLORE?
          </p>

          <h2>
            Your next adventure starts here.
          </h2>

        </div>

        <Link
          to="/destinations"
          className="light-button"
        >
          Browse Destinations
        </Link>

      </section>
    </>
  );
}

export default Home;