import { Search } from './components/search/Search';
import { Footer } from './components/shared/footer/Footer';
import { Header } from './components/shared/header/Header';
import { UsersList } from './components/user-list/UserList';
import './App.css';
import { useState } from 'react';

function App() {
    return (
        <div>
            <Header />
            
            <main className="main">
                <section className="card users-container">
                    <Search />

                    <UsersList
                    />
                </section>
            </main>
            
            <Footer />
        </div>
    );
}

export default App;
