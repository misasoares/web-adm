import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import DefaultPage from '../components/DefaultPage';
import TableCustomer from './components/TableCustomers';
import { getCustomers, selectCustomers, selectCustomersLoading } from './store/customersSlice';

export default function CustomerPage() {
	const dispatch = useAppDispatch();
	const customersLoading = useAppSelector(selectCustomersLoading);
	const customers = useAppSelector(selectCustomers);

	useEffect(() => {
		dispatch(getCustomers());
	}, []);

	return (
		<DefaultPage
			title="Lista de clientes"
			createButton="Adicionar cliente"
		>
			<TableCustomer customer={customers} />
		</DefaultPage>
	);
}
