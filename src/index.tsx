import React from 'react';
import { createRoot } from 'react-dom/client';
import DatePicker from './components/DatePicker';

const domNode = document.getElementById('app');
const root = createRoot(domNode);
root.render(<DatePicker />);