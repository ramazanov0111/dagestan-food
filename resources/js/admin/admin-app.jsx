import React from 'react';
import { createRoot } from 'react-dom/client';
import AdminApp from './AdminApp';
import '../../css/app.css';

createRoot(document.getElementById('admin-root')).render(<AdminApp />);