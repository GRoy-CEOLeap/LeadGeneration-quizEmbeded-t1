import React, { useEffect, useState } from 'react';
import { OutcomeLayout } from '../../core/layouts/OutcomeLayout';
import { adtOutcomeConfig } from '../../config/outcomes/adt.outcome.config';

export default function ADTOutcome() {
  const [userData, setUserData] = useState({
    firstName: '',
    city: '',
    zip: '',
    homeType: ''
  });

  useEffect(() => {
    // Get quiz data from sessionStorage
    const quizData = JSON.parse(sessionStorage.getItem('quiz_data') || '{}');
    console.log('Quiz data from session:', quizData); // Confirm data is being pulled
    setUserData({
      firstName: quizData.firstName || 'there',
      city: quizData.city || 'your area', // This pulls from session data
      zip: quizData.zip || '',
      homeType: quizData.homeType || 'home' // This pulls from session data
    });
  }, []);

  return <OutcomeLayout config={adtOutcomeConfig} userData={userData} />;
}