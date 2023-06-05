import React from "react"

export default function ItemOfList(props){
    const [data, setData] = React.useState({})

    React.useEffect(() => {setData(props.data)}, [props])

    return(
        <li className="grid id-url">
            <div className="name">
                <span className="title">{data.title}</span><span className="content">{data.id}</span>
            </div>
            <div className="descr">
                <span className="title">{data.descr}</span>
                <a className="content link" target="blank" href={data.url}>{data.url}</a>
            </div>
        </li>
    )
}