
import {Card} from "./Card"

export default function Footer(){

    return (
        <div className="flex p-2 max-w-full">

            <Card title="First Tweet" type="twitter" link="https://x.com/BirAaditya48234/status/1878781570326446342"/>
            <Card title="On Top" type="youtube" link="https://youtube.com/embed/aFWDOFg7X2A?si=YcDcgxETxogLIG4j"/>
            <Card title="Winning Speech" type="youtube" link="https://www.youtube.com/watch?v=vsWxs1tuwDk&list=RDwBw6Leb5F2U&index=4"/>

        </div>
        
    )
}