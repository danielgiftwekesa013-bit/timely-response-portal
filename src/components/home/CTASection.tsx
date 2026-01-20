import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactInfo } from '@/lib/mockData';

const CTASection = () => {
  return (
    <section className="trl-section bg-accent">
      <div className="trl-container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
            Ready to Hit the Road?
          </h2>
          <p className="text-accent-foreground/80 text-lg mb-8">
            Book your ride today and experience the TRL difference. Professional service, 
            comfortable vehicles, and punctual drivers await you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                Book Your Ride Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href={contactInfo.whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent font-semibold">
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
