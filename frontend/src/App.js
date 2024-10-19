// Import dependencies
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import pages: 

// import functionName from './data/products.js
import HomePage from './pages/HomePage.js';
import TopicsPage from './pages/TopicsPage.js';
import MissionsPage from './pages/MissionsPage.js';

import EditMissionsPageTable from './pages/EditMissionsPageTable';
import AddMissionsPageTable from './pages/AddMissionsPageTable';

function App() {

  const [mission, setMissionToEdit] = useState([])

  return (
    <>
      <BrowserRouter>

          <header>
          <h1>Jenna Ligon <img src="android-chrome-192x192.png" /></h1>
          </header>

          <Navigation />

          <main>
            <section>
                <Routes> 
                    {/* Add Routes for Home, Topics, Gallery, Contact, and Staff Pages.  */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/log" element={<MissionsPage setMission={setMissionToEdit}/>} />
                    <Route path="/topics" element={<TopicsPage />} />
                 
                    {/* Use these if your schema requires LONG data input: */}
                    <Route path="/create" element={<AddMissionsPageTable />} /> 
                    <Route path="/update" element={<EditMissionsPageTable missionToEdit={mission} />} />

                </Routes>
              </section>
          </main>

          <footer>
            <p>&copy; 2024 Jenna Ligon</p>
          </footer>

      </BrowserRouter>
    </>
  );
}

export default App;