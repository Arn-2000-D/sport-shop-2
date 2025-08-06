import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowRight, 
  Star, 
  TrendingUp,
  Truck,
  Shield,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useApp } from '@/context/AppContext';
import heroImage from '@/assets/hero-sports.jpg';
import fitnessGear from '@/assets/fitness-gear.jpg';
import outdoorGear from '@/assets/outdoor-gear.jpg';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { getFeaturedProducts } = useApp();

  const heroSlides = [
    {
      title: "Unleash Your Athletic Potential",
      subtitle: "Premium Sports Equipment for Champions",
      description: "Discover our curated collection of professional-grade sports gear and fitness equipment.",
      image: heroImage,
      cta: "Shop Now",
      link: "/products"
    },
    {
      title: "Fitness Revolution Starts Here",
      subtitle: "Transform Your Workout Experience",
      description: "From home gyms to professional training - we have everything you need.",
      image: fitnessGear,
      cta: "Explore Fitness",
      link: "/category/fitness"
    },
    {
      title: "Adventure Awaits",
      subtitle: "Outdoor Sports & Adventure Gear",
      description: "Gear up for your next outdoor adventure with our premium equipment.",
      image: outdoorGear,
      cta: "Shop Outdoor",
      link: "/category/outdoor"
    }
  ];

  const featuredProducts = getFeaturedProducts();

  const categories = [
    { name: "Fitness Equipment", image: fitnessGear, link: "/category/fitness", count: "200+ products" },
    { name: "Outdoor Sports", image: outdoorGear, link: "/category/outdoor", count: "150+ products" },
    { name: "Team Sports", image: heroImage, link: "/category/team-sports", count: "180+ products" },
    { name: "Apparel", image: fitnessGear, link: "/category/apparel", count: "300+ products" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast", 
      content: "SportFlow has completely transformed my home gym. The quality is outstanding and shipping was lightning fast!",
      rating: 5,
      avatar: "/placeholder.svg"
    },
    {
      name: "Mike Chen",
      role: "Professional Athlete",
      content: "As a professional trainer, I trust SportFlow for all my equipment needs. Their products never disappoint.",
      rating: 5,
      avatar: "/placeholder.svg"
    },
    {
      name: "Emma Davis",
      role: "Yoga Instructor",
      content: "The yoga equipment here is top-notch. My students love the mats and props we got from SportFlow.",
      rating: 5,
      avatar: "/placeholder.svg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40 z-10" />
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl animate-fade-in">
                  <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {slide.subtitle}
                  </Badge>
                  <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to={slide.link}>
                      <Button variant="hero" size="lg" className="group">
                        {slide.cta}
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="group">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Video
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-primary' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <Button 
          variant="ghost" 
          size="icon"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-background/80 hover:bg-background"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-background/80 hover:bg-background"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our complete range of sports equipment and fitness gear
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.name} to={category.link}>
                <Card className="group overflow-hidden border-border hover:shadow-sport transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.count}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-muted-foreground">
                Handpicked favorites from our collection
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Fast & Free Shipping</h3>
                <p className="text-muted-foreground">Free shipping on all orders over $50. Get your gear fast!</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground">30-day return policy. We stand behind our products.</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Secure Payments</h3>
                <p className="text-muted-foreground">Your payment information is always safe and secure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied athletes and fitness enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full bg-muted"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Stay in the Game
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Get exclusive deals, new product launches, and sports tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border-0 text-foreground"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
