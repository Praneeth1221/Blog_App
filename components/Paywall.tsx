'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Star, CheckCircle } from 'lucide-react';

interface PaywallProps {
  title: string;
  excerpt?: string;
}

export function Paywall({ title, excerpt }: PaywallProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Lock className="h-8 w-8 text-yellow-600" />
            <Badge variant="default" className="bg-yellow-600">
              <Star className="w-3 h-3 mr-1" />
              Premium Content
            </Badge>
          </div>
          <CardTitle className="text-2xl text-gray-800">
            {title}
          </CardTitle>
          {excerpt && (
            <p className="text-gray-600 mt-2">
              {excerpt}
            </p>
          )}
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Unlock Premium Content
            </h3>
            <p className="text-gray-600 mb-6">
              Get access to all premium articles, exclusive content, and advanced features.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Unlimited premium articles</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Ad-free reading experience</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Early access to new content</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
              >
                {loading ? 'Loading...' : 'Upgrade to Premium - $9.99/month'}
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/posts')}
                className="w-full"
              >
                Browse Free Articles
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}