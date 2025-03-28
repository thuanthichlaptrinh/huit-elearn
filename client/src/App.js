import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import FilterBook from './components/FilterBook/FilterBook';
import NotFound from './components/NotFound';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import Blog from './pages/components/Blog';
import DetailBook from './pages/components/DetailBook';
import Home from './pages/Home/';
import { store } from './redux/store';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import UploadDocument from './pages/UploadDocument/UploadDocument';
import CreateTest from './pages/CreateTest/CreateTest';

function App() {
    return (
        <Provider store={store}>
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

                    <Route
                        path="/detail"
                        element={
                            <DefaultLayout>
                                <DetailBook />
                            </DefaultLayout>
                        }
                    />

                    <Route
                        path="/blog"
                        element={
                            <DefaultLayout>
                                <Blog />
                            </DefaultLayout>
                        }
                    />

                    <Route
                        path="/upload"
                        element={
                            <DefaultLayout>
                                <UploadDocument />
                            </DefaultLayout>
                        }
                    />

                    <Route
                        path="/createtest"
                        element={
                            <DefaultLayout>
                                <CreateTest />
                            </DefaultLayout>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <DefaultLayout>
                                <LoginPage />
                            </DefaultLayout>
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <DefaultLayout>
                                <RegisterPage />
                            </DefaultLayout>
                        }
                    />

                    {/* Route cho trang 404 */}
                    <Route
                        path="*"
                        element={
                            <DefaultLayout>
                                <NotFound />
                            </DefaultLayout>
                        }
                    />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
