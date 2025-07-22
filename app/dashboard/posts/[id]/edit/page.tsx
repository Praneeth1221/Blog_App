import { supabase } from '@/lib/supabase/client';
import { Header } from '@/components/Header';
import { PostEditor } from '@/components/PostEditor';
import { Post } from '@/lib/supabase/types';
import { notFound } from 'next/navigation';

// ✅ CORRECT: wrap id in params
export async function generateStaticParams() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id');

  if (error) {
    console.error('Error fetching post IDs:', error);
    return [];
  }

  return posts.map((post) => ({
    params: {
      id: post.id.toString(),
    },
  }));
}

// ✅ CORRECT: props type
export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PostEditor post={post as Post} />
      </div>
    </div>
  );
}
