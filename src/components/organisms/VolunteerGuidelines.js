import React from "react";
import { Link } from "gatsby";

export default () => {
  return (
    <div className="row">
      <div className="col-xs-12 margin-5-b text-align-center pad-10-t">
        <h1>Volunteer Safeguarding Guidelines </h1>
        <p>
          Source:{" "}
          <a href="https://www.nationalfoodservice.uk/covid19">
            National Food Service
          </a>{" "}
        </p>
        <div className="line margin-3-b margin-auto-l margin-auto-r" />
      </div>
      <div className="col-xs-12 is-dark-blue pad-10-b">
        <h2>Basic precautions for handling shopping </h2>
        <ul>
          <li>
            <p>
              Don’t go into any houses. Leave food / goods outside the doorstep.
              Communicate to the person in isolation that you have delivered via
              message or phone call. Get confirmation that the person has
              received it before you leave.
            </p>
          </li>

          <li>
            <p>
              Check the safety of the products delivered. Check any packaging is
              sealed and the temperature of product on delivery e.g. If it’s
              meant to be frozen, is it still frozen?{" "}
            </p>
          </li>

          <li>
            <p>
              Recommend that recipients wash shopping wherever possible and wash
              their hands after touching it. 
            </p>
          </li>
          <li>
            <p>
              Remember to wash hands before and after deliveries. Where possible
              wash for 20 seconds with soap and water. When out and about keep a
              bottle of alcohol hand sanitiser to hand. 
            </p>
          </li>
          <li>
            <p>
              Cover your mouth and nose with a tissue when coughing and
              sneezing. If no tissue, cough and sneeze into the crook of your
              arm.
            </p>
          </li>
          <li>
            <p>
              Volunteers should ensure they have a low chance of becoming
              infected. Where possible follow social distancing protocol and
              don’t take unnecessary risks.
            </p>
          </li>
          <li>
            <p>
              Public transport should be avoided where possible. In cases where
              taking public transport is unavoidable, disinfection of the items
              delivered should be carried out.
            </p>
          </li>
          <li>
            <p>
              Take care when handling any items which may be given to people who
              may have compromised immune systems. The virus can live on
              inanimate surfaces for up to 24 hours.
            </p>
          </li>
          <li>
            <p>
              Disinfect any surface that will be touched by the person you are
              delivering to.
            </p>
          </li>
        </ul>
        <h2>Prescriptions</h2>
        <p>This guidance comes from Disabled People Against Cuts.</p>
        <ul>
          <li>
            <p>Prescriptions should be picked up in pairs.</p>
          </li>
          <li>
            <p>
              Volunteers collecting prescriptions should message organisers when
              they have collected prescriptions.
            </p>
          </li>
          <li>
            <p>
              Volunteers should message organisers when they have delivered
              prescriptions.
            </p>
          </li>
          <li>
            <p>
              Organisers should message the requester to confirm they have had
              their delivery before deleting the request.
            </p>
          </li>
          <li>
            <p>
              If you collect a prescription, do not advise on doses, preparation
              or administration of medication even if you have a relevant
              qualification. This should only be done by the prescriber.
            </p>
          </li>
          <li>
            <p>
              The same is true of over the counter medications, such as
              paracetamol and ibruprofen. No advice should be given by
              volunteers, no matter what you’ve read. The person requesting over
              the counter meds must take all responsibility for their request.
              If over the counter then only buy and deliver the maximum amount
              which can be purchased by one person (ie only 16 paracetamols and
              not boxes and boxes. If they need boxes then this should be
              prescribed).
            </p>
          </li>
          <li>
            <p>
              Don’t provide a panic buying service for paracetamols, nor pasta,
              nor anything.
            </p>
          </li>
        </ul>
        <h2>Safeguarding Guidelines for Administrators</h2>
        <ul>
          <li>
            <p>
              Data protection Make sure that only the right people see personal
              information. Don’t create public documents with lists of names and
              addresses.
            </p>
          </li>
          <li>
            <p>
              Contact information should only be shared among small street
              groups with learning, resources and best practice shared through
              the Volunteers Sq & Cres WhatsApp group.
            </p>
          </li>
        </ul>
        <h2>Reporting system for incidents</h2>
        <ul>
          <li>
            <p>
              Within small, street wide groups you can share concerns, specific
              problems and specific instances, if the victims of said incidences
              are happy with the specifics being shared. These discussions can
              take place on the Volunteers Sq & Cres WhatsApp group.
            </p>
          </li>
        </ul>
        <h2>Process for preventing future incidents</h2>
        <ul>
          <li>
            <p>
              This might include blocking people from WhatsApp groups so they
              can no longer see that information. It might include sharing
              information about things to look out for, such as scams you’ve
              discovered.
            </p>
          </li>
        </ul>
        <h2>Keep up with guidance as it comes out</h2>
        <ul>
          <li>
            <p>
              Make sure to keep up with the NHS and public health guidance and
              share this widely.
            </p>
          </li>
          <li>
            <p>
              Be careful about sharing other sources of information on the
              spread of the disease. Many of these are misinformed and can
              spread confusion.
            </p>
          </li>
        </ul>
        <Link to="/useful-links">
          <h2>Helpful links</h2>
        </Link>
      </div>
    </div>
  );
};
