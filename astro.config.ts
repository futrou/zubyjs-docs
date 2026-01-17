import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	output: 'static',
	server: {
		port: 3000,
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'viewport'
	},
	site: 'https://zubyjs.com',
	integrations: [
		starlight({
			title: 'Zuby.js',
			customCss: [
				'./src/styles.css',
			],
			logo: {
				light: './src/assets/zuby-logo-light.svg',
				dark: './src/assets/zuby-logo-dark.svg',
				replacesTitle: true,
			},
			social: {
				github: 'https://github.com/futrou/zubyjs-docs/'
			},
			editLink: {
				baseUrl: 'https://github.com/futrou/zubyjs-docs/edit/master/',
			},
			sidebar: [
				{
					label: 'Basics',
					items: [
						{ label: 'Getting Started', link: '/' },
						{ label: 'Installation', link: '/basics/installation' },
						{ label: 'Deployment', link: '/basics/deployment' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Project structure', link: '/guides/project-structure' },
						{ label: 'Routing system', link: '/guides/routing-system' },
						{ label: 'Pages', link: '/guides/pages' },
						{ label: 'Handlers', link: '/guides/handlers' },
						{ label: 'Pre-rendering', link: '/guides/prerendering' },
						{ label: 'Caching', link: '/guides/caching' },
						{ label: 'Internationalization (i18n)', link: '/guides/internationalization' },
						{ label: 'Migration', link: '/guides/migration' },
						{ label: 'Plugins', link: '/guides/plugins' },
						{ label: 'Images', link: '/guides/images' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Configuration API', link: '/reference/configuration' },
						{ label: 'Page context API', link: '/reference/page-context' },
						{ label: 'Global context API', link: '/reference/global-context' },
						{ label: 'JSX provider API', link: '/reference/jsx-provider' },
						{ label: 'Zuby plugin API', link: '/reference/zuby-plugin' },
						{ label: 'Zuby CLI', link: '/reference/cli' }
					],
				},
				{
					label: 'About',
					items: [
						{ label: 'FAQ', link: '/about/faq' }
					],
				}
			],
		}),
	],
})
