import { Typography, Paper } from '@mui/material';

interface DefaultPageProps {
	title: string;
	content: JSX.Element;
	secondaryContent?: JSX.Element;
}

export default function DefaultPage({ title, content, secondaryContent }: DefaultPageProps) {
	return (
		<div className="p-32">
			<Paper
				elevation={4}
				className="p-32 mb-32"
			>
				<Typography variant="h4">{title}</Typography>
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
