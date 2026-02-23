import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../container/Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-[#0f172a] border-t border-slate-800">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          
          {/* Logo and Copyright Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="120px" />
              </div>
              <div>
                <p className="text-sm text-slate-400">
                  &copy; Copyright 2026. All Rights Reserved by Yashika Varshney.
                </p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="tracking-px mb-9 text-xs font-bold uppercase text-indigo-400">
              Company
            </h3>
            <ul>
              <li className="mb-4">
                <Link className="text-base font-medium text-slate-200 hover:text-white transition-all duration-200" to="/">
                  Features
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-base font-medium text-slate-200 hover:text-white transition-all duration-200" to="/">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="tracking-px mb-9 text-xs font-bold uppercase text-indigo-400">
              Support
            </h3>
            <ul>
              <li className="mb-4">
                <Link className="text-base font-medium text-slate-200 hover:text-white transition-all duration-200" to="/">
                  Account
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-base font-medium text-slate-200 hover:text-white transition-all duration-200" to="/">
                  Help
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-base font-medium text-slate-200 hover:text-white transition-all duration-200" to="/">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legals Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="tracking-px mb-9 text-xs font-bold uppercase text-indigo-400">
              Legals
            </h3>
            <ul>
              <li className="mb-4">
                <Link className="text-base font-medium text-slate-200 hover:text-white transition-all duration-200" to="/">
                  Terms & Conditions
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-base font-medium text-slate-200 hover:text-white transition-all duration-200" to="/">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Footer