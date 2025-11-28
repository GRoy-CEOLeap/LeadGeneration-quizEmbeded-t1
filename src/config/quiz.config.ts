import { config } from './environment.config';
import { complianceContent } from './compliance.content.config';

export const quizConfig = {
  steps: [
    {
      id: 'state',
      type: 'button-group' as const,
      question: 'What state did your accident occur in?',
      helper: 'We need to match you with attorneys licensed in your state.',
      options: [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
        { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'DE', label: 'Delaware' },
        { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'ID', label: 'Idaho' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' },
        { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'NY', label: 'New York' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'OH', label: 'Ohio' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' },
        { value: 'UT', label: 'Utah' },
        { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WA', label: 'Washington' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'WY', label: 'Wyoming' }
      ],
      required: true,
      sidebar: {
        title: 'Why State Matters',
        content: 'Attorneys must be licensed in the state where your accident occurred. Each state has different laws and statutes of limitations.'
      }
    },
    {
      id: 'accident_timing',
      type: 'button-group' as const,
      question: 'When did the accident occur?',
      helper: 'Timing affects your legal rights and case strength.',
      options: [
        { value: 'within_30_days', label: 'Within 30 days', recommended: true },
        { value: '1_3_months', label: 'Between 1 - 3 months', recommended: true },
        { value: '1_6_months', label: 'Between 1 - 6 months' },
        { value: '6_12_months', label: 'Between 6 - 12 months' },
        { value: '1_2_years', label: 'Between 1 - 2 years' },
        { value: 'over_2_years', label: 'More than 2 years', disqualifies: true }
      ],
      required: true,
      sidebar: {
        title: 'Statute of Limitations',
        content: 'Most states require filing within 1-3 years. Fresh cases have stronger evidence and better outcomes.'
      }
    },
    {
      id: 'at_fault',
      type: 'button-group' as const,
      question: 'Were you found at fault for the accident?',
      helper: 'Be honest - this affects your eligibility.',
      options: [
        { value: 'no', label: 'No - Other driver was at fault', recommended: true },
        { value: 'not_sure', label: 'Not sure / Unclear' },
        { value: 'partial', label: 'Partially at fault' },
        { value: 'yes', label: 'Yes - I was at fault', disqualifies: true }
      ],
      required: true,
      sidebar: {
        title: 'Fault Matters',
        content: 'Even partial fault cases can recover compensation in most states (comparative negligence). Full fault cases are typically not viable.'
      }
    },
    {
      id: 'injury_severity',
      type: 'button-group' as const,
      question: 'How severe were your injuries?',
      helper: 'This helps us match you with the right attorney.',
      options: [
        { value: 'severe', label: 'Severe (Hospitalization/Surgery)', recommended: true },
        { value: 'moderate', label: 'Moderate (ER visit/Extended treatment)', recommended: true },
        { value: 'minor', label: 'Minor (Doctor visit/Minor treatment)' },
        { value: 'none', label: 'No injuries', disqualifies: true }
      ],
      required: true,
      sidebar: {
        title: 'Injury Documentation',
        content: 'Attorneys need documented medical treatment to build your case. Severity impacts potential settlement value.'
      }
    },
    {
      id: 'medical_treatment',
      type: 'button-group' as const,
      question: 'Did you receive medical treatment?',
      helper: 'Medical records are critical evidence.',
      options: [
        { value: 'yes_hospital', label: 'Yes - Hospital/ER', recommended: true },
        { value: 'yes_doctor', label: 'Yes - Doctor/Clinic', recommended: true },
        { value: 'yes_ongoing', label: 'Yes - Ongoing treatment' },
        { value: 'no', label: 'No medical treatment', disqualifies: true }
      ],
      required: true,
      sidebar: {
        title: 'Medical Records',
        content: 'Medical documentation proves your injuries and connects them to the accident. Without treatment records, cases are very difficult to win.'
      }
    }
  ],

  loadingStep: {
    duration: 3000,
    apiEndpoint: config.api.qualification,
    stages: [
      { progress: 25, message: 'Reviewing your case details...' },
      { progress: 50, message: 'Analyzing case strength...' },
      { progress: 75, message: 'Matching with attorneys...' },
      { progress: 100, message: 'Attorneys found!' }
    ]
  },

  submission: {
    fields: [
      { id: 'first_name', type: 'text', label: 'First Name', placeholder: 'First Name', required: true },
      { id: 'last_name', type: 'text', label: 'Last Name', placeholder: 'Last Name', required: true },
      { id: 'email', type: 'email', label: 'Email', placeholder: 'you@example.com', required: true },
      { id: 'phone', type: 'tel', label: 'Phone', placeholder: '(___) ___-____', required: true },
      { id: 'zip', type: 'text', label: 'ZIP Code', placeholder: '12345', required: true, validation: { pattern: /^\d{5}$/, message: 'Please enter a valid 5-digit ZIP code' } },
      { id: 'leadid_token', type: 'hidden', label: 'LeadiD Token', required: false }
    ],
    consent: complianceContent.consent,
    webhook: config.api.leadSubmit
  }
};
