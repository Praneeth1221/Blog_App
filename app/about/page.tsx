import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Target, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About BlogPub
          </h1>
          <p className="text-xl text-gray-600">
            Your premier destination for high-quality content and premium insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <Target className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                To democratize access to high-quality content while providing a sustainable platform for writers to share their expertise and insights with the world.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>What We Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                A curated collection of articles from industry experts, thought leaders, and passionate writers covering technology, business, lifestyle, and more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Our Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Join thousands of readers and writers who value quality content and meaningful discussions. Our community is built on respect, learning, and growth.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Award className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Quality Promise</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Every piece of content on BlogPub goes through our quality review process to ensure you receive valuable, well-researched, and engaging articles.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              BlogPub was founded with a simple belief: that great content should be accessible to everyone, while creators should be fairly compensated for their work. We've built a platform that balances free access to quality content with premium features that provide additional value to our most engaged readers.
            </p>
            <p>
              Our team consists of passionate writers, developers, and content curators who are committed to creating the best possible experience for both readers and writers. We believe in the power of words to inform, inspire, and connect people across the globe.
            </p>
            <p>
              Whether you're here to discover new ideas, share your expertise, or simply enjoy great writing, BlogPub is designed to be your home for meaningful content and authentic connections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}