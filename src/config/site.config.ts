export const siteConfig = {
  // Client Identity
  client: {
    name: "Personal Injury Hotline™",
    legalName: "Personal Injury Hotline", // For legal documents
    domain: "personalinjuryhotline.com",
    established: "2024"
  },

  // Compliance Configuration (Easily changeable per client)
  compliance: {
    contact: {
      email: "admin@personalinjuryhotline.co", // Single point of contact
    },
    messaging: {
      companyName: "Personal Injury Hotline™",
      replyKeywords: {
        stop: "STOP",
        help: "HELP"
      }
    },
    legal: {
      lastUpdated: "October 2025",
      jurisdiction: "Texas, United States",
      arbitrationLocation: "Dallas, Texas"
    }
  },

  // Feature Flags for Compliance
  features: {
    requiresGDPR: false, // Enable for EU clients
    requiresCCPA: true,  // Enable for California
    requiresTCPA: true,  // SMS consent
    cookieConsent: true, // Cookie banner
    ageVerification: false // If needed
  }
}