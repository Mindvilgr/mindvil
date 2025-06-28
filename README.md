# mindvil
A gamify learning platform
<br/>

[![Deploy to Railway](https://github.com/Mindvilgr/mindvil/actions/workflows/main.yml/badge.svg)](https://github.com/Mindvilgr/mindvil/actions/workflows/main.yml)

## Add new course

In order to add a new course to the website:

- create a new folder under `/docs` directory, preferably name it after the
  course topic for instance _git_
- paste all the markdown files in the new folder
- lastly you have to add the new course in the `/courses.ts` file by adding an
  object inside the `availableCourses` array

For example if the `availableCourses` array looks like this

```ts
const availableCourses = [
  {
    id: "python",
    public: true,
    name: "Python Fundamentals",
    desc: "Learn the basics of Python",
    image: "https://picsum.photos/seed/snake/390/200"
  }
];
```

and you want to add a new course about _git_, here is what the final array would
look like

```ts
const availableCourses = [
  {
    id: "python",
    public: true,
    name: "Python Fundamentals",
    desc: "Learn the basics of Python",
    image: "https://picsum.photos/seed/snake/390/200"
  },
  {
    id: "git",
    // whether to be available to the site or not
    public: true,
    // name can be whatever you want
    name: "Git Fundamentals",
    // desc can be whatever you want
    desc: "Learn the basics of GIT",
    // image can be whatever you want
    image: "https://picsum.photos/seed/snake/390/200"
  }
];
```

**Notice** that the `id` property has the value `git` which means inside the
`/docs` folder there must be a directory named `git`.

```bash
docs/
  python/
    intro.md
    *.md
  git/
    intro.md
    *.md
```
