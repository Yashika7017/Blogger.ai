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
    if (userData?.prefs?.avatarUrl) return userData.prefs.avatarUrl;
    if (userData?.avatarUrl) return userData.avatarUrl;
    if (userData?.picture) return userData.picture;
    if (userData?.image) return userData.image;
    
    const findUrlInObject = (obj) => {
      if (!obj) return null;
      for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'string' && (value.includes('http') || value.includes('googleusercontent'))) {
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
    if (foundUrl) return foundUrl;
    
    const gravatarId = userData?.email || userData?.$id || userData?.id;
    if (gravatarId) {
      const emailForGravatar = userData?.email ? userData.email.toLowerCase().trim() : gravatarId;
      return `https://secure.gravatar.com/avatar/${emailForGravatar}?s=64&d=mm&r=g`;
    }
    return null;
  };

  const avatarUrl = getAvatarUrl();
  const userFirstName = userData?.name?.split(' ')[0] || '';

  const navItems = [
    { name: 'Home', slug: "/", active: true }, 
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className='py-3 shadow-md bg-[#0f172a] border-b border-slate-800 relative'>
      <Container>
        <nav className='flex items-center justify-between '>
          {/* Logo */}
          <div className='flex items-center'>
            <Link to='/'>
              <Logo width='80px' />
            </Link>
          </div>

          {/* Mobile Menu Button - Harsh's Mobile Friendly Version */}
          <button
            onClick={toggleMenu}
            className='md:hidden ml-auto inline-flex items-center justify-center p-3 rounded-md text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white min-h-[44px] touch-manipulation transition-all duration-200'
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open menu</span>
            <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex ml-auto items-center'>
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
              <li className="flex items-center gap-3 ml-4">
                <LogoutBtn />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-200 font-medium">{userFirstName}</span>
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-500 flex items-center justify-center text-white font-bold">
                      {getInitials(userData?.name)}
                    </div>
                  )}
                </div>
              </li>
            )}
          </ul>
        </nav>
      </Container>

      {/* Mobile Menu Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute left-0 right-0 top-full bg-[#0f172a] border-b border-slate-800 z-50`}>
        <div className="px-4 pt-2 pb-3 space-y-1">
          {navItems.map((item) => 
            item.active ? (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.slug)
                  setIsOpen(false)
                }}
                className='block w-full text-left px-4 py-3 text-slate-200 hover:text-white hover:bg-slate-700 rounded-md transition-all duration-200 font-medium min-h-[44px] touch-manipulation'
              >
                {item.name}
              </button>
            ) : null
          )}
          {authStatus && (
            <div className="px-4 py-2 border-t border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-slate-200">{userFirstName}</span>
                {avatarUrl && <img src={avatarUrl} className="w-8 h-8 rounded-full border border-white" />}
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