import { useAppDispatch } from 'app/store/hooks';
import { useEffect } from 'react';
import DefaultPage from '../components/DefaultPage';
import TableToList from './components/TableToList';
import { getInternalOrder } from './store/internalOrderSlice';

export default function InternalOrderList() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getInternalOrder());
	}, []);

	return (
		<DefaultPage
			title="Lista de pedidos"
			createButton="Novo pedido"
		>
			<TableToList />
		</DefaultPage>
	);
}
