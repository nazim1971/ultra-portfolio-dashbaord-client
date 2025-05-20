/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { User, CalendarDays } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { TProject } from '@/types';
import ProjectCardCarousel from '../../_components/ProjectCardCarosule';

const ProjectDetail = ({ project }: { project: TProject }) => {
  const { user } = useUser();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-[#111] rounded-2xl shadow-md">
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1 text-[#14B8A6]">
          <User className="w-4 h-4" />
          {user?.name}
        </span>
        <span className="flex items-center gap-1 text-[#14B8A6]">
          <CalendarDays className="w-4 h-4" />
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Image carousel */}
      <div className="w-full h-[300px] mb-6 rounded-lg overflow-hidden">
        <ProjectCardCarousel project={project} />
      </div>

      <h1 className="text-3xl font-semibold text-[#14B8A6] mb-4">{project.title}</h1>

      <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

      <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 mb-6">
        <p>
          <span className="font-medium text-[#14B8A6]">Live Site: </span>
          <a
            href={project.liveSiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {project.liveSiteLink}
          </a>
        </p>

        <p>
          <span className="font-medium text-[#14B8A6]">Client Code: </span>
          <a
            href={project.clientCodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {project.clientCodeLink}
          </a>
        </p>

        <p>
          <span className="font-medium text-[#14B8A6]">Server Code: </span>
          <a
            href={project.serverCodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {project.serverCodeLink}
          </a>
        </p>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        Last Updated: {new Date(project.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ProjectDetail;
