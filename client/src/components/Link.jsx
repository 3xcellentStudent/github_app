import {NavLink} from 'react-router-dom'
import SVGArrow from './SVG/SVGArrow'

export default function Link(props){
    return(
        <NavLink className="auth-link" to={props.path}>
            {props.text}
            <SVGArrow/>
        </NavLink>
    )
}