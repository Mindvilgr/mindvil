import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import availableCourses from "@site/courses";

interface courseItem {
  id: string;
  public: boolean;
  title: string;
  desc: string;
  image: string;
  link: string;
}

export const getCourses: () => { courses: courseItem[] } = () => {
  const data = useAllDocsData();
  const sidebars = data.default.versions[0].sidebars;
  let courses = { courses: [] };

  for (const key in sidebars) {
    const courseName = key.replace("Sidebar", "");
    const courseMeta = availableCourses.find(c => c.id === courseName);

    if (courseMeta) {
      courses["courses"].push({
        id: courseMeta.id,
        public: courseMeta.public,
        title: courseMeta.name,
        desc: courseMeta.desc,
        image: courseMeta.image,
        link: sidebars[key].link.path
      });
    }
  }

  return courses;
};
