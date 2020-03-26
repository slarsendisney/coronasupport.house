import React from "react";
import Logo from "../images/Logo-Blue.svg";
import SEO from "../components/seo";
import Layout from "../components/layout";
import { Link } from "gatsby";

export default () => {
  return (
    <Layout>
      <div className="is-dark-blue">
        <div className="row container">
          <div className="col-xs-12 text-align-center">
            <img src={Logo} alt="Logo" className="hero-logo" />
          </div>
          <div className="col-xs-12 text-align-center">
            <h1>Sussex Square & Lewes Crescent Mutual Aid Network</h1>
            <div className="line margin-auto-l margin-auto-r" />
            <div className="row pad-5-tb">
              <div className="col-xs-12 margin-5-b pad-3-tb pad-5-lr is-light-grey-bg border-radius">
                <p>
                  Please check back here regularly - We're building this website
                  as fast as we can and will have more helpful resources in the
                  coming days.
                </p>
              </div>
              <div className="col-xs-12 col-md-4 text-align-center">
                <Link to="/request-help">
                  <button
                    className="bubble-button margin-1"
                    style={{ width: "100%" }}
                  >
                    Request Support
                  </button>
                </Link>
              </div>
              {/* <div className="col-xs-12 col-md-4 text-align-center">
                <Link to="/request-help">
                  <button
                    className="bubble-button-secondary margin-1"
                    style={{ width: "100%" }}
                  >
                    Register as Vulnerable
                  </button>
                </Link>
              </div> */}
              <div className="col-xs-12 col-md-4 text-align-center">
                <Link to="/community">
                  <button
                    className="bubble-button-secondary margin-1"
                    style={{ width: "100%" }}
                  >
                    Community
                  </button>
                </Link>
              </div>
              <div className="col-xs-12 col-md-4 text-align-center">
                <Link to="/useful-links">
                  <button
                    className="bubble-button-secondary margin-1"
                    style={{ width: "100%" }}
                  >
                    Useful Links
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xs-12">
            <h2>Who are we?</h2>
            <p>
              We are the members of the Sussex Square, Lewes Crescent and
              Chichester and Arundel Terraces community - your neighbours! This
              is a community open to all living in this area. You may be in need
              of a little help, able to offer help to others, or indeed both.
              All are welcome here, and on the WhatsApp group we are connecting
              on, which can be accessed via{" "}
              <a
                href="https://chat.whatsapp.com/IV5xN8aaUgc9fGu5np89lb"
                className="is-pink"
              >
                this link
              </a>
              .
            </p>
            <p>
              Or, by contacting Stephanie Ferguson on{" "}
              <span className="is-pink">07876574202</span>, or Kelly Walsh on{" "}
              <span className="is-pink">07711963855</span> who would be happy to
              add you.
            </p>
          </div>
          <div className="col-xs-12">
            <h2>What are we offering?</h2>
            <p>
              We are volunteering to help each other as a community. As such, of
              course this is completely free. We are offering help with errands
              such as picking up urgent supplies, shopping, posting mail, dog
              walking or just friendly phone calls.
            </p>
          </div>
          <div className="col-xs-12">
            <h2>What we are not offering.</h2>
            <p>
              In a bid to avoid spreading infection and to keep everyone safe,
              we will not be entering each other's homes, or making physical
              contact. We cannot collect prescriptions (except under special
              circumstances e.g. if you know a volunteer personally), or provide
              medical assistance. We are in the process of compiling a list of
              organisations who will be able to provide support in any areas we
              are not able - these will be shared here in the coming days. In
              any case, please complete the form on this website detailing in
              which way you need assistance and we will endeavour to point you
              in the right direction if we cannot help ourselves.
            </p>
          </div>
          <div className="col-xs-12">
            <h2>Not sure if you are in our network?</h2>
            <p>
              You can check which network you are located within{" "}
              <Link to="/network-map" className="is-pink">
                on this map
              </Link>
              . It also contains Whatsapp groups for each network in the
              Brighton & Hove Area.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
