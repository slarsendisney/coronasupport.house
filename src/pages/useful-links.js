import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
export default () => (
  <Layout>
    <div className="row container">
      <div className="col-xs-12">
        <h1>Useful Links </h1>
        <div className="line" />
      </div>
      <div className="col-xs-12 ">
        <Link to="/network-map" className="is-pink">
          <h2>Network Map</h2>
        </Link>
        <p>Brighton and Hove Mutual Aid Groups</p>
      </div>
      <div className="col-xs-12 ">
        <h2>
          <a href="https://www.communityroots.org.uk/" className="is-pink">
            Community Roots Mental Health & Wellbeing support
          </a>{" "}
        </h2>
        <p>0808 196 1768</p>
        <p>Can arrange telephone support.</p>
      </div>
      <div className="col-xs-12 ">
        <h2>
          <a
            href="https://bucfp.org/news/2020/3/18/covid-19-and-uk-benefits "
            className="is-pink"
          >
            Brighton Unemployed Centre Families Project - COVID-19 and UK
            Benefits.
          </a>{" "}
        </h2>
        <p>
          Provide practical support and advice and much more to those in
          poverty.
        </p>
      </div>
      <div className="col-xs-12 ">
        <h2>
          <a href="http://ageingwellbh.org/ " className="is-pink">
            Ageing Well
          </a>{" "}
        </h2>
        <p>01273 322947 / text: 07770 061072</p>
        <p>Can refer people for telephone befriending services.</p>
      </div>
      <div className="col-xs-12 ">
        <h2>
          <a
            href="https://www.advicebrighton-hove.org.uk/08009887037  "
            className="is-pink"
          >
            Moneyworks
          </a>{" "}
        </h2>
        <p>Offers financial advice. </p>
      </div>
      <div className="col-xs-12 ">
        <h2>
          <a
            href="https://www.citizensonline.org.uk/coronavirus-support-resources/ "
            className="is-pink"
          >
            Citizens Online General advice
          </a>{" "}
        </h2>
        <p>Offers general advice. </p>
      </div>
    </div>
  </Layout>
);
