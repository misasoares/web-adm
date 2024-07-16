import { FuseRouteConfigType } from '@fuse/utils/FuseUtils';
import authRoles from '../../auth/authRoles';
import ChecksPage from './Checks';

const ChecksConfig: FuseRouteConfigType = {
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
	auth: authRoles.admin,
	routes: [
		{
			path: 'checks',
			element: <ChecksPage />
		}
	]
};

export default ChecksConfig;
