import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../componets/Home"
import CodeBlock from "../componets/CodeBlock"

export default function AppRouter() {
    return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home/>}/>
                <Route path="/CodeBlock/:id"  element ={<CodeBlock/>}/>
                <Route path="*" element={ <Home/>}/>
          </Routes>
        </BrowserRouter>
      </>
    );
  }