import Link from 'next/link';
import { Post, Profile } from '@/lib/supabase/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, User, Lock } from 'lucide-react';

interface PostCardProps {
  post: Post & {
    profiles: Profile;
  };
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
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
            <Badge variant="outline">{post.status}</Badge>
          </div>
        </div>
        <CardTitle className="line-clamp-2">
          <Link
            href={`/posts/${post.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt || post.content.substring(0, 150) + '...'}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{post.profiles.full_name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CalendarDays className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}