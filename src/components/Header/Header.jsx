import React, { useState } from 'react'

import {Container, Logo, LogoutBtn} from '../index'

import { Link } from 'react-router-dom'

import {useSelector} from 'react-redux'

import { useNavigate } from 'react-router-dom'

// Helper function to get user initials
const getInitials = (name) => {
  if (!name) return 'U';
  const words = name.trim().split(' ');
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
};

function Header() {

  const [isOpen, setIsOpen] = useState(false)

  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)

  const navigate = useNavigate()

  // Get user avatar URL with fallback
  const getAvatarUrl = () => {
    // Debug: Log user data to see structure
    console.log('User data structure:', userData);
    
    // Try different possible paths for avatar URL from Appwrite OAuth
    if (userData?.prefs?.avatarUrl) {
      console.log('Found avatar in prefs.avatarUrl');
      return userData.prefs.avatarUrl;
    }
    if (userData?.avatarUrl) {
      console.log('Found avatar in avatarUrl');
      return userData.avatarUrl;
    }
    if (userData?.picture) {
      console.log('Found avatar in picture');
      return userData.picture;
    }
    if (userData?.image) {
      console.log('Found avatar in image');
      return userData.image;
    }
    
    // Check for OAuth provider specific fields
    if (userData?.oauth?.avatar) {
      console.log('Found avatar in oauth.avatar');
      return userData.oauth.avatar;
    }
    if (userData?.google?.picture) {
      console.log('Found avatar in google.picture');
      return userData.google.picture;
    }
    if (userData?.provider?.avatar) {
      console.log('Found avatar in provider.avatar');
      return userData.provider.avatar;
    }
    
    // Check for any URL-like string in the user data
    const findUrlInObject = (obj) => {
      if (!obj) return null;
      for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'string' && (value.includes('http') || value.includes('googleusercontent'))) {
          console.log(`Found URL in field ${key}:`, value);
          return value;
        }
        if (typeof value === 'object' && value !== null) {
          const url = findUrlInObject(value);
          if (url) return url;
        }
      }
      return null;
    };
    
    const foundUrl = findUrlInObject(userData);
    if (foundUrl) {
      console.log('Found URL in user data:', foundUrl);
      return foundUrl;
    }
    
    // Fallback to Gravatar using email or ID
    const gravatarId = userData?.email || userData?.$id || userData?.id;
    if (gravatarId) {
      console.log('Using Gravatar for:', gravatarId);
      // Hash the email for Gravatar if it's an email
      const emailForGravatar = userData?.email ? userData.email.toLowerCase().trim() : gravatarId;
      return `https://secure.gravatar.com/avatar/${emailForGravatar}?s=64&d=mm&r=g`;
    }
    
    console.log('No avatar found, using initials');
    return null;
  };

  const avatarUrl = getAvatarUrl();
  const userFirstName = userData?.name?.split(' ')[0] || '';

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

    <header className='py-1 shadow-md bg-[#0f172a] border-b border-slate-800 relative pb-12'>

      <Container>

        <nav className='flex items-center justify-between '>

          <div className='mr-4 relative'>

            <Link to='/'>
              <Logo width='80px' />
            </Link>

            {/* Mobile Menu Button - Below Logo on Left */}

            <button
              onClick={toggleMenu}

              className='md:hidden absolute -bottom-6 left-0 inline-flex items-center justify-center p-2 rounded-md text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'

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

          </div>

          {/* Desktop Navigation */}

          <ul className='hidden md:flex ml-auto '>

            {navItems.map((item) => 

            item.active ? (

              <li key={item.name}>

                <button

                onClick={() => navigate(item.slug)}

                className='inline-block px-6 py-1 text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200 font-medium'

                >{item.name}</button>

              </li>

            ) : null

            )}

            {authStatus && (
              <li className="flex items-center gap-3">
                <LogoutBtn />
                {/* User Avatar and Name */}
                <div className="flex items-center gap-2">
                  {/* User Name */}
                  <span className="text-sm text-slate-200 font-medium">
                    {userFirstName}
                  </span>
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover transition-transform duration-200 hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  {/* Fallback Initials Circle */}
                  <div
                    className={`w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl transition-transform duration-200 hover:scale-110 ${avatarUrl ? 'hidden' : 'flex'}`}
                    style={{
                      background: 'linear-gradient(to right, rgb(99 102 241), rgb(139 92 246), rgb(147 51 234))'
                    }}
                    title={userData?.name}
                  >
                    {getInitials(userData?.name)}
                  </div>
                </div>
              </li>
            )}

          </ul>

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
              {/* User Avatar and Name for Mobile */}
              <div className="flex items-center gap-3 mb-3">
                {/* User Name */}
                <span className="text-sm text-slate-200 font-medium">
                  {userFirstName}
                </span>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover transition-transform duration-200 hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                {/* Fallback Initials Circle */}
                <div
                  className={`w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl transition-transform duration-200 hover:scale-110 ${avatarUrl ? 'hidden' : 'flex'}`}
                  style={{
                    background: 'linear-gradient(to right, rgb(99 102 241), rgb(139 92 246), rgb(147 51 234))'
                  }}
                  title={userData?.name}
                >
                  {getInitials(userData?.name)}
                </div>
              </div>
              <LogoutBtn />
            </div>
          )}
        </div>
      </div>
    </header>

  )

}

export default Header