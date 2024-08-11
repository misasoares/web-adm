import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
	{
		id: 'apps',
		title: 'MS Labs',
		subtitle: 'Ms Controls',
		type: 'group',
		icon: 'heroicons-outline:home',
		auth: ['admin', 'employees'],
		children: [
			{
				id: 'apps.checks',
				title: 'Cheques',
				type: 'item',
				icon: 'heroicons-outline:cash',
				auth: ['admin'],
				url: '/checks'
			},
			{
				id: 'apps.internalOrder',
				title: 'Pedidos',
				type: 'item',
				icon: 'heroicons-outline:clipboard-list',
				auth: ['admin', 'employees'],
				url: '/internal-order'
			},
			{
				id: 'apps.customers',
				title: 'Clientes',
				type: 'item',
				icon: 'heroicons-outline:user-group',
				auth: ['admin'],
				url: '/customers'
			},
			{
				id: 'apps.products',
				title: 'Produtos',
				type: 'item',
				icon: 'feather:battery-charging',
				auth: ['admin'],
				url: '/products'
			}
		]
	},
	{
		id: 'rapido-ms',
		title: 'Rápido MS',
		type: 'group',
		icon: 'heroicons-outline:home',
		auth: ['admin', 'customer'],
		children: [
			{
				id: 'rapido-ms.infos',
				title: 'Mais informações',
				type: 'item',
				icon: 'heroicons-outline:information-circle',
				auth: ['admin', 'customer'],
				url: '/'
			},
			{
				id: 'rapido-ms.order',
				title: 'Pedir bateria',
				type: 'item',
				icon: 'material-twotone:electric_car',
				auth: ['admin', 'customer'],
				url: '/rapido-ms'
			},
			{
				id: 'rapido-ms.products',
				title: 'Preços',
				type: 'item',
				icon: 'heroicons-outline:currency-dollar',
				auth: ['admin', 'customer'],
				url: '/'
			}
		]
	}
];

export default navigationConfig;
