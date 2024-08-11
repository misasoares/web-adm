import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import DefaultPageRapidoMsCustomer from './components/DefaultPage';
import FindVehicle from './components/create-order/FindVehicle';
import CustomerCredentials from './components/create-order/CustomerCredentials';
import FindProducts from './components/create-order/FindProducts';

export default function RapidoMsCreateOrder() {
	const [isCustomerLogged, setIsCustomerLogged] = useState(false);
	const [vehicle, setVehicle] = useState(null);

	function handleCredentials(data) {
		console.log(data);

		setIsCustomerLogged(true);
	}

	useEffect(() => {
		const token = localStorage.getItem('jwt_access_token');
		if (token) {
			setIsCustomerLogged(true);
			return;
		}

		setIsCustomerLogged(false);
	}, []);

	return (
		<DefaultPageRapidoMsCustomer>
			{!isCustomerLogged && <CustomerCredentials credentials={handleCredentials} />}
			{!vehicle && isCustomerLogged && <FindVehicle sendVehicle={setVehicle} />}
			{vehicle && <FindProducts vehicle={vehicle} />}
		</DefaultPageRapidoMsCustomer>
	);
}
