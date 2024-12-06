type props = {
    children: React.ReactNode
}

export default function Title({children}:props) {

    return (
        <h1 className="text-4xl font-bold">
          <span className="text-slate-600">{children}</span>
        </h1>
    );
}