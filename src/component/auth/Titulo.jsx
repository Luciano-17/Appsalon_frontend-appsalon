const Titulo = ({mensaje}) => {
    return (
        <>
            <div className="flex flex-col text-center gap-6 md:gap-10">
                <h1 className="title font-bold text-6xl md:text-8xl bg-gradient-to-r from-cyan-500 via-purple-500 to-violet-800">AppSalon</h1>

                <p className="text-xl md:text-2xl">{mensaje}</p>
            </div>
        </>
    )
}

export default Titulo