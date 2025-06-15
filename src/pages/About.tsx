
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, StarIcon, HeartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
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
          <h1 className="text-2xl font-bold text-gray-800">About Shiv Vaas Calculator</h1>
        </div>

        {/* About Content */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-saffron-50 to-orange-50 border-saffron-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🕉️</span>
                About Our App
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Shiv Vaas Calculator is a traditional Hindu astronomical calculator that helps devotees 
                determine auspicious and inauspicious days according to ancient Vedic traditions. 
                Our app provides accurate calculations based on astronomical data and traditional formulas.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-white rounded-lg border-l-4 border-saffron-400">
                  <h3 className="font-semibold text-saffron-800 mb-2">Features</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Accurate Shiv Vaas calculations</li>
                    <li>• Detailed Panchang information</li>
                    <li>• Location-based calculations</li>
                    <li>• Multilingual support (English/Hindi)</li>
                    <li>• Traditional Vedic formulas</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-white rounded-lg border-l-4 border-orange-400">
                  <h3 className="font-semibold text-orange-800 mb-2">Purpose</h3>
                  <p className="text-sm text-gray-700">
                    This app is designed to help Hindu devotees plan their religious activities 
                    and ceremonies according to traditional astronomical calculations and Vedic principles.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-red-500" />
                Dedication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                This application is dedicated to Lord Shiva and created with devotion to help 
                fellow devotees in their spiritual journey. May Lord Shiva bless all users 
                with peace, prosperity, and spiritual growth.
              </p>
              <div className="text-center mt-4">
                <p className="text-lg font-semibold text-saffron-800">🙏 हर हर महादेव 🙏</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Version Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Version:</p>
                  <p className="font-semibold">1.0.0</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Updated:</p>
                  <p className="font-semibold">December 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
