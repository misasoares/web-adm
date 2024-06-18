import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

interface DefaultPageProps {
	title: string;
	isCreatePage?: boolean;
	createButton?: string;
	content: JSX.Element;
	secondaryContent?: JSX.Element;
}

export default function DefaultPage({
	title,
	content,
	secondaryContent,
	createButton,
	isCreatePage
}: DefaultPageProps) {
	const navigate = useNavigate();

	return (
		<div className="p-32">
			{isCreatePage && (
				<Button
					variant="text"
					onClick={() => navigate(-1)}
				>
					<FuseSvgIcon>heroicons-outline:arrow-left</FuseSvgIcon> VOLTAR
				</Button>
			)}
			<Paper
				elevation={4}
				className="p-32 mb-32 flex justify-between"
			>
				<Typography variant="h4">{title}</Typography>
				{createButton && (
					<Button
						variant="contained"
						onClick={() => navigate('new')}
						color="primary"
						startIcon={<FuseSvgIcon color="inherit">heroicons-outline:plus</FuseSvgIcon>}
					>
						{createButton}
					</Button>
				)}
			</Paper>

			<Paper
				elevation={4}
				className="p-32"
			>
				{content}
			</Paper>

			{secondaryContent && (
				<Paper
					elevation={4}
					className="p-32 mt-32"
				>
					{secondaryContent}
				</Paper>
			)}
		</div>
	);
}
