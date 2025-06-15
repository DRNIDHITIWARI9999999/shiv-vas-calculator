
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, HelpCircleIcon, BookOpenIcon, ClockIcon, MapPinIcon, LanguagesIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What is Shiv Vaas?",
      answer: "Shiv Vaas is a traditional Hindu concept that determines auspicious and inauspicious days based on Tithi calculations. It helps devotees plan religious activities according to Vedic traditions."
    },
    {
      question: "How is Shiv Vaas calculated?",
      answer: "Shiv Vaas is calculated using the formula: (Tithi × 2 + 5) mod 7. The result determines whether a day is favorable or should be avoided for certain activities."
    },
    {
      question: "Why do I need to provide my location?",
      answer: "Astronomical calculations like sunrise, moonrise, and Tithi timings vary based on geographical location. Providing your location ensures accurate calculations for your area."
    },
    {
      question: "Can I use a specific time instead of sunrise?",
      answer: "Yes, you can enable the 'Use Specific Time' option to calculate Tithi at any particular time instead of the default sunrise calculation."
    },
    {
      question: "Is my location data stored?",
      answer: "No, your location data is used only for calculations and is not stored permanently. Please refer to our Privacy Policy for more details."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 via-orange-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <HelpCircleIcon className="w-6 h-6" />
            Help & Support
          </h1>
        </div>

        <div className="space-y-6">
          {/* Quick Start Guide */}
          <Card className="bg-gradient-to-r from-saffron-50 to-orange-50 border-saffron-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpenIcon className="w-5 h-5" />
                Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-saffron-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Select Date</h3>
                      <p className="text-sm text-gray-600">Choose the date for which you want to check Shiv Vaas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-saffron-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Set Location</h3>
                      <p className="text-sm text-gray-600">Search for your city or use current location</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Choose Language</h3>
                      <p className="text-sm text-gray-600">Switch between English and Hindi as needed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">View Results</h3>
                      <p className="text-sm text-gray-600">Check Shiv Vaas details and Panchang information</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <div className="flex items-center gap-2 mb-2">
                    <ClockIcon className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-800">Specific Time Calculation</h3>
                  </div>
                  <p className="text-sm text-blue-700">
                    Enable this option to calculate Tithi at a specific time instead of sunrise. 
                    Useful for planning ceremonies at particular times.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinIcon className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-800">Location Search</h3>
                  </div>
                  <p className="text-sm text-green-700">
                    Search for any city worldwide or use your current location for accurate 
                    astronomical calculations.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                  <div className="flex items-center gap-2 mb-2">
                    <LanguagesIcon className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-purple-800">Multilingual Support</h3>
                  </div>
                  <p className="text-sm text-purple-700">
                    Switch between English and Hindi languages for comfortable usage. 
                    All content is available in both languages.
                  </p>
                </div>
                
                <div className="p-4 bg-saffron-50 rounded-lg border-l-4 border-saffron-400">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🔱</span>
                    <h3 className="font-semibold text-saffron-800">Traditional Calculations</h3>
                  </div>
                  <p className="text-sm text-saffron-700">
                    All calculations are based on traditional Vedic methods and astronomical 
                    data for authentic results.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you can't find the answer to your question, please don't hesitate to contact our support team.
              </p>
              <div className="space-y-2">
                <p className="text-sm"><strong>Email:</strong> support@shivvaas.app</p>
                <p className="text-sm"><strong>Response Time:</strong> We typically respond within 24-48 hours</p>
              </div>
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-saffron-800">🙏 हर हर महादेव 🙏</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
