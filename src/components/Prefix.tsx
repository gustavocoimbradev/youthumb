type props = {
    children: React.ReactNode,
}

export default function Prefix({children}:props) {
    return (
        <span className="transition-all bg-slate-500 text-white py-4 px-4 text-nowrap">{children}</span>
    )
}