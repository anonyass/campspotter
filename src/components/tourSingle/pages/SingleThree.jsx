import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TourSingleSidebar from "../TourSingleSidebar";
import OthersInformation from "../OthersInformation";
import MainInformation2 from "./MainInformation2";
import parse, { domToReact } from 'html-react-parser';

export default function SingleThree({ camp, user }) {
  const [campGroupName, setCampGroupName] = useState('');

  useEffect(() => {
    const fetchCampGroupName = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/campGroup/${camp.campgrpEmail}`);
        setCampGroupName(response.data.name);
      } catch (error) {
        console.error('Error fetching camp group name:', error);
      }
    };

    fetchCampGroupName();
  }, [camp.campgrpEmail]);

  const getEmbedUrl = (iframeString) => {
    const matches = iframeString.match(/src="([^"]+)"/);
    return matches ? matches[1] : '';
  };

  const embedUrl = getEmbedUrl(camp.googleMapUrl);

  const inclusionItems = camp.inclusion.split(' - ');

  const renderDescription = (description) => {
    const options = {
      replace: ({ name, children }) => {
        if (name === 'h4') {
          return (
            <h4>
              <FontAwesomeIcon icon={faClock} className="fa-clock" />
              {domToReact(children, options)}
            </h4>
          );
        }
      },
    };
    return parse(description, options);
  };

  return (
    <section className="pt-30 js-pin-container">
      <div className="container">
        <div className="row y-gap-30 justify-between">
          <div className="col-lg-8">
            <MainInformation2 camp={{ ...camp, duration: Number(camp.duration), campGroupName }} />
            <div className="row justify-center pt-30">
              <div className="col-12">
                <img
                  src={`http://localhost:5000/uploads/${camp.campPictureCover}`}
                  alt={camp.title}
                  className="img-cover2 rounded-12"
                />
              </div>
            </div>
            <div className="row y-gap-20 justify-between items-center layout-pb-md pt-60 md:pt-30">
              <OthersInformation
                duration={camp.duration}
                groupSize={String(camp.groupSize)}
                ages={camp.ages}
                locationMaterials={camp.locationMaterials}
                campId={camp._id}
              />
            </div>

            <h2 className="text-30">Tour Overview</h2>
            <p className="mt-20">{camp.highlights}</p>

            <div className="line mt-60 mb-60"></div>

            <h2 className="text-30">What&apos;s included</h2>
            <div className="row mt-20">
              {inclusionItems.map((item, index) => (
                <div className="col-md-6" key={index}>
                  <div className="inclusion-item">
                    <span className="check-icon">&#10003;</span>
                    {item}
                  </div>
                </div>
              ))}
            </div>

            <div className="line mt-60 mb-60"></div>

            <h2 className="text-30">Itinerary</h2>
            <div className="timeline mt-30 formatted-content">
              {renderDescription(camp.description)}
            </div>

            <h2 className="text-30 mt-60 mb-30">Camping map location</h2>
            <div className="embedded-map mt-30 mb-30">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <p>Map location is not available.</p>
              )}
            </div>

            <div className="line mt-60 mb-60"></div>

            <h2 className="text-30 pt-60">Leave a Reply</h2>
            <div className="contactForm y-gap-30 pt-30">
              <div className="row">
                <div className="col-12">
                  <div className="form-input">
                    <textarea placeholder="Leave your comment here" required rows="5"></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button className="button -md -dark-1 bg-accent-1 text-white">
                    Post Comment
                    <i className="icon-arrow-top-right text-16 ml-10"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="d-flex justify-end js-pin-content">
              {(!user || user.role === 'camper') && <TourSingleSidebar camp={camp} user={user} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

SingleThree.propTypes = {
  camp: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    campPictureCover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    highlights: PropTypes.string.isRequired,
    inclusion: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    groupSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    ages: PropTypes.string.isRequired,
    locationMaterials: PropTypes.string.isRequired,
    googleMapUrl: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    prix: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    campgrpEmail: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
};
