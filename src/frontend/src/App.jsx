import './index.css';
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/home/home';
import PerfilPage from './pages/profile/profile';
import CommentCard from './components/comments_card/comments_card';
import CompetitionsPage from './pages/competitions/competitions';
import RankPage from './pages/rank/rank';
import TaggingPage from "./components/page_add_tag/page_add_tag";
import RewardsPage from './pages/rewards/rewards';

import Header from './components/header/header';
import BottomBar from './components/bottom_bar/bottom_bar';


function App() {
  return (
    <div>
      <Header/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/search' element={<div/>}/>
        <Route path='/ranking' element={<RankPage/>}/>
        <Route path='/ranking-competitions' element={<div/>}/>
        <Route path='/rewards' element={<RewardsPage/>}/>
        <Route path='/comments' element={<CommentCard/>}/>
        <Route path='/competitions' element={<CompetitionsPage/>} />
        <Route path='/profile' element={<PerfilPage/>} />
        <Route path='/tagging-page/:document_id' element={<TaggingPage/>} />
      </Routes>
      <BottomBar/>
    </BrowserRouter>
    </div>
  );
}

export default App;
