import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

import availableCourses, { allCourses } from "./courses";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  scripts: [
    {
      src: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js",
      async: true
    }
  ],

  title: "PyCamp",
  favicon: "img/favicon.svg",

  // Set the production url of your site here
  url: "https://creative-griffin-08c509.netlify.app",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"]
  },

  themes: ["@docusaurus/theme-mermaid"],
  markdown: {
    mermaid: true
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: 'docs',
          routeBasePath: "courses",
          include: availableCourses.map(course => `${course.id}/**/*.{md,mdx}`),
          sidebarPath: "./sidebars.ts",
          // Enable MDX
          remarkPlugins: [require("remark-math")],
          rehypePlugins: [require("rehype-katex")]
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css"
        }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    image: "img/social-card.jpg",
    navbar: {
      logo: {
        alt: "logo",
        src: "img/logo.svg"
      },
      items: allCourses.filter(course => course.inNav && course.public).map(course => ({
        type: "docSidebar",
        sidebarId: `${course.id}Sidebar`,
        position: "right",
        label: `${course.name}`
      }))
      // items: [
      //   {
      //     type: "docSidebar",
      //     sidebarId: "python-researchSidebar",
      //     position: "right",
      //     label: "Learn python"
      //   }
      // ]
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Pycourse`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false
    }
  } satisfies Preset.ThemeConfig
};

export default config;
