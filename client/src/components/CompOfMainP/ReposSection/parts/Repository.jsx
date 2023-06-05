import React from "react";

import SVGGit from '../../../SVG/SVGGit'
import SVGEye from '../../../SVG/SVGEye'
import SVGStar from '../../../SVG/SVGStar'

export default function Repository(props){

    const [dataS, setDataS] = React.useState('')

    let lock = true
    React.useEffect(() => {
        if(props.data && lock){
            lock = false
            setDataS(props.data)
        }
    }, [props])

    return(
        <div className="repo-container">
            <div className="header">
                <a href={dataS.html_url} target="blank" className="repo-name">{dataS.full_name}</a>
                <div className="d-f-50">
                    <span>language: {dataS.language}</span>
                    <span className="d-f">
                        <div className="svg-container">
                            <SVGEye/>
                        </div>
                        {dataS.watchers}
                    </span>
                    {/* <span> {dataS.watchers}</span> */}
                </div>
            </div>
            <div className="other-info">
                <span className="d-f">
                    <div className="svg-container">
                        <SVGGit/>
                    </div>
                    {dataS.default_branch}
                </span>
                <p><a className="link" href={dataS.forks_url}>{dataS.forks} Forks</a></p>
                <p><a className="link" href={dataS.issues_url}>{dataS.open_issues} Issues</a></p>
                <div className="d-f">
                    <div className="svg-container">
                        <SVGStar/>
                    </div>
                    <a className="link" href={dataS.stargazers_url}>
                        {dataS.stargazers_count} Star
                    </a>
                </div>
            </div>
        </div>
    )
}