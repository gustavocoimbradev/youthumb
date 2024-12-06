type props = {
    children: React.ReactNode,
    className?: string
}

export default function Row({children, className}:props) {
    return (
        <div className={`flex flex-row w-full ${className}`}>{children}</div>
    )
}