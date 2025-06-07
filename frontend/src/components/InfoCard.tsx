import type { CardProps } from "../assets/data/CardInterface";

export default function InfoCard(props : CardProps){

    // const {id, title, description} = props; These props will be use in future.
    const {id, title, description} = props;

    return (
        <div className="flex flex-col p-5 m-4 justify-around items-baseline bg-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="font-bold text-black text-2xl">{title}</div>
            <div className="text-gray-500 text-xl">{description}</div>
        </div>
    )   
}