import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-night-800 border-t border-night-600 mt-auto">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-primary flex items-center justify-center">
                <Star size={16} className="text-night-900 fill-night-900" />
              </div>
              <span className="font-playfair text-lg font-bold text-white">Nyota Funds Kenya</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Empowering Kenyan families through accessible, transparent, and fast grant funding.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/apply', label: 'Apply for Grant' }
              ].map(l => (
                <Link key={l.to} to={l.to} className="text-sm text-gray-400 hover:text-emerald-primary transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={14} className="text-emerald-primary" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={14} className="text-emerald-primary" />
                <span>support@nyotafunds.co.ke</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin size={14} className="text-emerald-primary" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-night-600 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2025 Nyota Funds Kenya. All rights reserved.</p>
          <div className="flex gap-5">
            <span className="text-xs text-gray-500 cursor-pointer hover:text-emerald-primary transition-colors">Privacy Policy</span>
            <span className="text-xs text-gray-500 cursor-pointer hover:text-emerald-primary transition-colors">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
