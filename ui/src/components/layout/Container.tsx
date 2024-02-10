
export default function Container({children} : {children : React.ReactNode}) {
    return <div className="mt-6 w-full md:w-[90%] mx-auto">
        {children}
    </div>
}