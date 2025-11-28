import { siteConfig } from './site.config';

export const complianceContent = {
  // Privacy Policy Content - Based on Andiamo Template
  privacy: {
    hero: {
      title: "Privacy Policy",
      subtitle: `Your privacy is important to ${siteConfig.client.legalName}`,
      lastUpdated: siteConfig.compliance.legal.lastUpdated
    },
    sections: [
      {
        title: `We Are ${siteConfig.client.legalName}`,
        type: "intro",
        content: [
          `${siteConfig.client.legalName} is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.<br /><br />This website is operated by Andiamo Ventures LLC ("Andiamo Ventures," "we," "our," or "us"). YourHomeSecured is a brand of Andiamo Ventures LLC.`
        ]
      },
      {
        title: "Information We Collect",
        type: "list",
        intro: "We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us. We may collect the following types of information:",
        content: [
          "<strong>Personal Information:</strong> Name, email address, phone number, company information, mailing address, and other contact details you choose to provide",
          "<strong>Payment Information:</strong> Billing details necessary to process transactions for our services",
          "<strong>Usage Data:</strong> Information about your device and how you interact with our services, including your IP address, browser type, operating system, referring URLs, and pages viewed",
          "<strong>SMS Communication Data:</strong> Phone numbers and consent records for SMS messaging"
        ]
      },
      {
        title: "SMS Communications",
        type: "paragraph",
        content: [
          "Information collected for SMS consent may be shared with third parties or affiliates for marketing purposes. Please review our Terms of Service page for complete details about our SMS practices and your rights regarding text message communications."
        ]
      },
      {
        title: "Opt-in Language",
        type: "paragraph",
        content: [
          `When you provide your phone number and opt in to receive SMS messages, you explicitly consent to receive service-related and informational text messages from ${siteConfig.client.name}.`
        ]
      },

      {
        title: "How to Opt-Out of SMS Communications",
        type: "list",
        intro: `You can opt-out of receiving SMS messages from ${siteConfig.client.name} at any time using the following methods:`,
        content: [
          "Reply <strong>STOP</strong> to any SMS message you receive from us",
          "Text <strong>STOP</strong> to our SMS number",
          "Reply <strong>HELP</strong> for assistance with opting out",
          "Contact our customer service team directly"
        ],
        outro: "Once you text <strong>STOP</strong>, you will receive a confirmation message and will not receive any further SMS communications from us. You can opt back in at any time by texting <strong>START</strong> or <strong>YES</strong> to our SMS number. <br><br>Standard message and data rates may apply for opt-out messages. For additional support with opting out, contact us at <strong>admin@yourhomesecured.com</strong>."
      },
      {
        title: "How We Use Your Information",
        type: "list",
        intro: "We use the information we collect to:",
        content: [
          "Provide, maintain, operate, and improve our services",
          "Process transactions and send related information and relevant notifications",
          "Send you technical notices, updates, security alerts, and support messages",
          "Communicate with you via SMS, email, or other channels about products, services, and events",
          "Respond to your comments, questions, inquiries, and provide customer service",
          "Monitor and analyze trends, usage, and activities in connection with our services",
          "Ensure compliance with legal and regulatory requirements",
          `Communicate with you via SMS, email, or other channels about home security as well as other home-related products and services, including but not limited to home warranty, solar energy, HVAC, plumbing, roofing, and other home service offerings. These communications may be made directly by ${siteConfig.client.name} (Andiamo Ventures LLC) or by our trusted service partners in those categories. You may opt out of marketing communications at any time. `
        ]
      },
      {
        title: "Sharing and Disclosure of Information",
        type: "list",
        intro: "We may sell your personal information to licensed home service partners in exchange for compensation. These partners may include providers of home security, home warranty, solar, HVAC, roofing, and related home services. We sell this information for the purpose of connecting you with companies that can provide services you have shown interest in.<br><br>We do not sell personal information to insurance companies, healthcare providers, or law firms under this brand.<br><br>We may also share your information with:",
         content: [
          "<strong>Service Providers:</strong> Vendors, consultants, and third-party companies that assist with payment processing, SMS delivery, operational support, and other services who need access to such information to carry out work on our behalf",
          "<strong>Legal Compliance:</strong> In response to a request for information if we believe disclosure is in accordance with applicable law, regulation, or legal process to protect our rights and operations",
          "<strong>Business Transfers:</strong> In the event of a merger, acquisition, reorganization, or sale of assets",
          "<strong>Safety and Rights Protection:</strong> To protect the rights, property, and safety of ${siteConfig.client.name}, our users, or others"
        ]
      },
      {
        title: "Data Security",
        type: "paragraph",
        content: [
          "We implement appropriate technical and organizational measures and industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure. You acknowledge that you provide information at your own risk."
        ]
      },
      {
        title: "Cookies and Tracking Technologies",
        type: "paragraph",
        content: [
          "We use cookies and similar tracking technologies to collect and track information about your use of our services. You can control cookies through your browser settings, but disabling cookies may affect the functionality of our services."
        ]
      },
      {
        title: "Data Retention",
        type: "paragraph",
        content: [
          "We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your personal information, we will securely delete or anonymize it."
        ]
      },
      {
        title: "Your Rights and Choices",
        type: "list",
        intro: "You have certain rights regarding your personal information, including:",
        content: [
          "The right to access, update, or delete your personal information",
          "The right to opt out of marketing communications, including SMS messages",
          "The right to request that we restrict the processing of your personal information",
          "The right to request a copy of the data we store about you"
        ],
        outro: `To exercise these rights, please contact us at <strong>${siteConfig.compliance.contact?.email || 'admin@yourhomesecured.com'}</strong>.`
      },
      {
        title: "Children's Privacy",
        type: "paragraph",
        content: [
          "Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information."
        ]
      },
      {
        title: "International Data Transfers",
        type: "paragraph",
        content: [
          "Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards."
        ]
      },
      {
        title: "Third-Party Services",
        type: "paragraph",
        content: [
          "Our website does not condone or endorse third-party links. Any external links that may appear are not under our control, and we are not responsible for their content, policies, or practices."
        ]
      },
      {
        title: "California Privacy Rights (CCPA)",
        type: "paragraph",
        content: [
          "This section applies to California residents and supplements our Privacy Policy above. We adopt this notice to comply with the California Consumer Privacy Act of 2018 (CCPA). Terms defined in the CCPA have the same meaning when used in this section.",
          "",
          "For more information about your California privacy rights, visit the California Privacy Protection Agency at <a href=\"https://cppa.ca.gov/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 hover:underline\">https://cppa.ca.gov/</a>."
        ]
      },
      {
        title: "Personal Information We Collect",
        type: "list",
        intro: "In the past 12 months, we have collected the following categories of personal information from California residents:",
        content: [
          "<strong>Identifiers:</strong> Name, email address, phone number, mailing address, IP address",
          "<strong>Contact Information:</strong> Phone number, email, physical address, company information", 
          "<strong>Commercial Information:</strong> Records of home security services considered or purchased",
          "<strong>Internet Activity:</strong> Website browsing history, pages viewed, interaction with our site and advertisements",
          "<strong>Geolocation Data:</strong> General geographic location derived from IP address"
        ],
      },
      {
        title: "Sources of Information",
        type: "list",
        content: [
          "Directly from you when you complete forms or contact us",
          "Automatically through cookies and tracking technologies", 
          "From our security partner network and service providers"
        ],
      },
      {
        title: "How We Use Your Information",
        type: "list",
        content: [
          "Connect you with qualified home security providers",
          "Process your security service requests and transactions",
          "Send service-related communications via email and SMS",
          "Improve our website and matching services",
          "Analyze website usage and customer preferences",
          "Comply with legal obligations and protect our rights"
        ]
      },
      {
        title: "Sharing Your Information",
        type: "list",
        intro: "We share personal information with:",
        content: [
          "<strong>Security Partners:</strong> Licensed home security companies to match you with services",
          "<strong>Service Providers:</strong> Companies that assist with website operations, payment processing, and SMS delivery",
          "<strong>Legal Authorities:</strong> When required by law or to protect our rights"
        ],
        outro: [
          "<strong>Important:</strong> In the past 12 months, we may have sold your personal information to licensed home service partners — including providers of home security, home warranty, solar, HVAC, roofing, and related services — in exchange for compensation. We do not sell personal information to insurance companies, healthcare providers, or law firms under this brand.</br></br>Under California law, the disclosure of your personal information to third parties for compensation may be considered a \"sale\" of data. You have the right to opt out of the \"sale\" of your personal information at any time by emailing <strong>admin@yourhomesecured.com</strong> with \"<strong>OPT OUT</strong>\" in the subject line or by clicking the \"Do Not Sell or Share My Personal Information\" link on our website."
        ]
      },
      {
        title: "Your California Rights",
        type: "list",
        content: [
          "<strong>Right to Know:</strong> Request information about what personal information we collect about you, how we use and share your personal information, and the categories of sources and third parties we share with.",
          "<strong>Right to Delete:</strong> Request deletion of personal information we have collected from you (subject to certain legal exceptions).",
          "<strong>Right to Opt Out:</strong> Opt out of the \"sale\" or sharing of your personal information with security partners. To opt out, email us at <strong>admin@yourhomesecured.com</strong> with \"OPT OUT\" in the subject line.",
          "<strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights."
        ]
      },
      {
        title: "How to Exercise Your Rights",
        type: "list",
        intro: "<strong>Contact Methods:</strong>",
        content: [
          "Email: <strong>admin@yourhomesecured.com</strong> (preferred method)",
          "Subject Line: \"California Privacy Request\""
        ],
        outro: ""
      },
      {
        title: "Verification Process",
        type: "paragraph",
        content: [
          "To protect your privacy, we will verify your identity by asking you to provide information that matches our records, such as your email address and details about your interaction with our services."
        ]
      },
      {
        title: "Response Timeline",
        type: "list",
        content: [
          "We will acknowledge your request within 10 business days",
          "We will respond within 45 days (extendable to 90 days if needed)",
          "We do not charge fees for processing requests unless they are excessive or repetitive."
        ]
      },
      {
        title: "Authorized Agents",
        type: "paragraph",
        content: [
          "You may designate an authorized agent to make requests on your behalf. The agent must provide proof of authorization, and you may need to verify your identity directly with us."
        ]
      },
      {
        title: "CCPA Contact Information",
        type: "paragraph",
        content: [
          "For questions about your California privacy rights or to submit a request, refer to the <strong>\"Contact Methods\"</strong> section above."
        ]
      },
      {
        title: "Updates",
        type: "paragraph",
        content: [
          "We may update this California Privacy Rights section to reflect changes in our practices or applicable law. Updates will be posted on this page with a revised “Last Updated” date."
        ]
      },
      {
        title: "Changes to This Privacy Policy",
        type: "paragraph",
        content: [
          "We reserve the right to update this Privacy Policy from time to time. Changes will be effective upon posting to our website and updating the \"Last Updated\" date. We will notify you of any changes by posting the new Privacy Policy on this page. Your continued use of our services after any changes constitutes acceptance of the updated policy."
        ]
      },
      {
        title: "Contact Information",
        type: "contact",
        content: [
          `Company: Andiamo Ventures LLC (operating the YourHomeSecured brand)`,
          `Address: 1560 E Southlake Blvd, Southlake, TX 76092`,
          `Email: <strong>admin@yourhomesecured.com</strong>`
        ],
        outro: "We will respond to your inquiry within a reasonable timeframe.\n\n<strong>By using our services, you acknowledge that you have read, understood, and agreed to this Privacy Policy.</strong>`"
      }
    ]
  },
  
  // Terms of Service Content - Based on Andiamo Template
  terms: {
    hero: {
      title: "Terms of Service",
      subtitle: `Terms and conditions for using ${siteConfig.client.name} services`,
      lastUpdated: siteConfig.compliance.legal.lastUpdated
    },
    sections: [
      {
        title: "Introduction",
        type: "paragraph",
        content: [
          `Welcome to ${siteConfig.client.name}. By accessing our website and using our services, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.`
        ]
      },
      {
        title: "Definitions",
        type: "list",
        content: [
          `"<strong>Company," "We," "Us," or "Our"</strong> refers to Andiamo Ventures LLC, which operates the ${siteConfig.client.legalName} brand and website.`,
          `<strong>"User," "You," or "Your"</strong> refers to the individual or entity accessing our services`,
          `<strong>"Services"</strong> refer to our home security solutions and related services`
        ]
      },
      {
        title: "Acceptance of Terms",
        type: "paragraph",
        content: [
          `By accessing and using the services provided by ${siteConfig.client.name}, you accept and agree to be bound by this agreement. If you do not agree, please do not use this service.`
        ]
      },
      {
        title: "Description of Service",
        type: "paragraph",
        content: [
          `${siteConfig.client.name} is a marketing and lead generation platform. Our services include connecting users with licensed providers of home security solutions, monitoring services, smart home integration, and emergency response coordination. We do not directly provide these services and are not responsible for the actions or performance of third-party providers.`
        ]
      },
      {
        title: "Use of Services",
        type: "list",
        content: [
          "You must be at least 18 years old to use our services.",
          "You agree to provide accurate and complete information when using our services.",
          "Unauthorized use of our website or services is strictly prohibited."
        ]
      },
      {
        title: "User Obligations",
        type: "list",
        intro: "You agree to:",
        content: [
          "Provide accurate, current, and complete information during registration",
          "Maintain the security of your account credentials",
          "Use our services only for lawful purposes and in accordance with these terms",
          "Not interfere with or disrupt the integrity or performance of our services",
          "Not attempt to gain unauthorized access to our systems or networks"
        ]
      },
      {
        title: "Privacy Policy",
        type: "paragraph",
        content: [
          "Your use of our website and services is also governed by our <a href=\"/privacy-policy\" class=\"text-blue-600 hover:underline\">Privacy Policy</a>, which details how we collect, use, and protect your information."
        ]
      },
      {
          title: "SMS Communication",
          type: "list",
          intro: `By providing your phone number and opting in, you consent to receive marketing, customer care, and account notification SMS messages from ${siteConfig.client.name} and our licensed home service partners.`,
          content: [
            "Message & data rates may apply.",
            "Messaging frequency may vary.",
            "Reply <strong>STOP</strong> to opt out, <strong>HELP</strong> for support.",
            "Reply <strong>START</strong> or <strong>YES</strong> to opt back in."
          ],
          outro: `Information obtained as part of the SMS consent process may be shared with licensed third parties and their marketing partners, consistent with our <a href="/privacy-policy" class="text-blue-600 hover:underline">Privacy Policy</a>.<br/><br/><strong style="display: block; margin-top: 1rem; margin-bottom: 0.5rem; color: #4B5563;">Sample Messages:</strong>
          <ul style="list-style-type: disc; padding-left: 1.5rem; margin-top: 0.5rem;">
            <li>"Hello, this is YourHomeSecured. Your home security check is due. Visit yourhomesecured.com or call us. Reply STOP to opt out."</li>
            <li>"Welcome to YourHomeSecured. Monitor your system status at yourhomesecured.com. Reply STOP to opt out."</li>
            <li>"Your security request is confirmed. Contact us at admin@yourhomesecured.com. Reply STOP to opt out."</li>
          </ul>
          <br/>You may receive up to 50 SMS messages per week. Carrier fees may apply depending on your carrier and location.`
        },
      {
        title: "Service Availability",
        type: "paragraph",
        content: [
          "We strive to maintain high availability of our services, but we do not guarantee uninterrupted access. Our services may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time."
        ]
      },
      {
        title: "Payment Terms",
        type: "paragraph",
        content: [
          "Payment terms vary depending on the service plan selected. All payments are due according to the terms specified in your service agreement. Late payments may result in service suspension. Failure to pay may result in service suspension or termination. All payments are non-refundable unless otherwise specified."
        ]
      },
      {
        title: "Intellectual Property",
        type: "paragraph",
        content: [
          `All content, features, and functionality of our services (including text, graphics, logos, and design) are owned by ${siteConfig.client.name} and protected by copyright, trademark, and other IP laws. You may not reproduce, distribute, or exploit content without our express written permission.`
        ]
      },
      {
        title: "Third-Party Links",
        type: "paragraph",
        content: [
          "Our website may contain third-party links. We are not responsible for their content, policies, or practices."
        ]
      },
      {
        title: "Confidentiality",
        type: "paragraph",
        content: [
          "Both parties agree to maintain the confidentiality of any proprietary or confidential information shared during the business relationship. This includes business strategies, customer data, pricing information, and technical specifications."
        ]
      },
      {
        title: "Data Ownership",
        type: "paragraph",
        content: [
          "All data and leads submitted through our websites and services are the exclusive property of Andiamo Ventures LLC. Third-party buyers or partners may use such data only for the purposes disclosed to consumers and in accordance with applicable law."
        ]
      },
      {
        title: "Limitation of Liability",
        type: "list",
        content: [
         `To the fullest extent permitted by law, ${siteConfig.client.name} shall not be liable for any indirect, incidental, consequential, or punitive damages, including loss of profits, data, or business opportunities.`,
          "We disclaim liability for actions, services, or performance of third-party providers to whom we connect you.",
          "Our total liability for any claim shall not exceed the amount paid by you to us in the 12 months preceding the claim."
        ]
      },
      {
        title: "Indemnification",
        type: "paragraph",
        content: [
          `You agree to indemnify, defend, and hold harmless ${siteConfig.client.name}, its officers, directors, employees, and agents from and against any claims, damages, losses, costs, and expenses arising from your use of our services or violation of these terms.`
        ]
      },
      {
        title: "Service Modifications and Termination",
        type: "list",
        intro: "We may modify, suspend, or discontinue services at any time. We may terminate or suspend your access if you violate these Terms. Upon termination:",
        content: [
          "Access will be discontinued.",
          "Outstanding payments become immediately due.",
          "Confidentiality and data ownership obligations survive termination.",
          "We may retain data as required by law or for legitimate business purposes."
        ]
      },
      {
        title: "Governing Law",
        type: "paragraph",
        content: [
          `These Terms are governed by and construed in accordance with the laws of Wyoming, without regard to conflict-of-law provisions. For enforcement purposes, arbitration and related proceedings shall take place in Dallas, Texas.`
        ]
      },
      {
        title: "Dispute Resolution",
        type: "paragraph",
        content: [
          "Parties agree to resolve disputes first through good-faith negotiation. If unresolved, disputes shall be resolved exclusively through binding arbitration administered by the American Arbitration Association. <strong>Class actions are expressly waived.</strong>"
        ]
      },
      {
        title: "Force Majeure",
        type: "paragraph",
        content: [
          "Neither party shall be liable for failure or delay due to causes beyond reasonable control, including acts of God, natural disasters, war, terrorism, or technical failures."
        ]
      },
      {
        title: "Severability",
        type: "paragraph",
        content: [
          "If any provision is found unenforceable, remaining provisions remain valid."
        ]
      },
      {
        title: "Entire Agreement",
        type: "paragraph",
        content: [
          `These Terms constitute the entire agreement between you and ${siteConfig.client.name}, superseding prior agreements.`
        ]
      },
      {
        title: "Changes to These Terms",
        type: "paragraph",
        content: [
          "We may update these Terms at any time. Updates will be effective upon posting. Continued use of our services constitutes acceptance of the revised terms."
        ]
      },
      {
        title: "Contact Information",
        type: "contact",
        content: [
          `<strong>Company:</strong> Andiamo Ventures LLC (operating the YourHomeSecured brand)`,
          `<strong>Address:</strong> 1560 E Southlake Blvd, Southlake, TX 76092`,
          `<strong>Email:</strong> admin@yourhomesecured.com`
        ],
        outro: "We will respond to your inquiry within a reasonable timeframe.</br></br><strong>By using our services, you acknowledge that you have read, understood, and agreed to these Terms of Service and our <a href=\"/privacy-policy\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 hover:underline\">Privacy Policy</a>.</strong>"
      }
    ]
  },
  
  // TCPA Disclaimer Content
  tcpa: {
    hero: {
      title: "TCPA Disclaimer",
      subtitle: `SMS and communication consent information for ${siteConfig.client.name}`,
      lastUpdated: siteConfig.compliance.legal.lastUpdated
    },
    sections: [
      {
        title: "SMS Consent and TCPA Compliance",
        type: "intro",
        content: [
          `By providing your phone number and opting in to receive SMS messages from ${siteConfig.client.name}, you explicitly consent to receive automated text messages, including marketing, promotional, and service-related communications. This consent is not required as a condition of purchase.`
        ]
      },
      {
        title: "Types of Communications You Will Receive",
        type: "list",
        intro: "When you opt in to SMS communications, you may receive the following types of messages:",
        content: [
          "Marketing and promotional messages about our home security services",
          "Service notifications and account updates",
          "Appointment reminders and scheduling confirmations",
          "Security system alerts and monitoring notifications",
          "Customer care and support messages",
          "Survey requests and feedback opportunities"
        ]
      },
      {
        title: "Automated Communications",
        type: "paragraph",
        content: [
          `The messages you receive from ${siteConfig.client.name} may be sent using automated technology, including auto-dialers and pre-recorded messages. By consenting to receive SMS messages, you acknowledge and agree to receive communications sent through automated means.`
        ]
      },
      {
        title: "Message Frequency",
        type: "paragraph",
        content: [
          `Message frequency varies depending on your service plan and communication preferences. You may receive up to 50 messages per week. During peak periods or service events, message frequency may increase temporarily.`
        ]
      },
      {
        title: "Carrier Charges and Data Rates",
        type: "paragraph",
        content: [
          "Standard message and data rates may apply to all SMS communications. These charges are determined by your mobile carrier and are not controlled by " + siteConfig.client.name + ". Please contact your carrier for information about your messaging plan and any applicable charges.",
          "",
          "Message and data rates may vary depending on your carrier's pricing structure and whether messages are sent domestically or internationally."
        ]
      },
      {
        title: "How to Opt Out (STOP)",
        type: "list",
        intro: `You can opt out of receiving SMS messages from ${siteConfig.client.name} at any time using any of the following methods:`,
        content: [
          `Reply "${siteConfig.compliance.messaging?.replyKeywords?.stop || 'STOP'}" to any message you receive from us`,
          `Text "${siteConfig.compliance.messaging?.replyKeywords?.stop || 'STOP'}" to our SMS number`,
          `Contact our customer service team at ${siteConfig.compliance.contact?.email || 'admin@yourhomesecured.com'}`,
          `Call our support line during business hours`
        ],
        outro: `Once you opt out, you will receive a confirmation message and will not receive any further SMS communications from us. You can opt back in at any time by texting "START" or "YES" to our SMS number.`
      },
      {
        title: "Help and Support (HELP)",
        type: "paragraph",
        content: [
          `If you need assistance with SMS communications or have questions about our messaging program, reply "${siteConfig.compliance.messaging?.replyKeywords?.help || 'HELP'}" to any message or contact our customer support team directly.`,
          "",
          `For additional support, you can reach us at ${siteConfig.compliance.contact?.email || 'admin@yourhomesecured.com'} or visit our website at ${siteConfig.client.domain}.`
        ]
      },
      {
        title: "Privacy and Third-Party Sharing",
        type: "paragraph",
        content: [
          `Your phone number and SMS consent information will not be shared with third parties or affiliates for their marketing purposes. We respect your privacy and handle your information in accordance with our Privacy Policy.`,
          "",
          "Your consent to receive SMS messages is separate from any other consents you may provide for email marketing or other communications."
        ]
      },
      {
        title: "Consent Confirmation and Record Keeping",
        type: "paragraph",
        content: [
          `When you provide consent to receive SMS messages, we will maintain records of your consent including the date, time, and method of consent. This information is kept for compliance purposes and to honor your communication preferences.`
        ]
      },
      {
        title: "Sample Messages",
        type: "list",
        intro: "Examples of messages you may receive include:",
        content: [
          `"Hello, this is ${siteConfig.client.name}. Your home security check is scheduled for tomorrow at 2 PM. Reply STOP to opt out."`,
          `"Welcome to ${siteConfig.client.name}! Your security system is now active. Monitor your home at ${siteConfig.client.domain}. Reply STOP to opt out."`,
          `"Security Alert: Motion detected at your front door. Check your app for details. Reply STOP to opt out."`,
          `"Reminder: Your monthly security service payment is due in 3 days. Reply STOP to opt out."`
        ]
      },
      {
        title: "Service Availability and Technical Issues",
        type: "paragraph",
        content: [
          "SMS delivery is subject to carrier network availability and may be delayed or fail due to technical issues beyond our control. We are not responsible for failed or delayed message delivery due to carrier issues, network congestion, or device compatibility problems.",
          "",
          `If you experience technical issues with SMS delivery, please contact our support team at ${siteConfig.compliance.contact?.email || 'admin@yourhomesecured.com'}.`
        ]
      },
      {
        title: "Legal Compliance and TCPA Rights",
        type: "paragraph",
        content: [
          `${siteConfig.client.name} complies with the Telephone Consumer Protection Act (TCPA) and other applicable laws governing automated communications. You have the right to revoke your consent at any time without penalty.`,
          "",
          "If you believe you have received messages in violation of the TCPA or without proper consent, please contact us immediately so we can investigate and resolve the issue."
        ]
      },
      {
        title: "Updates to This Disclaimer",
        type: "paragraph",
        content: [
          "We may update this TCPA Disclaimer from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on our website with a revised \"Last Updated\" date.",
          "",
          "Your continued participation in our SMS program after any updates constitutes acceptance of the revised terms."
        ]
      },
      {
        title: "Contact Information",
        type: "contact",
        content: [
          `Company: ${siteConfig.client.legalName}`,
          `Email: ${siteConfig.compliance.contact?.email || 'admin@yourhomesecured.com'}`,
          `Website: ${siteConfig.client.domain}`,
          `Contact Us for SMS Support`
        ],
        outro: `For questions about SMS communications, TCPA compliance, or to update your communication preferences, please contact us. We will respond to your inquiry within a reasonable timeframe.\n\nBy providing your phone number and consenting to SMS communications, you acknowledge that you have read, understood, and agreed to this TCPA Disclaimer.`
      }
    ]
  },

  // Universal TCPA Consent - Used across all quiz types
  consent: {
    text: `By clicking "Get My Free Evaluation," I authorize law firms, legal service providers, case evaluation specialists, and their marketing partners, including those offering assistance with personal injury, motor vehicle accident, or related claims, to contact me about free consultations or claim review services by phone calls, emails, and text messages to the number and email I provided above. I understand that these communications may be delivered using an automatic telephone dialing system or a prerecorded message, even if my number is on a Do Not Call list. My consent is not a condition of obtaining services, and standard message and data rates may apply. I agree to the <a href="/partners" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-700 underline">Partner Network Disclosure</a>, <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-700 underline">Privacy Policy</a>, and <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-700 underline">Terms of Service</a>.`,
    required: true
  }
};