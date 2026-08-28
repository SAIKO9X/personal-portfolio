import { projectsData } from "@/data/projectsData";
import ProjectDetailsClient from "./ProjectDetailsClient";

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailsPage({ params }) {
  const { slug } = await params;
  return <ProjectDetailsClient slug={slug} />;
}
