"use client";

import { useRouter } from "next/navigation"; // Next 13 useRouter hook for client navigation
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { User, CalendarDays } from "lucide-react";
import { TProject } from "@/types";
import { useUser } from "@/context/UserContext";
import ProjectCardCarousel from "./ProjectCardCarosule";

const ProjectCard = ({ project }: { project: TProject }) => {
  const { user } = useUser();
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/admin/project/all-projects/${project._id}`);
  };

  return (
    <Card
      className="rounded-2xl overflow-hidden border shadow-md dark:bg-[#111] cursor-pointer"
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
      <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] relative">
        <ProjectCardCarousel project={project} />
      </div>

      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1 text-[#14B8A6]">
            <User className="w-4 h-4" />
            {user?.name}
          </span>
          <span className="flex items-center gap-1 text-[#14B8A6]">
            <CalendarDays className="w-4 h-4" />
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-[#14B8A6]">{project.title}</h2>

        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {project.description}
        </p>

        <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
          {project.liveSiteLink && (
            <p className="break-all">
              <span className="font-medium text-[#14B8A6]">Live Site: </span>
              <a
                href={project.liveSiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                onClick={(e) => e.stopPropagation()} // prevent card click
              >
                {project.liveSiteLink}
              </a>
            </p>
          )}

          {project.clientCodeLink && (
            <p className="break-all">
              <span className="font-medium text-[#14B8A6]">Client Code: </span>
              <a
                href={project.clientCodeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                onClick={(e) => e.stopPropagation()}
              >
                {project.clientCodeLink}
              </a>
            </p>
          )}

          {project.serverCodeLink && (
            <p className="break-all">
              <span className="font-medium text-[#14B8A6]">Server Code: </span>
              <a
                href={project.serverCodeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                onClick={(e) => e.stopPropagation()}
              >
                {project.serverCodeLink}
              </a>
            </p>
          )}
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          Updated: {new Date(project.updatedAt).toLocaleDateString()}
        </p>
      </CardContent>

      <CardFooter className="p-5 flex flex-col gap-3 border-t">
        <div className="flex items-center gap-3 justify-between text-sm">
          <span className="bg-[#14B8A6]/10 text-[#14B8A6] px-3 py-1 rounded-full">
            {project.images.length} Image{project.images.length !== 1 && "s"}
          </span>
          <span className="text-lg font-bold text-[#14B8A6]">
            #{project._id.slice(-4)}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
