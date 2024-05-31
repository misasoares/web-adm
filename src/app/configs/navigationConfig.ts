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
		children: [
			{
				id: 'apps.checks',
				title: 'Cheques',
				type: 'item',
				icon: 'heroicons-outline:cash',
				url: '/checks'
			},
			{
				id: 'apps.internalOrder',
				title: 'Pedidos',
				type: 'item',
				icon: 'heroicons-outline:clipboard-list',
				url: '/internal-order'
			}
		]
	}
];

export default navigationConfig;
