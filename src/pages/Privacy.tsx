import { Container, Link, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { genMailToLink } from '../lib/mail';

export default function Privacy(): JSX.Element {
  const contactLink = (
    <Link href={genMailToLink({ subject: 'Privacy Notice' })}>
      info@dreamscholars.org
    </Link>
  );

  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Helmet>
        <title>Privacy Notice</title>
      </Helmet>
      <Typography variant="h3" gutterBottom>
        Privacy Notice
      </Typography>
      <Typography variant="h6" paragraph>
        Last Updated: April 25, 2022
      </Typography>

      <Typography paragraph>
        This privacy notice for DreamScholars ("<strong>Company</strong>," "
        <strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>"),
        describes how and why we might collect, store, use, and/or share ("
        <strong>process</strong>") your information when you use our services ("
        <strong>Services</strong>"), such as when you:
      </Typography>
      <ul>
        <Typography component="li" paragraph>
          Visit our website at{' '}
          <Link href="http://www.dreamscholars.org">
            http://www.dreamscholars.org
          </Link>
          , or any website of ours that links to this privacy notice
        </Typography>
        <Typography component="li" paragraph>
          Engage with us in other related ways, including any sales, marketing,
          or events
        </Typography>
      </ul>
      <Typography paragraph>
        <strong>Questions or concerns?</strong> Reading this privacy notice will
        help you understand your privacy rights and choices. If you do not agree
        with our policies and practices, please do not use our Services. If you
        still have any questions or concerns, please contact us at {contactLink}
        .
      </Typography>
      <Typography variant="h5" gutterBottom marginY={3}>
        SUMMARY OF KEY POINTS
      </Typography>
      <Typography paragraph>
        <strong>
          <em>
            This summary provides key points from our privacy notice, but you
            can find out more details about any of these topics by clicking the
            link following each key point or by using our table of contents
            below to find the section you are looking for. You can also click
          </em>
        </strong>{' '}
        <Link href="#toc">
          <strong>
            <em>here</em>
          </strong>
        </Link>{' '}
        <strong>
          <em>to go directly to our table of contents.</em>
        </strong>
      </Typography>
      <Typography paragraph>
        <strong>What personal information do we process?</strong> When you
        visit, use, or navigate our Services, we may process personal
        information depending on how you interact with DreamScholars and the
        Services, the choices you make, and the products and features you use.
        Click <Link href="#personal-info">here</Link> to learn more.
      </Typography>
      <Typography paragraph>
        <strong>Do we process any sensitive personal information?</strong> We
        may process sensitive personal information when necessary with your
        consent or as otherwise permitted by applicable law. Click{' '}
        <Link href="#sensitive-info">here</Link> to learn more.
      </Typography>
      <Typography paragraph>
        <strong>Do you receive any information from third parties?</strong> We
        do not receive any information from third parties.
      </Typography>
      <Typography paragraph>
        <strong>How do you process my information?</strong> We process your
        information to provide, improve, and administer our Services,
        communicate with you, for security and fraud prevention, and to comply
        with law. We may also process your information for other purposes with
        your consent. We process your information only when we have a valid
        legal reason to do so. Click <Link href="#info-use">here</Link> to learn
        more.
      </Typography>
      <Typography paragraph>
        <strong>
          In what situations and with which types of parties do we share
          personal information?
        </strong>{' '}
        We may share information in specific situations and with specific
        categories of third parties. Click <Link href="#who-share">here</Link>{' '}
        to learn more.
      </Typography>
      <Typography paragraph>
        <strong>How do we keep your information safe?</strong> We have
        organizational and technical processes and procedures in place to
        protect your personal information. However, no electronic transmission
        over the internet or information storage technology can be guaranteed to
        be 100% secure, so we cannot promise or guarantee that hackers,
        cybercriminals, or other unauthorized third parties will not be able to
        defeat our security and improperly collect, access, steal, or modify
        your information. Click <Link href="#info-safe">here</Link> to learn
        more.
      </Typography>
      <Typography paragraph>
        <strong>What are your rights?</strong> Depending on where you are
        located geographically, the applicable privacy law may mean you have
        certain rights regarding your personal information. Click{' '}
        <Link href="#privacy-rights">here</Link> to learn more.
      </Typography>
      <Typography paragraph>
        <strong>How do I exercise my rights?</strong> The easiest way to
        exercise your rights is by contacting us at {contactLink}. We will
        consider and act upon any request in accordance with applicable data
        protection laws.
      </Typography>
      <Typography paragraph>
        Want to learn more about what DreamScholars does with any information we
        collect? Click <Link href="#toc">here</Link> to review the notice in
        full.
      </Typography>

      <Typography id="toc" variant="h5" gutterBottom marginY={3}>
        TABLE OF CONTENTS
      </Typography>
      <Typography paragraph>
        <Link href="#info-collect">1. WHAT INFORMATION DO WE COLLECT?</Link>
      </Typography>
      <Typography paragraph>
        <Link href="#info-use">2. HOW DO WE PROCESS YOUR INFORMATION?</Link>
      </Typography>
      <Typography paragraph>
        <Link href="#who-share">
          3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </Link>
      </Typography>
      <Typography paragraph>
        <Link href="#cookies">
          4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </Link>
      </Typography>
      <Typography paragraph>
        <Link href="#social-logins">
          5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
        </Link>
      </Typography>
      <Typography paragraph>
        <Link href="#info-retain">
          6. HOW LONG DO WE KEEP YOUR INFORMATION?
        </Link>
      </Typography>
      <Typography paragraph>
        <Link href="#info-safe">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</Link>
      </Typography>
      <Typography paragraph>
        <Link href="#privacy-rights">8. WHAT ARE YOUR PRIVACY RIGHTS?</Link>
      </Typography>
      <Typography paragraph>
        <Link href="#DNT">9. CONTROLS FOR DO-NOT-TRACK FEATURES</Link>
      </Typography>
      <Typography paragraph>
        <Link href="#ca-residents">
          10. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
        </Link>
      </Typography>
      <Typography paragraph>
        <Link href="#policy-updates">
          11. DO WE MAKE UPDATES TO THIS NOTICE?
        </Link>
      </Typography>
      <Typography paragraph>
        <Link href="#contact">
          12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
        </Link>
      </Typography>
      <Typography paragraph>
        <Link href="#request">
          13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
          YOU?
        </Link>
      </Typography>

      <Typography id="info-collect" variant="h5" gutterBottom marginY={3}>
        1. WHAT INFORMATION DO WE COLLECT?
      </Typography>
      <Typography id="personal-info" paragraph>
        <strong>Personal information you disclose to us</strong>
      </Typography>
      <Typography paragraph>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>We collect personal information that you provide to us.</em>
      </Typography>
      <Typography paragraph>
        We collect personal information that you voluntarily provide to us when
        you register on the Services, express an interest in obtaining
        information about us or our products and Services, when you participate
        in activities on the Services, or otherwise when you contact us.
      </Typography>
      <Typography paragraph>
        <strong>Personal Information Provided by You.</strong> The personal
        information that we collect depends on the context of your interactions
        with us and the Services, the choices you make, and the products and
        features you use. The personal information we collect may include the
        following:
      </Typography>
      <ul>
        <Typography component="li" paragraph>
          names
        </Typography>
        <Typography component="li" paragraph>
          email addresses
        </Typography>
        <Typography component="li" paragraph>
          usernames
        </Typography>
        <Typography component="li" paragraph>
          passwords
        </Typography>
        <Typography component="li" paragraph>
          contact preferences
        </Typography>
        <Typography component="li" paragraph>
          contact or authentication data
        </Typography>
        <Typography component="li" paragraph>
          academic background
        </Typography>
      </ul>
      <Typography id="sensitive-info" paragraph>
        <strong>Sensitive Information.</strong> When necessary, with your
        consent or as otherwise permitted by applicable law, we process the
        following categories of sensitive information:
      </Typography>
      <ul>
        <Typography component="li" paragraph>
          student data
        </Typography>
        <Typography component="li" paragraph>
          information revealing race or ethnic origin
        </Typography>
      </ul>
      <Typography paragraph>
        <strong>Social Media Login Data.</strong> We may provide you with the
        option to register with us using your existing social media account
        details, like your Facebook, Twitter, or other social media account. If
        you choose to register in this way, we will collect the information
        described in the section called "
        <Link href="#social-logins">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</Link>"
        below.
      </Typography>
      <Typography paragraph>
        All personal information that you provide to us must be true, complete,
        and accurate, and you must notify us of any changes to such personal
        information.
      </Typography>
      <Typography paragraph>
        <strong>Information automatically collected</strong>
      </Typography>
      <Typography paragraph>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          Some information — such as your Internet Protocol (IP) address and/or
          browser and device characteristics — is collected automatically when
          you visit our Services.
        </em>
      </Typography>
      <Typography paragraph>
        We automatically collect certain information when you visit, use, or
        navigate the Services. This information does not reveal your specific
        identity (like your name or contact information) but may include device
        and usage information, such as your IP address, browser and device
        characteristics, operating system, language preferences, referring URLs,
        device name, country, location, information about how and when you use
        our Services, and other technical information. This information is
        primarily needed to maintain the security and operation of our Services,
        and for our internal analytics and reporting purposes.
      </Typography>
      <Typography paragraph>
        Like many businesses, we also collect information through cookies and
        similar technologies.
      </Typography>
      <Typography paragraph>The information we collect includes:</Typography>
      <ul>
        <Typography component="li" paragraph>
          <em>Log and Usage Data.</em> Log and usage data is service-related,
          diagnostic, usage, and performance information our servers
          automatically collect when you access or use our Services and which we
          record in log files. Depending on how you interact with us, this log
          data may include your IP address, device information, browser type,
          and settings and information about your activity in the Services (such
          as the date/time stamps associated with your usage, pages and files
          viewed, searches, and other actions you take such as which features
          you use), device event information (such as system activity, error
          reports (sometimes called "crash dumps"), and hardware settings).
        </Typography>
        <Typography component="li" paragraph>
          <em>Device Data.</em> We collect device data such as information about
          your computer, phone, tablet, or other device you use to access the
          Services. Depending on the device used, this device data may include
          information such as your IP address (or proxy server), device and
          application identification numbers, location, browser type, hardware
          model, Internet service provider and/or mobile carrier, operating
          system, and system configuration information.
        </Typography>
      </ul>

      <Typography id="info-use" variant="h5" gutterBottom marginY={3}>
        2. HOW DO WE PROCESS YOUR INFORMATION?
      </Typography>
      <Typography paragraph>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          We process your information to provide, improve, and administer our
          Services, communicate with you, for security and fraud prevention, and
          to comply with law. We may also process your information for other
          purposes with your consent.
        </em>
      </Typography>
      <Typography paragraph>
        <strong>
          We process your personal information for a variety of reasons,
          depending on how you interact with our Services, including:
        </strong>
      </Typography>
      <ul>
        <Typography component="li" paragraph>
          <strong>
            To facilitate account creation and authentication and otherwise
            manage user accounts.
          </strong>{' '}
          We may process your information so you can create and log in to your
          account, as well as keep your account in working order.
        </Typography>
        <Typography component="li" paragraph>
          <strong>
            To deliver and facilitate delivery of services to the user.
          </strong>{' '}
          We may process your information to provide you with the requested
          service.
        </Typography>
        <Typography component="li" paragraph>
          <strong>To send you marketing and promotional communications.</strong>{' '}
          We may process the personal information you send to us for our
          marketing purposes, if this is in accordance with your marketing
          preferences. You can opt out of our marketing emails at any time. For
          more information, see "
          <Link href="#privacy-rights">WHAT ARE YOUR PRIVACY RIGHTS?</Link> "
          below.
        </Typography>
        <Typography component="li" paragraph>
          <strong>
            To evaluate and improve our Services, products, marketing, and your
            experience.
          </strong>{' '}
          We may process your information when we believe it is necessary to
          identify usage trends, determine the effectiveness of our promotional
          campaigns, and to evaluate and improve our Services, products,
          marketing, and your experience.
        </Typography>
        <Typography component="li" paragraph>
          <strong>To identify usage trends.</strong> We may process information
          about how you use our Services to better understand how they are being
          used so we can improve them.
        </Typography>
      </ul>

      <Typography id="who-share" variant="h5" gutterBottom marginY={3}>
        3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
      </Typography>
      <Typography paragraph>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          We may share information in specific situations described in this
          section and/or with the following categories of third parties.
        </em>
      </Typography>
      <Typography paragraph>
        <strong>
          Vendors, Consultants, and Other Third-Party Service Providers.
        </strong>{' '}
        We may share your data with third-party vendors, service providers,
        contractors, or agents (“<strong>third parties</strong>”) who perform
        services for us or on our behalf and require access to such information
        to do that work. The categories of third parties we may share personal
        information with are as follows:
      </Typography>
      <ul>
        <Typography component="li" paragraph>
          Data Analytics Services
        </Typography>
        <Typography component="li" paragraph>
          User Account Registration &amp; Authentication Services
        </Typography>
        <Typography component="li" paragraph>
          Communication &amp; Collaboration Tools
        </Typography>
        <Typography component="li" paragraph>
          Website Hosting Service Providers
        </Typography>
      </ul>
      <Typography paragraph>
        We also may need to share your personal information in the following
        situations:
      </Typography>
      <ul>
        <Typography component="li">
          <strong>Business Transfers.</strong> We may share or transfer your
          information in connection with, or during negotiations of, any merger,
          sale of company assets, financing, or acquisition of all or a portion
          of our business to another company.
        </Typography>
      </ul>

      <Typography id="cookies" variant="h5" gutterBottom marginY={3}>
        4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
      </Typography>
      <Typography paragraph>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          We may use cookies and other tracking technologies to collect and
          store your information.
        </em>
      </Typography>
      <Typography paragraph>
        We may use cookies and similar tracking technologies (like web beacons
        and pixels) to access or store information. Specific information about
        how we use such technologies and how you can refuse certain cookies is
        set out in our Cookie Notice.
      </Typography>

      <Typography id="social-logins" variant="h5" gutterBottom marginY={3}>
        5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
      </Typography>
      <Typography paragraph>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          If you choose to register or log in to our services using a social
          media account, we may have access to certain information about you.
        </em>
      </Typography>
      <Typography paragraph>
        Our Services offer you the ability to register and log in using your
        third-party social media account details (like your Facebook or Twitter
        logins). Where you choose to do this, we will receive certain profile
        information about you from your social media provider. The profile
        information we receive may vary depending on the social media provider
        concerned, but will often include your name, email address, friends
        list, and profile picture, as well as other information you choose to
        make public on such a social media platform.
      </Typography>
      <Typography paragraph>
        We will use the information we receive only for the purposes that are
        described in this privacy notice or that are otherwise made clear to you
        on the relevant Services. Please note that we do not control, and are
        not responsible for, other uses of your personal information by your
        third-party social media provider. We recommend that you review their
        privacy notice to understand how they collect, use and share your
        personal information, and how you can set your privacy preferences on
        their sites and apps.
      </Typography>

      <Typography id="info-retain" variant="h5" gutterBottom marginY={3}>
        6. HOW LONG DO WE KEEP YOUR INFORMATION?
      </Typography>
      <Typography paragraph>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          We keep your information for as long as necessary to fulfill the
          purposes outlined in this privacy notice unless otherwise required by
          law.
        </em>
      </Typography>
      <Typography paragraph>
        We will only keep your personal information for as long as it is
        necessary for the purposes set out in this privacy notice, unless a
        longer retention period is required or permitted by law (such as tax,
        accounting, or other legal requirements). No purpose in this notice will
        require us keeping your personal information for longer than the period
        of time in which users have an account with us.
      </Typography>
      <Typography paragraph>
        When we have no ongoing legitimate business need to process your
        personal information, we will either delete or anonymize such
        information, or, if this is not possible (for example, because your
        personal information has been stored in backup archives), then we will
        securely store your personal information and isolate it from any further
        processing until deletion is possible.
      </Typography>

      <Typography id="info-safe" variant="h5" gutterBottom marginY={3}>
        7. HOW DO WE KEEP YOUR INFORMATION SAFE?
      </Typography>
      <Typography paragraph>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          We aim to protect your personal information through a system of
          organizational and technical security measures.
        </em>
      </Typography>
      <Typography paragraph>
        We have implemented appropriate and reasonable technical and
        organizational security measures designed to protect the security of any
        personal information we process. However, despite our safeguards and
        efforts to secure your information, no electronic transmission over the
        Internet or information storage technology can be guaranteed to be 100%
        secure, so we cannot promise or guarantee that hackers, cybercriminals,
        or other unauthorized third parties will not be able to defeat our
        security and improperly collect, access, steal, or modify your
        information. Although we will do our best to protect your personal
        information, transmission of personal information to and from our
        Services is at your own risk. You should only access the Services within
        a secure environment.
      </Typography>

      <Typography id="privacy-rights" variant="h5" gutterBottom marginY={3}>
        8. WHAT ARE YOUR PRIVACY RIGHTS?
      </Typography>
      <Typography paragraph>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>You may review, change, or terminate your account at any time.</em>
      </Typography>
      <Typography paragraph>
        If you are located in the EEA or UK and you believe we are unlawfully
        processing your personal information, you also have the right to
        complain to your local data protection supervisory authority. You can
        find their contact details here:{' '}
        <Link href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm">
          https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
        </Link>
        .
      </Typography>
      <Typography paragraph>
        If you are located in Switzerland, the contact details for the data
        protection authorities are available here:{' '}
        <Link href="https://www.edoeb.admin.ch/edoeb/en/home.html">
          https://www.edoeb.admin.ch/edoeb/en/home.html
        </Link>
        .
      </Typography>
      <Typography paragraph>
        <strong>Withdrawing your consent:</strong> If we are relying on your
        consent to process your personal information, which may be express
        and/or implied consent depending on the applicable law, you have the
        right to withdraw your consent at any time. You can withdraw your
        consent at any time by contacting us by using the contact details
        provided in the section "
        <Link href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Link> "
        below.
      </Typography>
      <Typography paragraph>
        However, please note that this will not affect the lawfulness of the
        processing before its withdrawal, nor when applicable law allows, will
        it affect the processing of your personal information conducted in
        reliance on lawful processing grounds other than consent.
      </Typography>
      <Typography paragraph>
        <strong>Opting out of marketing and promotional communications:</strong>{' '}
        You can unsubscribe from our marketing and promotional communications at
        any time by or by contacting us using the details provided in the
        section "
        <Link href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Link> "
        below. You will then be removed from the marketing lists. However, we
        may still communicate with you — for example, to send you
        service-related messages that are necessary for the administration and
        use of your account, to respond to service requests, or for other
        non-marketing purposes.
      </Typography>
      <Typography paragraph>
        <strong>Account Information</strong>
      </Typography>
      <Typography paragraph>
        If you would at any time like to review or change the information in
        your account or terminate your account, you can:
      </Typography>
      <ul>
        <Typography component="li" paragraph>
          Log in to your account settings and update your user account.
        </Typography>
        <Typography component="li" paragraph>
          Contact us using the contact information provided.
        </Typography>
      </ul>
      <Typography paragraph>
        Upon your request to terminate your account, we will deactivate or
        delete your account and information from our active databases. However,
        we may retain some information in our files to prevent fraud,
        troubleshoot problems, assist with any investigations, enforce our legal
        terms and/or comply with applicable legal requirements.
      </Typography>
      <Typography paragraph>
        <strong>Cookies and similar technologies:</strong> Most Web browsers are
        set to accept cookies by default. If you prefer, you can usually choose
        to set your browser to remove cookies and to reject cookies. If you
        choose to remove cookies or reject cookies, this could affect certain
        features or services of our Services. To opt out of interest-based
        advertising by advertisers on our Services visit{' '}
        <Link href="http://www.aboutads.info/choices/">
          http://www.aboutads.info/choices/
        </Link>
        .
      </Typography>
      <Typography paragraph>
        If you have questions or comments about your privacy rights, you may
        email us at {contactLink}.
      </Typography>

      <Typography id="DNT" variant="h5" gutterBottom marginY={3}>
        9. CONTROLS FOR DO-NOT-TRACK FEATURES
      </Typography>
      <Typography paragraph>
        Most web browsers and some mobile operating systems and mobile
        applications include a Do-Not-Track ("DNT") feature or setting you can
        activate to signal your privacy preference not to have data about your
        online browsing activities monitored and collected. At this stage no
        uniform technology standard for recognizing and implementing DNT signals
        has been finalized. As such, we do not currently respond to DNT browser
        signals or any other mechanism that automatically communicates your
        choice not to be tracked online. If a standard for online tracking is
        adopted that we must follow in the future, we will inform you about that
        practice in a revised version of this privacy notice.
      </Typography>

      <Typography id="ca-residents" variant="h5" gutterBottom marginY={3}>
        10. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
      </Typography>
      <Typography paragraph>
        <strong>
          <em>In Short:</em>
        </strong>{' '}
        <em>
          Yes, if you are a resident of California, you are granted specific
          rights regarding access to your personal information.
        </em>
      </Typography>
      <Typography paragraph>
        California Civil Code Section 1798.83, also known as the "Shine The
        Light" law, permits our users who are California residents to request
        and obtain from us, once a year and free of charge, information about
        categories of personal information (if any) we disclosed to third
        parties for direct marketing purposes and the names and addresses of all
        third parties with which we shared personal information in the
        immediately preceding calendar year. If you are a California resident
        and would like to make such a request, please submit your request in
        writing to us using the contact information provided below.
      </Typography>
      <Typography paragraph>
        If you are under 18 years of age, reside in California, and have a
        registered account with Services, you have the right to request removal
        of unwanted data that you publicly post on the Services. To request
        removal of such data, please contact us using the contact information
        provided below and include the email address associated with your
        account and a statement that you reside in California. We will make sure
        the data is not publicly displayed on the Services, but please be aware
        that the data may not be completely or comprehensively removed from all
        our systems (e.g., backups, etc.).
      </Typography>

      <Typography id="policy-updates" variant="h5" gutterBottom marginY={3}>
        11. DO WE MAKE UPDATES TO THIS NOTICE?
      </Typography>
      <Typography paragraph>
        <em>
          <strong>In Short:</strong> Yes, we will update this notice as
          necessary to stay compliant with relevant laws.
        </em>
      </Typography>
      <Typography paragraph>
        We may update this privacy notice from time to time. The updated version
        will be indicated by an updated "Revised" date and the updated version
        will be effective as soon as it is accessible. If we make material
        changes to this privacy notice, we may notify you either by prominently
        posting a notice of such changes or by directly sending you a
        notification. We encourage you to review this privacy notice frequently
        to be informed of how we are protecting your information.
      </Typography>

      <Typography id="contact" variant="h5" gutterBottom marginY={3}>
        12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
      </Typography>
      <Typography paragraph>
        If you have questions or comments about this notice, you may email us at{' '}
        {contactLink}.
      </Typography>

      <Typography id="request" variant="h5" gutterBottom marginY={3}>
        13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
      </Typography>
      <Typography paragraph>
        Based on the applicable laws of your country, you may have the right to
        request access to the personal information we collect from you, change
        that information, or delete it in some circumstances. To request to
        review, update, or delete your personal information, please contact us
        at
        {contactLink}.
      </Typography>
      <Typography paragraph>
        This privacy policy was created using Termly's{' '}
        <Link href="https://termly.io/products/privacy-policy-generator">
          Privacy Policy Generator
        </Link>
        .
      </Typography>
    </Container>
  );
}
