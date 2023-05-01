import React from 'react';
import { createRoot } from 'react-dom/client';
import Chat from './components/Chat';

const container = document.getElementById('index');
const root = createRoot(container);
root.render(<Chat />);
