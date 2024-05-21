import { Typography } from '@mui/material';
import { useAppDispatch } from 'app/store/hooks';
import { useEffect } from 'react';
import TableToList from './components/TableToList';
import { getInternalOrder } from './store/internalOrderSlice';

export default function InternalOrderList() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getInternalOrder());
	}, []);
	return (
		<>
			<Typography>Página de listagem</Typography>

			<TableToList />
		</>
	);
}
