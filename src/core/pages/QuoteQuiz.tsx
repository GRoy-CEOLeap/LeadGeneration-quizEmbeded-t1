import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSessionData } from '../utils/session';
import { QuizEmbedded } from '../components/QuizEmbedded';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';

export const QuoteQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    const session = getSessionData();
    
    // Verify ZIP was answered
    if (!session.quiz_answers?.zip) {
      navigate('/quote');
      return;
    }
    
    setInitialData(session.quiz_answers);
  }, [navigate]);

  const handleQuizComplete = () => {
    // Navigate to result/loading page
    navigate('/quote/quiz/result');
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Hidden on mobile */}
      <header className="hidden md:block bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/yourhomesecured-330x330-website (1).svg"
                alt="YourHomeSecured"
                className="w-8 h-8"
              />
              <span className="font-bold text-gray-900">YourHomeSecured</span>
            </div>
            <div className="text-sm text-gray-600">
              Secure Quote Process
            </div>
          </div>
        </div>
      </header>

      {/* Quiz Container - Full viewport on mobile, contained on desktop */}
      <main className="md:max-w-3xl md:mx-auto md:px-4 md:py-8">
        <div className="bg-white md:rounded-lg md:shadow-lg md:p-6 min-h-screen md:min-h-0 flex flex-col">
          <QuizEmbedded
            initialZip={initialData.zip}
            onComplete={handleQuizComplete}
          />
        </div>
      </main>

      {/* FAQ Section */}
      <FAQ />

      <Footer />
    </div>
  );
};