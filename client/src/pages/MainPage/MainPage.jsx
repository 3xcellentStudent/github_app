import React from "react";

import Header from '../../components/Header/Header'
import TokenSection from '../../components/CompOfMainP/TokenSection/TokenSection'
import InfoSection from '../../components/CompOfMainP/InfoSection/InfoSection'
import ReposSection from '../../components/CompOfMainP/ReposSection/ReposSection'

import './MainPage.scss'

export default function MainPage(){

    return(
        <main className="container">
            <Header/>
            <TokenSection/>
            <InfoSection/>
            <ReposSection/>
        </main>
    )
}