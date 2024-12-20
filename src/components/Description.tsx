type props = {
    children: React.ReactNode
}

export default function Description({children}:props) {
    return (
        <h5 className="mt-3 text-1xl text-slate-300">
          {children}
        </h5>
    )
}