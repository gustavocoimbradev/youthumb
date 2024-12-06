type props = {
    children: React.ReactNode,
    className?: string,
}

export default function Card({children, className}:props) {
    return (
        <div className={`flex-col rounded-lg bg-white shadow-2xl w-[600px] max-w-[100%] mt-3 flex overflow-hidden p-4 ${className}`}>
            {children}
        </div>
    )
}