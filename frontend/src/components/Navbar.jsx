import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Star } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/apply', label: 'Apply Now', cta: true }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-night-900/95 backdrop-blur-md border-b border-night-600' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-primary flex items-center justify-center">
            <Star size={16} className="text-night-900 fill-night-900" />
          </div>
          <span className="font-playfair text-lg font-bold text-white">Nyota Funds</span>
          <span className="text-emerald-primary text-xs font-medium hidden sm:block">Kenya</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => l.cta ? (
            <Link key={l.to} to={l.to} className="btn-primary text-sm px-5 py-2">{l.label}</Link>
          ) : (
            <Link key={l.to} to={l.to} className={`text-sm font-medium transition-colors ${location.pathname === l.to ? 'text-emerald-primary' : 'text-gray-400 hover:text-white'}`}>{l.label}</Link>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-1">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-night-800 border-t border-night-600 px-5 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`text-sm font-medium py-2 ${l.cta ? 'text-emerald-primary font-semibold' : location.pathname === l.to ? 'text-emerald-primary' : 'text-gray-300'}`}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
