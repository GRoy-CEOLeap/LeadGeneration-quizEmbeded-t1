import { siteConfig } from '../config/site.config';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  consent: boolean;
  formType: 'contact' | 'support' | 'sales';
  timestamp: string;
  source: string;
}

export class FormService {
  private static instance: FormService;
  
  static getInstance(): FormService {
    if (!FormService.instance) {
      FormService.instance = new FormService();
    }
    return FormService.instance;
  }
  
  // Main submission handler
  async submitForm(data: FormData): Promise<{ success: boolean; message: string }> {
    try {
      // Validate data
      this.validateFormData(data);

      // Add metadata
      const enrichedData = this.enrichData(data);

      // Send to appropriate handlers
      const results = await Promise.all([
        this.sendToEmailService(enrichedData),
        this.sendToCRM(enrichedData)
      ]);

      return {
        success: true,
        message: 'Form submitted successfully'
      };
    } catch (error) {
      console.error('Form submission error:', error);
      return {
        success: false,
        message: 'Failed to submit form'
      };
    }
  }
  
  private validateFormData(data: FormData): void {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email address');
    }
    
    // Required fields
    if (!data.firstName || !data.lastName || !data.message) {
      throw new Error('Required fields missing');
    }
    
    // Consent validation (if TCPA required)
    if (siteConfig.features.requiresTCPA && !data.consent) {
      throw new Error('Consent required');
    }
  }
  
  private enrichData(data: FormData): any {
    return {
      ...data,
      clientId: siteConfig.client.name,
      domain: siteConfig.client.domain,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      utmParams: this.getUTMParams()
    };
  }
  
  private getUTMParams(): object {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_term: params.get('utm_term'),
      utm_content: params.get('utm_content')
    };
  }
  
  private async sendToEmailService(data: any): Promise<void> {
    // Email service integration
    const endpoint = process.env.VITE_EMAIL_ENDPOINT || '/api/email';
    
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: siteConfig.compliance.contact.email,
        from: data.email,
        subject: `New Contact Form: ${data.firstName} ${data.lastName}`,
        data: data
      })
    });
  }
  
  private async sendToCRM(data: any): Promise<void> {
    // CRM integration (HubSpot, Salesforce, etc.)
    // Implement based on client needs
  }
}