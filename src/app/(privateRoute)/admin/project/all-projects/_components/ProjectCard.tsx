"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { User, CalendarDays, ExternalLink } from "lucide-react";
import { TProject } from "@/types";
import { useUser } from "@/context/UserContext";
import ProjectCardCarousel from "./ProjectCardCarosule";
import { Button } from "@/components/ui/button";

const ProjectCard = ({ project }: { project: TProject }) => {
  const { user } = useUser();
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/admin/project/all-projects/${project._id}`);
  };

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  return (
    <Card
      className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 dark:bg-gray-900 cursor-pointer group"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCardClick();
        }
      }}
    >
      {/* Carousel for project images */}
      <div className="w-full aspect-video relative">
        <ProjectCardCarousel project={project} />
      </div>

      <CardContent className="p-3 space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium">{user?.name}</span>
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            {new Date(project.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-500 transition-colors">
          {project.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {project.description.split(" ").slice(0,5).join(" ")}...
        </p>

        {project.liveSiteLink && (
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 border-teal-600 text-teal-600 dark:border-teal-500 dark:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/30"
            onClick={(e) => handleLinkClick(e, project.liveSiteLink)}
          >
            <ExternalLink className="w-4 h-4" />
            Visit Live Site
          </Button>
        )}
      </CardContent>

      <CardFooter className="p-3 pt-0 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Updated: {new Date(project.updatedAt).toLocaleDateString()}
        </span>
        <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
          #{project._id.slice(-4).toUpperCase()}
        </span>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;