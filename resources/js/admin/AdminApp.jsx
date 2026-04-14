import React, { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import Categories from './pages/Categories';
import Orders from './pages/Orders';

export default function AdminApp() {
    const [page, setPage] = useState('dashboard');
    const [editProduct, setEditProduct] = useState(null);

    const navigate = (p, data = null) => {
        setPage(p);
        if (data) setEditProduct(data);
    };

    const renderPage = () => {
        switch (page) {
            case 'dashboard':
                return <Dashboard />;
            case 'products':
                return <Products onEdit={(p) => navigate('product-form', p)} onAdd={() => navigate('product-form')} />;
            case 'product-form':
                return <ProductForm product={editProduct} onBack={() => { setEditProduct(null); navigate('products'); }} />;
            case 'categories':
                return <Categories />;
            case 'orders':
                return <Orders />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <AdminLayout currentPage={page} onNavigate={navigate}>
            {renderPage()}
        </AdminLayout>
    );
}