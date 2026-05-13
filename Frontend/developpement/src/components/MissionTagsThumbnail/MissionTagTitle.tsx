interface propsInterface {title : string}

export default function MissionTagTitle({title} : propsInterface){
    return(
        <h1>{title}</h1>
    )
}