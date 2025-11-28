import { complianceContent } from '../compliance.content.config';

export interface QuizQuestion {
  id: string;
  type: 'button-group' | 'form-section';
  question: string;
  options?: QuizOption[];
  fields?: FormField[];
  required?: boolean;
}

export interface QuizOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  disqualifies?: boolean;
  skipTo?: string;
}

export interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  errorMessage?: string;
}

export const piQuizConfig = {
  version: '01',
  totalSteps: 12,
  showProgressBar: true,
  allowBack: true,

  routes: {
    landing: '/startquiz/01',
    questions: '/startquiz/01',
    disqualified: '/startquiz/01/thank-you',
    qualified: '/outcome',
  },

  questions: [
    {
      id: 'state',
      type: 'form-section',
      question: 'What state did the incident occur in?',
      fields: [
        {
          id: 'state',
          label: 'State',
          type: 'select',
          placeholder: 'Select your state',
          required: true,
        },
      ],
      required: true,
    },
    {
      id: 'accident_type',
      type: 'button-group',
      question: 'What type of accident were you in?',
      options: [
        {
          value: 'car_accident',
          label: 'Car Accident',
          icon: 'Car',
        },
        {
          value: 'commercial_vehicle_accident',
          label: 'Commercial Vehicle Accident',
          icon: 'Truck',
        },
        {
          value: 'motorcycle_accident',
          label: 'Motorcycle Accident',
          icon: 'Bike',
        },
        {
          value: 'other',
          label: 'Other',
          icon: 'HelpCircle',
        },
      ],
      required: true,
    },
    {
      id: 'insured_at_accident',
      type: 'button-group',
      question: 'Did you have auto insurance at the time of the accident?',
      options: [
        {
          value: 'yes',
          label: 'Yes',
        },
        {
          value: 'no',
          label: 'No',
        },
      ],
      required: true,
    },
    {
      id: 'accident_date',
      type: 'button-group',
      question: 'When did the accident occur?',
      options: [
        {
          value: 'within_30_days',
          label: 'Within 30 days',
        },
        {
          value: '1_3_months',
          label: 'Between 1 - 3 months',
        },
        {
          value: '1_6_months',
          label: 'Between 1 - 6 months',
        },
        {
          value: '6_12_months',
          label: 'Between 6 - 12 months',
        },
        {
          value: '1_2_years',
          label: 'Between 1 - 2 years',
        },
        {
          value: 'over_2_years',
          label: 'More than 2 years',
        },
      ],
      required: true,
    },
    {
      id: 'accident_treatment_window',
      type: 'button-group',
      question: 'How soon did you seek medical treatment?',
      options: [
        { value: 'same_day', label: 'Same Day' },
        { value: 'within_14_days', label: '14 days or less' },
        { value: 'within_30_days', label: '30 days or less' },
        { value: 'not_injured', label: 'I was not injured', disqualifies: true },
      ],
      required: true,
    },
    {
      id: 'at_fault',
      type: 'button-group',
      question: 'Were you at fault for the accident?',
      options: [
        {
          value: 'no',
          label: 'No',
        },
        {
          value: 'yes',
          label: 'Yes',
        },
      ],
      required: true,
    },
    {
      id: 'attorney_status',
      type: 'button-group',
      question: 'Do you have a lawyer?',
      options: [
        {
          value: 'no',
          label: 'No',
        },
        {
          value: 'yes',
          label: 'Yes',
        },
      ],
      required: true,
    },
    {
      id: 'zip',
      type: 'form-section',
      question: 'What is your ZIP code?',
      fields: [
        {
          id: 'zip',
          label: 'ZIP Code',
          type: 'text',
          placeholder: '12345',
          required: true,
          pattern: '^[0-9]{5}$',
          errorMessage: 'Please enter a valid 5-digit ZIP code',
        },
      ],
      required: true,
    },
    {
      id: 'first_name',
      type: 'form-section',
      question: 'What is your first name?',
      fields: [
        {
          id: 'first_name',
          label: 'First Name',
          type: 'text',
          placeholder: 'First Name',
          required: true,
        },
      ],
      required: true,
    },
    {
      id: 'last_name',
      type: 'form-section',
      question: 'What is your last name?',
      fields: [
        {
          id: 'last_name',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Last Name',
          required: true,
        },
      ],
      required: true,
    },
    {
      id: 'email',
      type: 'form-section',
      question: 'What is your email address?',
      fields: [
        {
          id: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'you@example.com',
          required: true,
          pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
          errorMessage: 'Please enter a valid email address',
        },
      ],
      required: true,
    },
    {
      id: 'phone',
      type: 'form-section',
      question: 'What is your mobile phone number?',
      fields: [
        {
          id: 'phone',
          label: 'Mobile Phone Number',
          type: 'tel',
          placeholder: '(555) 555-5555',
          required: true,
          pattern: '^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$',
          errorMessage: 'Please enter a valid mobile phone number',
        },
      ],
      required: true,
    },
  ] as QuizQuestion[],

  consent: complianceContent.consent
};
