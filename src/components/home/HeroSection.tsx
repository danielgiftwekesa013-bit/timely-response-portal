import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="TRL Fleet"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="trl-container relative z-10">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
            <MapPin className="h-4 w-4" />
            Serving Nairobi & Beyond Since 2009
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
            We Stay Productive,{' '}
            <span className="text-accent">Not Busy</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-xl animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            Let us handle your transport needs while you concentrate on your core business. 
            Premium rides for corporate, leisure, and family travel across Kenya.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/book">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8 py-6">
                Book a Ride
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="tel:0724210330">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 py-6">
                <Phone className="h-5 w-5" />
                Call Now
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">15+</div>
              <div className="text-white/70 text-sm">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">5K+</div>
              <div className="text-white/70 text-sm">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">24/7</div>
              <div className="text-white/70 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
