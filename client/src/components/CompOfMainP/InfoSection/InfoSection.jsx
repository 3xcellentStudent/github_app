import React from "react";
import {useDispatch, useSelector} from 'react-redux'

import {setData} from '../../../store/slices/GitDataSlice'

import CallDatabase from '../../../Services/NetworkService'
import ItemOfList from './patrs/ItemOfList'

import './InfoSection.scss'

export default function InfoSection(){

   const dispatch = useDispatch()

   const GitTokenS = useSelector(state => state.GitTokenS.token)
   const GitDataS = useSelector(state => state.GitDataS.data)

   const [data, setDataState] = React.useState({})

   React.useEffect(() => {
      if(GitTokenS) getGitUser()
   }, [GitTokenS])

   async function getGitUser(){
      const response = await CallDatabase.postToDB('get-git_user', {gitToken: GitTokenS})
      if(response.status === 200){
         dispatch(setData(response.data))
         setDataState(response.data)
      }
   }

   return(
      <section className="main info">
         <ul className="container-grid">
            <ItemOfList data={{id: data.id, url: data.url, title: 'ID:', descr: 'URL:'}} />
            <ItemOfList data={{id: data.followers, url: data.followers_url, title: 'Followers:', descr: 'URL:'}} />
            <ItemOfList data={{id: data.following, title: 'Following:', descr: 'URL:',
            url: `https://api.github.com/users/${data.login}/following`}} />
            <ItemOfList data={{id: data.public_repos, url: data.repos_url, title: 'Repositories:', descr: 'URL:'}} />
         </ul>
      </section>
   )
}