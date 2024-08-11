import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { useEffect } from 'react';
import { getCustomers, selectCustomers, selectCustomersLoading } from './store/customersSlice';

export default function CustomerPage() {
	const dispatch = useAppDispatch();
	const customersLoading = useAppSelector(selectCustomersLoading);
	const customers = useAppSelector(selectCustomers);

	useEffect(() => {
		dispatch(getCustomers());
	}, []);

	return (
		<div className="flex w-full h-full items-center justify-center flex-col">
			<Typography variant="h4">FUNCIONALIDADE TEMPORARIAMENTE DESABILITADA PELO ADMINISTRADOR</Typography>
			<Typography>vulgo Misa lindão</Typography>
		</div>
		// <DefaultPage
		// 	title="Lista de clientes"
		// 	createButton="Adicionar cliente"
		// >
		// 	<TableCustomer customer={customers} />
		// </DefaultPage>
	);
}
