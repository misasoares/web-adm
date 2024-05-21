import { FuseRouteConfigType } from '@fuse/utils/FuseUtils';
import { authRoles } from 'src/app/auth';
import InternalOrderPage from './InternalOrder';
import InternalOrderList from './InternalOrderList';

const InternalOrderConfig: FuseRouteConfigType = {
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
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: 'internal-order',
			element: <InternalOrderPage />
		},
		{
			path: 'internal-order/list',
			element: <InternalOrderList />
		}
	]
};

export default InternalOrderConfig;
