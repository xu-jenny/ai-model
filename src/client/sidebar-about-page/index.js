/* eslint-disable prettier/prettier */
import React from 'react';
import { createRoot } from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home'

const container = document.getElementById('index');
const root = createRoot(container);


// const App = () => {
//     return (
//         <BrowserRouter>
//             <Navigate to="/" />
//             <Routes>
//                 <Route exact path="/" element={<Chat />} />
//                 <Route exact path="/sales" element={<Sales />} />
//             </Routes>
//         </BrowserRouter>
//         // <Chat />
//     );
// };

root.render(<Home />);

