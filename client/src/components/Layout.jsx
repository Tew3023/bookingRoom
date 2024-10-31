// src/components/Layout.js
import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';

export default function Layout({ children, showNavFooter = true }) {
  return (
    <div className="flex flex-col min-h-screen">
      {showNavFooter && (
        <>
          <header className="sticky top-0 z-[100]">
            <Nav />
          </header>
        </>
      )}
      <main className="flex-grow"><Outlet /></main>
      {showNavFooter && <Footer />}
    </div>
  );
}
