export type LegalVariant = "terms" | "cookies" | "privacy";

export interface LegalSection {
  title: string;
  body: string;
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const LEGAL_DOCUMENTS: Record<LegalVariant, LegalDocument> = {
  terms: {
    title: "Terms of Service",
    lastUpdated: "January 15, 2025",
    sections: [
      {
        title: "ACCEPTANCE OF TERMS",
        body: "By accessing and using the Luchiana website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.",
      },
      {
        title: "MODIFICATIONS",
        body: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the site after changes constitutes acceptance of the modified terms.",
      },
      {
        title: "USE OF SITE",
        body: "You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the site. Prohibited behavior includes harassment, transmitting obscene or offensive content, and disrupting the normal flow of dialogue.",
      },
      {
        title: "INTELLECTUAL PROPERTY",
        body: "All content on this website, including text, graphics, logos, images, and software, is the property of Luchiana or its content suppliers and is protected by international copyright and trademark laws. Unauthorized use may violate these laws.",
      },
      {
        title: "PRIVACY & DATA",
        body: "Your use of the website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.",
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    lastUpdated: "January 15, 2025",
    sections: [
      {
        title: "COOKIE USAGE",
        body: "We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors are coming from. By continuing to use our website, you consent to our use of cookies.",
      },
      {
        title: "COOKIE TYPES",
        body: "We use essential cookies required for the website to function, analytics cookies to understand how visitors interact with our site, and marketing cookies to deliver relevant advertisements. Each type serves a specific purpose in enhancing your experience.",
      },
      {
        title: "CONTROL OPTIONS",
        body: "You can control and manage cookies through your browser settings. Most browsers allow you to refuse or delete cookies. Please note that disabling certain cookies may affect the functionality of our website and limit your user experience.",
      },
      {
        title: "THIRD PARTIES",
        body: "Some cookies are placed by third-party services that appear on our pages. We do not control these cookies and recommend reviewing the privacy policies of these third parties for more information about their cookie practices.",
      },
      {
        title: "UPDATES",
        body: "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We encourage you to review this policy periodically to stay informed about how we use cookies.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "January 15, 2025",
    sections: [
      {
        title: "INFORMATION WE COLLECT",
        body: "We collect information you provide directly, such as your name, email address, shipping address, and payment details when you create an account or place an order. We also collect browsing data, device information, and usage patterns to improve your experience.",
      },
      {
        title: "HOW WE USE DATA",
        body: "Your information is used to process orders, provide customer support, send order updates, personalize your shopping experience, and improve our products and services. With your consent, we may also send promotional emails about new arrivals and exclusive offers.",
      },
      {
        title: "DATA SHARING",
        body: "We do not sell your personal information. We share data only with trusted service providers who assist with payment processing, shipping, analytics, and marketing — and only to the extent necessary to perform those services on our behalf.",
      },
      {
        title: "YOUR RIGHTS",
        body: "You have the right to access, correct, or delete your personal data at any time. You may also opt out of marketing communications or request a copy of the information we hold about you by contacting us at info@luchiana.com.",
      },
      {
        title: "DATA SECURITY",
        body: "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
      },
    ],
  },
};
