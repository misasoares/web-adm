import { useEffect } from 'react';
import { useAppDispatch } from 'app/store/hooks';
import ChecksTable from './components/ChecksTable';
import CheckCreateComponent from './components/CreateCheck';

import { getChecks } from './store/checksSlice';

export default function ChecksPage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getChecks());
	}, []);

	return (
		<>
			<CheckCreateComponent />
			<ChecksTable />
		</>
	);
}
