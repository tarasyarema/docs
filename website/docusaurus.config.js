module.exports = {
  title: 'ConfigCat Docs',
  tagline: 'Learn more on how to use ConfigCat Feature Flags!',
  url: 'https://configcat.com',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.png',
  organizationName: 'configcat', // Usually your GitHub org/user name.
  projectName: 'configcat', // Usually your repo name.
  themeConfig: {
    sidebarCollapsible: false,
    navbar: {
      title: 'ConfigCat Docs',
      logo: {
        alt: 'ConfigCat',
        src: 'img/cat.svg',
      },
      items: [
        {
          href: 'https://www.configcat.com',
          label: 'Home Page',
          position: "left"
        },
        {
          href: 'https://www.configcat.com/pricing',
          label: 'Pricing',
          position: "left"
        },
        {
          href: 'https://www.configcat.com/architecture',
          label: 'Architecture',
          position: "left"
        },
        {
          href: 'https://status.configcat.com',
          label: 'Service Status Monitor',
          position: "left"
        },
        {
          href: 'https://configcat.com/blog',
          label: 'Blog',
          position: "left"
        },

      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Legal & Company',
          items: [
            {
              label: 'Terms & Policies',
              href: 'https://configcat.com/policies',
            },
            {
              label: 'Public Roadmap',
              href: 'https://trello.com/b/8gYunIb6/configcat-public-roadmap',
            },
            {
              label: 'Our Team',
              href: 'https://configcat.com/team',
            },
            {
              label: 'Jobs',
              href: 'https://configcat.com/jobs',
            },
          ],
        },
        {
          title: 'Know more',
          items: [
            {
              label: 'Pricing',
              href: 'https://configcat.com/pricing',
            },
            {
              label: 'On-Premise Self Hosted Plan',
              href: 'https://configcat.com/on-premise',
            },
            {
              label: 'Referrals',
              href: 'https://configcat.com/referrals',
            },
            {
              label: 'Blog',
              href: 'https://configcat.com/blog',
            },
          ],
        },
        {
          title: 'Help & Resources',
          items: [
            {
              label: 'Service Status Monitor',
              href: 'https://status.configcat.com',
            },
            {
              label: 'Architectural Overview',
              href: 'https://configcat.com/architecture',
            },
            {
              label: 'Public Management API Docs',
              href: 'https://api.configcat.com/docs',
            },
            {
              label: 'Support',
              href: 'https://configcat.com/support',
            },
          ],
        },
        {
          title: 'Engage',
          items: [
            {
              label: 'Join our Community Slack',
              href: 'https://join.slack.com/t/configcat-community/shared_invite/enQtMzkwNDg3MjQ3MTUyLWY1ZmE0NjY5NjA0YjAzMWU3MDg3ODhkMGI2ZjdmZjZmYTY4YTg1NmQ0YzBhMTVhOGE5YmNiYTI5OTg4NmNjYTQ',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/configcat',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/configcat',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/configcat',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/configcat/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ConfigCat.`,
    },
    prism: {
      additionalLanguages: ['hcl', 'csharp', 'kotlin', 'java', 'powershell', 'swift', 'php', 'ruby', 'elixir'],
    },
    algolia: {
      apiKey: '36b9ea4801b9b88e1e8fa2e42d3cc705',
      indexName: 'configcat',
      searchParameters: {}
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/configcat/docs/edit/master/website/',
          routeBasePath: '/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
