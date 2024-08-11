import { FuseRouteConfigType } from '@fuse/utils/FuseUtils';
import { authRoles } from 'src/app/auth';
import RapidoMsOrder from './RapidoMsOrder';
import RapidoMsCreateOrder from './RapidoMsCreateOrder';

const RapidoMSOrder: FuseRouteConfigType = {
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
			path: 'rapido-ms',
			children: [
				{
					path: '',
					element: <RapidoMsOrder />
				},
				{
					path: 'pedir-bateria',
					element: <RapidoMsCreateOrder />
				}
			]
		}
	]
};

export default RapidoMSOrder;
