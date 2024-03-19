import ChecksTable from './components/ChecksTable';
import CheckCreateComponent from './components/CreateCheck';

export default function ChecksPage() {
	return (
		<>
			<CheckCreateComponent />
			<ChecksTable />
		</>
	);
}
