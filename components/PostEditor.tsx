'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase/client';
import { Post } from '@/lib/supabase/types';
import { getUserProfile } from '@/lib/auth';

interface PostEditorProps {
  post?: Post;
  onSave?: () => void;
}

export function PostEditor({ post, onSave }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [isPremium, setIsPremium] = useState(post?.is_premium || false);
  const [status, setStatus] = useState<'draft' | 'published'>(post?.status || 'draft');
  const [metaTitle, setMetaTitle] = useState(post?.meta_title || '');
  const [metaDescription, setMetaDescription] = useState(post?.meta_description || '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const profile = await getUserProfile();
      if (!profile) throw new Error('User not authenticated');

      const postData = {
        title,
        content,
        excerpt: excerpt || null,
        is_premium: isPremium,
        status,
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        author_id: profile.id,
      };

      if (post) {
        // Update existing post
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', post.id);

        if (error) throw error;
      } else {
        // Create new post
        const { error } = await supabase
          .from('posts')
          .insert([postData]);

        if (error) throw error;
      }

      onSave?.();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{post ? 'Edit Post' : 'Create New Post'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of the post"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              rows={15}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="meta-title">Meta Title (SEO)</Label>
              <Input
                id="meta-title"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO optimized title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta-description">Meta Description (SEO)</Label>
              <Input
                id="meta-description"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="SEO description"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="premium"
                  checked={isPremium}
                  onCheckedChange={setIsPremium}
                />
                <Label htmlFor="premium">Premium Content</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={status === 'published'}
                  onCheckedChange={(checked) => setStatus(checked ? 'published' : 'draft')}
                />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save Post'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}