

export default function Input({onChange, placeHolder}: {onChange: () => void, placeHolder: string}){
    return (
        <input type="text" onChange={onChange} placeholder={placeHolder} className="rounded p-2 w-[300px] border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 mt-2"/>

    )
}