import '../css/styles.css'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>      
            <div className="Links">

            <button>
                <Link to="/login" className="link">
                Logga in på ett befintligt konto
                </Link>
            </button>

            </div>
            <div>

            <button>
                <Link to="/signup" className="link">
                Registrera ett nytt konto
                </Link>
            </button>
    </div>
</div>
  )
}

export default Home