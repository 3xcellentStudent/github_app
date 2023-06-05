import React from "react";
import {useSelector} from 'react-redux'

import CallDatabase from '../../../Services/NetworkService'

import Repository from "./parts/Repository";
import './ReposSection.scss'

export default function InfoSection(){

   const GitDataS = useSelector(state => state.GitDataS.data)

   const [repositories, setRepositories] = React.useState([])

   let lock = true
   React.useEffect(() => {
      if(GitDataS.repos_url && lock){
         lock = false
         getRepos(GitDataS.repos_url)
      } 
   }, [GitDataS])

   async function getRepos(url){
      const response = await CallDatabase.getAnything(url)
      setRepositories(response)
   }

   return(
      <section className="main repos">
         <div className="window">
            {repositories.map((item, idx) => <Repository key={idx} data={item} />)}
         </div>
      </section>
   )
}