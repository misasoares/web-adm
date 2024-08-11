import { FuseRouteConfigType } from '@fuse/utils/FuseUtils';
import { authRoles } from 'src/app/auth';
import Products from './Products';
import CreateProducts from './CreateProducts';

const ProductsConfig: FuseRouteConfigType = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: true
				},
				toolbar: {
					display: true
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: authRoles.staff,
	routes: [
		{
			path: 'products',
			children: [
				{
					path: '',
					element: <Products />
				},
				{
					path: ':uid',
					element: <CreateProducts />
				}
			]
		}
	]
};

export default ProductsConfig;
