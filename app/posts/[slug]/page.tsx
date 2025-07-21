'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Paywall } from '@/components/Paywall';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase/client';
import { Post, Profile } from '@/lib/supabase/types';
import { getCurrentUser, isSubscribed } from '@/lib/auth';
import { CalendarDays, User, Clock, Lock } from 'lucide-react';

type PostWithProfile = Post & {
  profiles: Profile;
};

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<PostWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [canViewContent, setCanViewContent] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (*)
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      setPost(data);

      // Check if user can view content
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (!data.is_premium) {
        // Free content is always accessible
        setCanViewContent(true);
      } else if (currentUser) {
        // Premium content requires subscription
        const hasSubscription = await isSubscribed();
        setCanViewContent(hasSubscription);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600">The post you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant={post.is_premium ? 'default' : 'secondary'}>
              {post.is_premium ? (
                <>
                  <Lock className="w-3 h-3 mr-1" />
                  Premium
                </>
              ) : (
                'Free'
              )}
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-6">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{post.profiles.full_name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CalendarDays className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        {canViewContent ? (
          <div className="prose max-w-none">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="whitespace-pre-wrap text-gray-900 leading-relaxed">
                {post.content}
              </div>
            </div>
          </div>
        ) : (
          <Paywall title={post.title} excerpt={post.excerpt} />
        )}
      </article>
    </div>
  );
}