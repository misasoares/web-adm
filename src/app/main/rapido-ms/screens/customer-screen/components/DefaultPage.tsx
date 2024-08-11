interface DefaultPageProps {
	children: React.ReactNode;
}

export default function DefaultPageRapidoMsCustomer({ children }: DefaultPageProps) {
	return <div className="flex flex-col items-center p-10">{children}</div>;
}
