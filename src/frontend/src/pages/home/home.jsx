import React from "react";
import ArchiveCard from "../../components/archive_card/archive_card";
import BottomBar from "../../components/bottom_bar/bottom_bar";
import Header from "../../components/header/header";
import Tabs from "../../components/tabs/tabs";

const HomePage = () => {
    return( 
        <main className="w-full bg-bage-bg">
            <Header/>
            <Tabs tabs = {["Classificação", "Descrição"]}/>
            <BottomBar/>
        </main>
    )
};

export default HomePage;