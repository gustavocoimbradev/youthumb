type props = {
    children: React.ReactNode
}

export default function Main({children}:props) {
    return (
        <main className="flex flex-col gap-4 py-20 px-6 min-h-screen items-center justify-center bg-slate-100">{children}</main>
    )
}