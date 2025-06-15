
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ShieldIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const navigate = useNavigate();

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
            <ShieldIcon className="w-6 h-6" />
            Privacy Policy
          </h1>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Last updated: December 15, 2024
              </p>
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy describes how Shiv Vaas Calculator ("we", "our", or "us") 
                collects, uses, and protects your information when you use our mobile application.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Information We Collect</h2>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Location Data</h3>
                  <p className="text-sm text-blue-700">
                    We collect your location (latitude and longitude) only when you use the location 
                    search feature to provide accurate astronomical calculations for your area.
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800">Usage Data</h3>
                  <p className="text-sm text-green-700">
                    We may collect information about how you use the app, including the dates 
                    you search for and the features you access.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">How We Use Your Information</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-saffron-500 mt-1">•</span>
                  <span>To provide accurate astronomical calculations based on your location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-saffron-500 mt-1">•</span>
                  <span>To improve the app's functionality and user experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-saffron-500 mt-1">•</span>
                  <span>To provide customer support when needed</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your personal information. 
                Your location data is used only for calculations and is not stored permanently 
                or shared with third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed">
                We use OpenStreetMap's Nominatim service for location search functionality. 
                This service may collect limited data as per their privacy policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                You have the right to access, update, or delete your personal information. 
                You can also disable location services in your device settings at any time.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-2 p-3 bg-saffron-50 rounded-lg">
                <p className="text-saffron-800">Email: support@shivvaas.app</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500">
                This Privacy Policy may be updated from time to time. We will notify you of 
                any changes by posting the new Privacy Policy on this page.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
