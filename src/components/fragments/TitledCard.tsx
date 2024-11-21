interface TitledCardProps {
    title: string,
    children: React.ReactNode,
    className?: string,
}

export default function TitledCard({ title, children, className }: TitledCardProps) {
    return (
        <div className={className}>
            <h1 className="text-4xl font-bold text-center">{title}</h1>
            <div className="w-full h-full flex flex-col justify-center items-center border-0 border-foreground rounded-lg">{children}</div>
        </div>
    );
}
