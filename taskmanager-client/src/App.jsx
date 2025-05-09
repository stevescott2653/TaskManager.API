import React from 'react';
import './App.css';

function App() {
    return (
        <div className="app-container">
            {/* Navigation Bar */}
            <header className="navbar">
                <div className="logo">TaskManager</div>
                <nav>
                    <ul className="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <section id="home" className="section">
                    <h1>Welcome to TaskManager</h1>
                    <p>Organize your tasks efficiently and boost your productivity.</p>
                </section>

                <section id="about" className="section">
                    <h2>About Us</h2>
                    <p>TaskManager is a simple yet powerful tool to manage your daily tasks.</p>
                </section>

                <section id="features" className="section">
                    <h2>Features</h2>
                    <ul>
                        <li>Create and manage tasks</li>
                        <li>Set deadlines and reminders</li>
                        <li>Track your progress</li>
                    </ul>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2025 TaskManager. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
