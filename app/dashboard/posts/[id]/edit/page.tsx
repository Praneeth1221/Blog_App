'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { PostEditor } from '@/components/PostEditor';
import { supabase } from '@/lib/supabase/client';
import { getCurrentUser } from '@/lib/auth';
import { Post } from '@/lib/supabase/types';

export default function EditPostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const checkAuthAndLoadPost = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/auth/signin');
        return;
      }

      if (id) {
        await fetchPost(id as string);
      }
    };

    checkAuthAndLoadPost();
  }, [router, id]);

  const fetchPost = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      router.push('/dashboard');
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
            <div className="h-8 bg-gray-300 rounded mb-6"></div>
            <div className="h-96 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {post ? (
          <PostEditor post={post} />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Post not found.</p>
          </div>
        )}
      </div>
    </div>
  );
}