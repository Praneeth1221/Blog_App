'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserProfile, getCurrentUser } from '@/lib/auth';
import { Profile } from '@/lib/supabase/types';
import { Plus, Eye, FileText, Crown } from 'lucide-react';

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/auth/signin');
        return;
      }

      const userProfile = await getUserProfile();
      setProfile(userProfile);
      
     
    };

    checkAuthAndLoadData();
  }, [router]);

 


  
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {profile?.full_name}!</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/posts/new">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Posts</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
          </Card>
        </div>
        </div>
        </div>
        
  );
}
