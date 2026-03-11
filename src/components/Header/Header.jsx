import React, { useState } from 'react'

import {Container, Logo, LogoutBtn} from '../index'

import { Link } from 'react-router-dom'

import {useSelector} from 'react-redux'

import { useNavigate } from 'react-router-dom'



function Header() {

  const [isOpen, setIsOpen] = useState(false)

  const authStatus = useSelector((state) => state.auth.status)

  const navigate = useNavigate()



  const navItems = [

    {

      name: 'Home',

      slug: "/",

      active: true

    }, 

    {

      name: "Login",

      slug: "/login",

      active: !authStatus,

  },

  {

    name: "Signup",

    slug: "/signup",

    active: !authStatus,

  },

  {

    name: "All Posts",

    slug: "/all-posts",

    active: authStatus,

  },

  {

    name: "Add Post",

    slug: "/add-post",

    active: authStatus,

  },

  ]



  const toggleMenu = () => {

    setIsOpen(!isOpen)

  }



  return (

    <header className='py-1 shadow-md bg-[#0f172a] border-b border-slate-800 relative'>

      <Container>

        <nav className='flex items-center justify-between'>

          <div className='mr-4'>

            <Link to='/'>

              <Logo width='80px' />

            </Link>

          </div>

          

          {/* Desktop Navigation */}

          <ul className='hidden md:flex ml-auto'>

            {navItems.map((item) => 

            item.active ? (

              <li key={item.name}>

                <button

                onClick={() => navigate(item.slug)}

                className='inline-block px-4 py-1 text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200 font-medium'

                >{item.name}</button>

              </li>

            ) : null

            )}

            {authStatus && (

              <li>

                <LogoutBtn />

              </li>

            )}

          </ul>



          {/* Mobile Menu Button */}

          <button

            onClick={toggleMenu}

            className='md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'

            aria-expanded="false"

          >

            <span className="sr-only">Open menu</span>

            {/* Hamburger Icon */}

            <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />

            </svg>

            {/* Close Icon */}

            <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />

            </svg>

          </button>

        </nav>

      </Container>



      {/* Mobile Menu Panel - Outside Container for true left positioning */}

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute left-0 right-0 top-full bg-[#0f172a] border-b border-slate-800 z-50`}>

        <div className="px-4 pt-2 pb-3 space-y-1 text-left">

          {navItems.map((item) => 

          item.active ? (

            <button

              key={item.name}

              onClick={() => {

                navigate(item.slug)

                setIsOpen(false)

              }}

              className='block w-full text-left px-3 py-2 text-slate-200 hover:text-white hover:bg-slate-700 rounded-md transition-all duration-200 font-medium text-left'

            >

              {item.name}

            </button>

          ) : null

          )}

          {authStatus && (

            <div className="px-3 py-2 text-left">

              <LogoutBtn />

            </div>

          )}

        </div>

      </div>

    </header>

  )

}



export default Header