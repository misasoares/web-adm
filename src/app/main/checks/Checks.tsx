import { useEffect, useState } from 'react';
import { useAppDispatch } from 'app/store/hooks';
import ChecksTable from './components/ChecksTable';
import CheckCreateComponent from './components/CreateCheck';

import { getChecks } from './store/checksSlice';
import { ChecksType } from './store/types/typesSlice';

export default function ChecksPage() {
	const dispatch = useAppDispatch();
	const [editMode, setEditMode] = useState(false);
	const [rowToEdit, setRowToEdit] = useState<ChecksType | null>(null);

	function handleRowToEdit(row: ChecksType) {
		setRowToEdit(row);
	}

	useEffect(() => {
		dispatch(getChecks());
	}, []);

	return (
		<>
			<CheckCreateComponent
				setEditMode={setEditMode}
				editMode={editMode}
				rowToEdit={rowToEdit}
			/>
			<ChecksTable
				editMode={setEditMode}
				rowToEdit={handleRowToEdit}
			/>
		</>
	);
}
