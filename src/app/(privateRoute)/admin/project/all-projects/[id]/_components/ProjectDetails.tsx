'use client';

import { User, CalendarDays, ExternalLink, Github } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { TProject } from '@/types';
import ProjectCardCarousel from '../../_components/ProjectCardCarosule';
import { Button } from '@/components/ui/button';

const ProjectDetail = ({ project }: { project: TProject }) => {
  const { user } = useUser();

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* Project header with metadata */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{user?.name || 'Anonymous'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CalendarDays className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>
                  {new Date(project.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
            
            <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
              ID: {project._id.slice(-6).toUpperCase()}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Image carousel */}
        <div className="w-full aspect-video">
          <ProjectCardCarousel project={project} />
        </div>

        {/* Project links */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.liveSiteLink && (
              <Button 
                variant="outline" 
                className="w-full h-14 flex items-center justify-center gap-2 border-teal-600 text-teal-600 dark:border-teal-500 dark:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/30"
                onClick={() => window.open(project.liveSiteLink, '_blank')}
              >
                <ExternalLink className="w-5 h-5" />
                <span className="text-base">View Live Project</span>
              </Button>
            )}

            {project.clientCodeLink && (
              <Button 
                variant="outline" 
                className="w-full h-14 flex items-center justify-center gap-2 border-gray-600 text-gray-600 dark:border-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => window.open(project.clientCodeLink, '_blank')}
              >
                <Github className="w-5 h-5" />
                <span className="text-base">Client Code</span>
              </Button>
            )}

            {project.serverCodeLink && (
              <Button 
                variant="outline" 
                className="w-full h-14 flex items-center justify-center gap-2 border-gray-600 text-gray-600 dark:border-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => window.open(project.serverCodeLink, '_blank')}
              >
                <Github className="w-5 h-5" />
                <span className="text-base">Server Code</span>
              </Button>
            )}
          </div>

          {/* Last updated */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date(project.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;