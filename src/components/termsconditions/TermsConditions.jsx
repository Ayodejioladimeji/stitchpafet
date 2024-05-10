import React from "react";

//
import BreadCumb from "../../styles/components/breadcumb/BreadCumb";
//

const TermsConditions = () => {
  return (
    <div className="terms-conditions">
      <BreadCumb
        header="Terms & Conditions"
        text="We protect the interests of the transacting parties (both buyer &
          seller) and ensure both parties walk away with satisfaction after the
          transaction is concluded."
        img="/assets/terms.svg"
      />

      <div className="terms-div">
        <div className="terms-box">
          <h2>Terms & Condition</h2>
          <p>
            These Website Terms and Conditions (“Terms”) contained herein on
            this webpage, shall govern your access to and use of this website,
            including all pages within this website (collectively referred to as
            this “Website”). These Terms apply in full force and effect to your
            use of this Website and by using this Website, you expressly accept
            all terms and conditions contained herein in full. You must not use
            this Website, if you have any objection to any of these Terms.
            PLEASE READ AND UNDERSTAND THE TERMS OF AGREEMENT CAREFULLY BEFORE
            BEING AGREED TO BE BOUND BY ITS TERMS.
          </p>
        </div>

        <hr className="line" />

        <div className="terms-box">
          <h2>2. Third-Party Links</h2>
          <p>
            This website may include links to third-party websites, plug-ins and
            applications. Clicking on those links or enabling those connections
            may allow third parties to collect or share data about you. We do
            not control these third-party websites and are not responsible for
            their privacy statements. When you leave our website, we encourage
            you to read the privacy notice of every website you visit.
          </p>
        </div>

        <hr className="line" />

        <div className="terms-box">
          <h2>3. Rights To Amendment</h2>
          <p>
            We may decide to change our privacy policy as our technology and
            service evolves and our users will be notified via this page or any
            means available to reach our users. Vesicash reserves the right to
            update, modify or amend this as may be deemed required at any time
            in the future.
          </p>
        </div>

        <hr className="line" />

        <div className="terms-box">
          <h2>4. Personal information that we collect</h2>
          <p>
            To have access to the Vesicash platform and services, it requires
            you to have a Vesicash account. When you register for the Vesicash
            account, you voluntarily supply us with some personal information
            which we collect by lawful means. Personal Information refers to the
            information you provided to us during Sign Up or any information
            that may be used to identify or contact you anytime e.g.( Name,
            email address, Country, Phone number, Business name etc.). Personal
            Information can be divided into the following categories;
          </p>
        </div>

        <hr className="line" />

        <div className="terms-box">
          <h2>5. How Your Personal Data Are Being Collected</h2>
          <p>
            We use different methods to collect data from and about you
            including through: Direct interactions- You may give us your
            Identity, Profile and Contact Data and Financial and Transaction
            Data by filling in forms or by corresponding with us by post, phone,
            email or otherwise. This includes personal data you provide when
            you:
          </p>
        </div>

        <hr className="line" />

        <div className="terms-box">
          <h2>6. How We Use Your Personal Information</h2>
          <p>
            We may process your personal data for a variety of reasons that are
            justified and are allowed under data protection laws in the European
            Economic Area and Switzerland which forms the legal basis on how we
            process your personal data. Most commonly, we will use your personal
            data in the following circumstances:
          </p>
        </div>

        <hr className="line" />

        <div className="terms-box">
          <h2>7. Protecting Your Information</h2>
          <p>
            Vesicash protects your personal information using global security
            standards against loss or theft, as well as against any unauthorized
            access, risk of loss, disclosure,copying, misuse or modification. We
            render all your information via Secure Socket Layer called Transport
            Layer Security (TSL).We have put in place appropriate security
            measures to prevent your personal data from being accidentally lost,
            used or accessed in an unauthorised way, altered or disclosed. In
            addition, we limit access to your personal data to those employees,
            agents, contractors and other third parties who have a business need
            to know. They will only process your personal data on our
            instructions and they are subject to a duty of confidentiality. We
            have put in place procedures to deal with any suspected personal
            data breach and will notify you and any applicable regulator of a
            breach where we are legally required to do so.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
