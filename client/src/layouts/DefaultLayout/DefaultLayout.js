import React from 'react';
import Header from '../../pages/components/Header/Header';
import Footer from '../../pages/components/Footer/Footer';

function DefaultLayout({ children }) {
    return (
        <div className="wraper">
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
