import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { contactInfo } from '@/lib/mockData';
import logo from '@/assets/trl-logo.png';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="trl-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="space-y-4">
            <img src={logo} alt="TRL Logo" className="h-20 w-auto bg-white rounded-lg p-2" />
            <p className="text-primary-foreground/80 text-sm">
              We stay productive, not busy. Let us handle your transport needs while you focus on what matters most.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-accent">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Book a Ride
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Track Your Ride
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-accent">Our Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Corporate Rides</li>
              <li>Airport Transfers</li>
              <li>Game Drive</li>
              <li>Excursion & Road Trips</li>
              <li>Team Building</li>
              <li>Family Drive</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-accent">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${contactInfo.calls}`}
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {contactInfo.calls}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  {contactInfo.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Timely Response Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
