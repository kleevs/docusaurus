// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const diagramPlugin = require('@docu/diagram').Plugin;
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DocU',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.js'),
          admonitions: {
            tag: ':::',
            keywords: ['note', 'tip', 'info', 'caution', 'danger', 'diagram']
          },
          beforeDefaultRemarkPlugins: [diagramPlugin]
          // remarkPlugins: [diagramPlugin]
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        }
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'DocU',
        // logo: {
        //   alt: 'My Site Logo',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            type: 'doc',
            docId: 'get-started',
            position: 'left',
            label: 'Documentation',
          }
          // {to: '/blog', label: 'Blog', position: 'left'}
        ],
      },
      prism: {
        additionalLanguages: ['csharp'],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
