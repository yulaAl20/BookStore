import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return(<div>
      <header>
        <h1>Bookstore</h1>
      </header>
      <main>
        <p>Welcome to the Bookstore App!</p>
        {/* Future: Add components like BookList, Cart, etc. */}
      </main>
      <footer>
        <small>&copy; 2025 Bookstore Inc.</small>
      </footer>
    </div>
  );
}
export default App
