/**
 * Represents the list of courses available on the website.
 * Unique identifier for the course.
 * @property {string} id this ID must match the name of a folder in the `docs` directory.
 * @property {string} name the name of the course.
 * @property {string} desc short description of the course content.
 * @property {string} image URL to the course's image.
 */
const allCourses = [
  {
    id: "python",
    public: true,
    name: "Python Fundamentals",
    desc: "Learn the basics of Python",
    image: "https://picsum.photos/seed/snake/390/200"
  },
  // {
  //   id: "python-research",
  //   public: false,
  //   name: "Python for Researchers",
  //   desc: "Python a tool for research",
  //   image: "https://picsum.photos/seed/snake/390/200"
  // },
  {
    id: "python-engineers",
    public: true,
    name: "Python for Egineers",
    desc: "Python for engineers to build powerful applications",
    image: "https://picsum.photos/seed/snake/390/200"
  }
];

const availableCourses = allCourses.filter(course => course.public);

export default availableCourses;
