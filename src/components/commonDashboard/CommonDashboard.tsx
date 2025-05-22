'use client';

import { getAllBlogs } from '@/app/(privateRoute)/admin/blog/all-blogs/_actions';
import { getAllProjects } from '@/app/(privateRoute)/admin/project/all-projects/_actions';
import { useUser } from '@/context/UserContext';
import { Sparkles, FileText, Code, LayoutTemplate, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const CommonDashboard = () => {
  const { user } = useUser();
  const [blogCount, setBlogCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogs, projects] = await Promise.all([
          getAllBlogs(),
          getAllProjects()
        ]);
        setBlogCount(blogs?.meta?.total);
        setProjectCount(projects?.data?.meta?.total);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, <span className="text-blue-600 dark:text-blue-400">{user?.name || 'Developer'}</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            {loading ? 'Loading your content...' : `You have ${projectCount} projects and ${blogCount} blog posts`}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg">
          <Sparkles className="w-10 h-10 text-amber-400" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Projects Card */}
        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <LayoutTemplate className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Projects</h2>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              </div>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-300">
                  You have created <span className="font-medium text-blue-600 dark:text-blue-400">{projectCount} projects</span> in your portfolio.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                      <Code className="w-5 h-5 text-blue-500" />
                      Recent Activity
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {projectCount > 0 ? 'Last updated 2 days ago' : 'No projects yet'}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                      <Users className="w-5 h-5 text-indigo-500" />
                      Technologies
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {projectCount > 0 ? 'React, Next.js, Node.js' : 'Add your first project'}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Blog Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Blogs</h2>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              </div>
            ) : (
              <>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                  <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-1">Total Published</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{blogCount}</p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                    {blogCount > 0 ? 'Last published 1 week ago' : 'Start writing your first blog'}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg">
                    <p className="text-xs text-blue-700 dark:text-blue-400">Drafts</p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {blogCount > 0 ? '3' : '0'}
                    </p>
                  </div>
                  
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-lg">
                    <p className="text-xs text-emerald-700 dark:text-emerald-400">Categories</p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {blogCount > 0 ? '5' : '0'}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="bg-blue-100 dark:bg-blue-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <LayoutTemplate className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Add Project</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Showcase your latest work and expand your portfolio.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="bg-indigo-100 dark:bg-indigo-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Write Blog</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Share your knowledge with {blogCount > 0 ? 'more' : ''} articles.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="bg-amber-100 dark:bg-amber-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Connect</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Grow your network and find collaboration opportunities.
          </p>
        </div>
      </div>

      {/* Inspiration Footer */}
      <div className="text-center py-6 border-t border-gray-100 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
          <Code className="w-5 h-5 text-blue-500" />
          {loading ? 'Loading your creative journey...' : `Keep building your ${projectCount} projects and ${blogCount} blogs`}
          <Code className="w-5 h-5 text-blue-500" />
        </p>
      </div>
    </div>
  );
};

export default CommonDashboard;