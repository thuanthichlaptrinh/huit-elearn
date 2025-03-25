import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import FilterBook from './components/FilterBook/FilterBook';

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <DefaultLayout>
                            <Home />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/filter"
                    element={
                        <DefaultLayout>
                            <FilterBook />
                        </DefaultLayout>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
