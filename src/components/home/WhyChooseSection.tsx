import { Shield, Clock, Award, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'All our drivers are vetted professionals with clean records. Your safety is our priority.',
  },
  {
    icon: Clock,
    title: 'Always On Time',
    description: 'We value your time. Our drivers arrive punctually, every single time.',
  },
  {
    icon: Award,
    title: 'Premium Fleet',
    description: 'Travel in comfort with our well-maintained, modern vehicle fleet.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer Focused',
    description: 'Dedicated support team ready to assist you 24/7 for any inquiries.',
  },
];

const WhyChooseSection = () => {
  return (
    <section className="trl-section">
      <div className="trl-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Your Trusted Transport Partner in Kenya
            </h2>
            <p className="text-muted-foreground mb-8">
              Since 2009, Timely Response Logistics has been the preferred choice for individuals and businesses seeking reliable, professional transport services across Kenya.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Card */}
          <div className="relative">
            <div className="trl-gradient-bg rounded-2xl p-8 md:p-12 text-white">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Ready to Experience Premium Transport?
              </h3>
              <p className="text-white/80 mb-8">
                Join thousands of satisfied customers who trust TRL for their transport needs.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <div className="text-3xl font-bold text-accent">98%</div>
                  <div className="text-sm text-white/70">Customer Satisfaction</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <div className="text-3xl font-bold text-accent">10K+</div>
                  <div className="text-sm text-white/70">Completed Trips</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
