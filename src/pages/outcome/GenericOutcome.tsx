import React, { useEffect, useState } from 'react';
import { CheckCircle, Shield, Phone, Mail, Star, Home, Clock, DollarSign, Users, Award, Eye, Zap, AlertTriangle, Lock } from 'lucide-react';
import { Footer } from '../../core/components/Footer';

export default function GenericOutcome() {
  const [userData, setUserData] = useState({
    firstName: '',
    city: '',
    zip: '',
    homeType: ''
  });

  useEffect(() => {
    // Get quiz data from sessionStorage
    const quizData = JSON.parse(sessionStorage.getItem('quiz_data') || '{}');
    console.log('Quiz data from session:', quizData);
    setUserData({
      firstName: quizData.firstName || 'there',
      city: quizData.city || 'your area',
      zip: quizData.zip || '',
      homeType: quizData.homeType || 'home'
    });
  }, []);

  const testimonials = [
    {
      quote: "The security system stopped a break-in attempt last month. The monitoring team called police immediately. Worth every penny!",
      name: "Sarah Mitchell",
      location: "Dallas, TX",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5
    },
    {
      quote: "I travel for work constantly. Being able to check my home from anywhere gives me incredible peace of mind.",
      name: "Michael Rodriguez",
      location: "Phoenix, AZ", 
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      rating: 5
    },
    {
      quote: "Insurance discount covers half the monthly cost. Installation was free and took less than 2 hours.",
      name: "Jennifer Chen",
      location: "Seattle, WA",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5
    }
  ];

  const keyBenefits = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "24/7 Professional Monitoring",
      description: "Real humans watch your home around the clock, ready to dispatch emergency services in seconds."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: "Insurance Savings",
      description: "Save 5-20% on homeowner's insurance with a monitored security system - often covering the monthly cost."
    },
    {
      icon: <Home className="w-8 h-8 text-purple-600" />,
      title: "Smart Home Integration",
      description: "Control lights, locks, thermostats, and cameras all from one app. Works with Alexa, Google, and Apple."
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "Instant Alerts",
      description: "Get real-time notifications on your phone for any activity, whether you're home or away."
    }
  ];

  const hiddenFacts = [
    {
      icon: <Eye className="w-6 h-6 text-red-500" />,
      title: "Visible Security Deters 60% of Burglars",
      description: "Just having security signs and cameras visible makes most criminals choose a different target."
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Response Time is Everything",
      description: "Professional monitoring gets police there 3x faster than neighbor calls - often the difference between catching criminals and losing valuables."
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
      title: "Most Break-ins Happen During Daytime",
      description: "65% of burglaries occur between 6 AM and 6 PM when homes appear empty. Remote monitoring catches these."
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-500" />,
      title: "Smart Locks Prevent Lock Bumping",
      description: "Traditional locks can be 'bumped' open in seconds. Smart locks with encryption are virtually impossible to bypass."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="/yourhomesecured-330x330-website (1).svg" 
                alt="YourHomeSecured Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-gray-900">YourHomeSecured</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-4 shadow-lg">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>

          {/* Personalized Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Great News, {userData.firstName}!
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            We've found the perfect security solutions for your {userData.homeType} in {userData.city}.
          </p>

          {/* Status Card */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold">Your Security Assessment Complete</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm text-gray-500">Location:</label>
                <div className="font-bold text-lg">{userData.city}, {userData.zip}</div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Property Type:</label>
                <div className="font-bold text-lg capitalize">{userData.homeType}</div>
              </div>
            </div>
            
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-semibold">Assessment Complete - Matches Found!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            What Happens Next
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Review Matches</h3>
              <p className="text-gray-600">
                Our security experts will review your personalized matches and prepare your options.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Contacted</h3>
              <p className="text-gray-600">
                A security specialist will reach out within 15 minutes to discuss your options.
              </p>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Protected</h3>
              <p className="text-gray-600">
                Schedule installation and start protecting your home as soon as tomorrow.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Home Security Matters More Than Ever
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern security systems do more than just sound alarms. They provide comprehensive protection and peace of mind.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hidden Facts Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Most People Don't Know About Home Security
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These insider facts could be the difference between being a victim and staying safe.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {hiddenFacts.map((fact, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                    {fact.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{fact.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{fact.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Stories from Protected Families
            </h2>
            <p className="text-xl text-gray-600">
              See how home security has made a difference for families just like yours.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Trusted by Thousands of Families
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
                <p className="text-gray-600">Homes Protected</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">4.8★</div>
                <p className="text-gray-600">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                <p className="text-gray-600">Monitoring</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
                <p className="text-gray-600">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <img 
              src="/yourhomesecured-330x330-website (1).svg" 
              alt="YourHomeSecured Logo" 
              className="w-16 h-16"
            />
            <h2 className="text-4xl font-bold">Our Mission</h2>
          </div>
          
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            At YourHomeSecured, we believe every family deserves to feel safe in their own home. 
            We've simplified the overwhelming process of choosing home security by connecting you 
            with the right providers and solutions for your unique needs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <Users className="w-8 h-8 text-blue-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Family First</h3>
              <p className="text-blue-100 text-sm">
                Every recommendation is made with your family's safety and budget in mind.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <Award className="w-8 h-8 text-blue-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Trusted Partners</h3>
              <p className="text-blue-100 text-sm">
                We only work with licensed, vetted security providers with proven track records.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <Shield className="w-8 h-8 text-blue-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">No Pressure</h3>
              <p className="text-blue-100 text-sm">
                Get the information you need to make the right decision, on your timeline.
              </p>
            </div>
          </div>
          
          <p className="text-blue-200">
            Since 2024, we've helped thousands of families find their perfect security solution. 
            Your safety is our success.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}