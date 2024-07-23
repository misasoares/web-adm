import FuseLoading from '@fuse/core/FuseLoading';
import FuseUtils from '@fuse/utils';
import { FuseRouteConfigsType, FuseRoutesType } from '@fuse/utils/FuseUtils';
import settingsConfig from 'app/configs/settingsConfig';
import { Navigate } from 'react-router-dom';
import Error404Page from '../main/404/Error404Page';
import AppsConfigs from '../main/apps/appsConfigs';
import authRoleExamplesConfigs from '../main/auth/authRoleExamplesConfigs';
import ChecksConfig from '../main/checks/ChecksConfig';
import DashboardsConfigs from '../main/dashboards/dashboardsConfigs';

import PagesConfigs from '../main/pages/pagesConfigs';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import UserInterfaceConfigs from '../main/user-interface/UserInterfaceConfigs';
import InternalOrderConfig from '../main/internalOrder/InternalOrderConfig';
import CustomerPageConfig from '../main/costumers/CustomerPageConfig';

const routeConfigs: FuseRouteConfigsType = [
	SignOutConfig,
	SignInConfig,
	SignUpConfig,
	ChecksConfig,
	InternalOrderConfig,
	CustomerPageConfig,
	...PagesConfigs,
	...UserInterfaceConfigs,
	...DashboardsConfigs,
	...AppsConfigs,
	...authRoleExamplesConfigs
];

/**
 * The routes of the application.
 */
const routes: FuseRoutesType = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/internal-order" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'loading',
		element: <FuseLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to="404" />
	}
];

export default routes;
