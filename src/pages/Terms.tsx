
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, FileTextIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
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
            <FileTextIcon className="w-6 h-6" />
            Terms & Conditions
          </h1>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Last updated: December 15, 2024
              </p>
              <p className="text-gray-700 leading-relaxed">
                Please read these Terms and Conditions ("Terms", "Terms and Conditions") 
                carefully before using the Shiv Vaas Calculator mobile application.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using this application, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to these terms, 
                you should not use this application.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Use of the Application</h2>
              <div className="space-y-3">
                <div className="p-3 bg-saffron-50 rounded-lg border-l-4 border-saffron-400">
                  <h3 className="font-semibold text-saffron-800">Permitted Use</h3>
                  <p className="text-sm text-saffron-700">
                    This app is provided for personal, non-commercial use only. You may use it 
                    for religious and spiritual purposes in accordance with Hindu traditions.
                  </p>
                </div>
                
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                  <h3 className="font-semibold text-orange-800">Prohibited Use</h3>
                  <p className="text-sm text-orange-700">
                    You may not use this app for any unlawful purpose or in any way that could 
                    damage, disable, or impair the application or interfere with other users' use.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Accuracy of Information</h2>
              <p className="text-gray-700 leading-relaxed">
                While we strive to provide accurate astronomical calculations based on traditional 
                Vedic methods, we cannot guarantee absolute accuracy. The information provided 
                should be used for guidance purposes only.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Disclaimer</h2>
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                <p className="text-red-800 text-sm leading-relaxed">
                  This application provides information based on astronomical calculations and 
                  Hindu traditions. Users should consult with qualified religious scholars or 
                  astrologers for important religious decisions. We are not responsible for 
                  any consequences arising from the use of this information.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The application and its original content, features, and functionality are owned 
                by the developers and are protected by international copyright, trademark, and 
                other intellectual property laws.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please refer to our Privacy Policy for 
                information about how we collect, use, and protect your data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be 
                effective immediately upon posting. Your continued use of the application 
                after changes indicates your acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="mt-2 p-3 bg-saffron-50 rounded-lg">
                <p className="text-saffron-800">Email: support@shivvaas.app</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-center text-lg font-semibold text-saffron-800">
                🙏 हर हर महादेव 🙏
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
