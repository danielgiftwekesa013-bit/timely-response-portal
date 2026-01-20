import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Plane, TreePine, Mountain, Users, Route, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/mockData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase,
  Plane,
  TreePine,
  Mountain,
  Users,
  Route,
  Heart,
};

const ServicesSection = () => {
  return (
    <section className="trl-section bg-secondary/30">
      <div className="trl-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
            Premium Transport Solutions
          </h2>
          <p className="text-muted-foreground mt-4">
            From corporate rides to family adventures, we offer comprehensive transport services tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="trl-card trl-card-hover p-6 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  {IconComponent && <IconComponent className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />}
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                <Link to={`/book?service=${service.id}`}>
                  <Button variant="ghost" size="sm" className="gap-2 text-primary hover:text-accent hover:bg-accent/10 p-0">
                    Book Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
