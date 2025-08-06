import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  CreditCard,
  Truck,
  Shield,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border">
      {/* Trust Badges */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Free Shipping</h3>
                <p className="text-muted-foreground text-sm">On orders over $50</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">30-Day Returns</h3>
                <p className="text-muted-foreground text-sm">Easy return policy</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Secure Payment</h3>
                <p className="text-muted-foreground text-sm">100% secure transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">SF</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">
                    SportFlow
                  </h2>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your trusted partner for premium sports equipment and fitness gear. 
                Empowering athletes of all levels to achieve their goals.
              </p>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Stay Updated</h3>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter your email"
                  className="flex-1 bg-background"
                />
                <Button variant="secondary" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Get exclusive deals and latest sports news
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Quick Links</h3>
            <div className="space-y-3">
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/blog" className="block text-muted-foreground hover:text-primary transition-colors">
                Sports Blog
              </Link>
              <Link to="/careers" className="block text-muted-foreground hover:text-primary transition-colors">
                Careers
              </Link>
              <Link to="/affiliate" className="block text-muted-foreground hover:text-primary transition-colors">
                Affiliate Program
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Customer Service</h3>
            <div className="space-y-3">
              <Link to="/help" className="block text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </Link>
              <Link to="/shipping" className="block text-muted-foreground hover:text-primary transition-colors">
                Shipping Info
              </Link>
              <Link to="/returns" className="block text-muted-foreground hover:text-primary transition-colors">
                Returns & Exchanges
              </Link>
              <Link to="/size-guide" className="block text-muted-foreground hover:text-primary transition-colors">
                Size Guide
              </Link>
              <Link to="/track-order" className="block text-muted-foreground hover:text-primary transition-colors">
                Track Your Order
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  123 Sports Avenue<br />
                  Fitness City, FC 12345
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-SPORT</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">hello@sportflow.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-medium text-foreground mb-3">Follow Us</h4>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} SportFlow. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">We accept:</span>
            <div className="flex gap-1">
              <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">
                V
              </div>
              <div className="w-8 h-5 bg-gradient-to-r from-orange-600 to-orange-400 rounded text-white text-xs flex items-center justify-center font-bold">
                M
              </div>
              <div className="w-8 h-5 bg-gradient-to-r from-blue-700 to-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                A
              </div>
              <div className="w-8 h-5 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded text-white text-xs flex items-center justify-center font-bold">
                P
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;