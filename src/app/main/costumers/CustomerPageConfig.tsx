import { FuseRouteConfigType } from '@fuse/utils/FuseUtils';
import { authRoles } from 'src/app/auth';
import { lazy } from 'react';

const CustomerPage = lazy(() => import('./CustomerPage'));
const CreateCustomerPage = lazy(() => import('./create/CreateCustomerPage'));

const CustomerPageConfig: FuseRouteConfigType = {
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
			path: 'customers',
			element: <CustomerPage />
		},
		{
			path: 'customers/:customerUid',
			element: <CreateCustomerPage />
		}
	]
};

export default CustomerPageConfig;
