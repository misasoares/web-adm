import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Button, Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';

interface DefaultPageProps {
	title: string;
	isCreatePage?: boolean;
	createButton?: string;
	children: ReactNode;
	secondaryContent?: JSX.Element;
}

export default function DefaultPage({
	title,
	children,
	secondaryContent,
	createButton,
	isCreatePage
}: DefaultPageProps) {
	const navigate = useNavigate();

	function handleColorTitle(title: string) {
		return title.split(':');
	}

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
				className="p-32 mb-32 flex-col sm:flex sm:flex-row sm:justify-between "
			>
				{isCreatePage && title.includes('Editar pedido de:') ? (
					<Typography
						variant="h4"
						className="w-full "
					>
						{handleColorTitle(title)[0]}:
						<span className="text-deep-purple-900 font-700 underline">{handleColorTitle(title)[1]}</span>
					</Typography>
				) : (
					<Typography
						variant="h4"
						className="w-full text-28 mb-14 sm:mb-0 sm:text-32"
					>
						{title}
					</Typography>
				)}
				{createButton && (
					<div className="w-full sm:w-1/3 flex justify-end items-center ">
						<Button
							variant="contained"
							onClick={() => navigate('new')}
							color="primary"
							startIcon={<FuseSvgIcon color="inherit">heroicons-outline:plus</FuseSvgIcon>}
						>
							{createButton}
						</Button>
					</div>
				)}
			</Paper>

			<Paper
				elevation={4}
				className="p-32"
			>
				{children}
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
