import React from "react";

export default function BannerFour() {
  return (
    <section className="layout-pt-xxl layout-pb-xxl relative">
      <div className="sectionBg">
        <img src="/img/cta/3/1.png" alt="image" className="img-ratio" />
      </div>

      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <h2
              data-aos="fade-up"
              data-aos-delay=""
              className="text-70 md:text-40 sm:text-30 text-white fw-700"
            >
              Simplify Camping, Amplify Fun!
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay=""
              className="text-white mt-20"
            >
              Join Us: Embark on Unforgettable Adventures with Camp Spotter!
              <br className="md:d-none" /> Explore the Great Outdoors with Ease!
              locked in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
