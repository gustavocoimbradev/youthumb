
type props = {
    children: React.ReactNode,
    hidden?: boolean
}

export default function Form({children, hidden}:props) {
    const hiddenBoolean = typeof hidden === 'undefined' ? '' : hidden;
    const hiddenClass = hiddenBoolean ? 'hidden' : '';
    return (
        <form className={`rounded-lg bg-white shadow-2xl w-[600px] max-w-[100%] mt-4 flex overflow-hidden ${hiddenClass}`}>
            {children}
        </form>
    )
}