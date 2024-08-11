import { Typography } from '@mui/material';
import { useAppDispatch } from 'app/store/hooks';
import { useEffect } from 'react';
import { getInternalOrder } from './store/internalOrderSlice';

export default function InternalOrderList() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getInternalOrder());
	}, []);

	return (
		<div className="flex w-full h-full items-center justify-center flex-col">
			<Typography variant="h4">FUNCIONALIDADE TEMPORARIAMENTE DESABILITADA PELO ADMINISTRADOR</Typography>
			<Typography>vulgo Misa lindão</Typography>
		</div>
		// <DefaultPage
		// 	title="Lista de pedidos"
		// 	createButton="Novo pedido"
		// >
		// 	<TableToList />
		// </DefaultPage>
	);
}
