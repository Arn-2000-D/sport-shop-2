import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Zap, Percent } from 'lucide-react';

const Sale = () => {
  const { getSaleProducts } = useApp();
  const saleProducts = getSaleProducts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-accent text-accent-foreground mb-4 text-lg px-6 py-2">
              <Percent className="h-5 w-5 mr-2" />
              MEGA SALE
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              UP TO 50% OFF
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Limited time offers on premium sports equipment
            </p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              <span>Sale ends in: 2 days 14 hours 23 minutes</span>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Sale Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">50%</div>
              <div className="text-muted-foreground">Maximum Discount</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-accent mb-2">{saleProducts.length}</div>
              <div className="text-muted-foreground">Items on Sale</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-secondary mb-2">2</div>
              <div className="text-muted-foreground">Days Left</div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Sale Items */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="h-8 w-8 text-accent" />
            <h2 className="text-3xl font-bold text-foreground">Flash Deals</h2>
            <Badge className="bg-accent text-accent-foreground">
              Limited Time
            </Badge>
          </div>
          
          {saleProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {saleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  className="border-accent/20 hover:border-accent/40"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Zap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No sale items available
              </h3>
              <p className="text-muted-foreground">
                Check back soon for amazing deals!
              </p>
            </div>
          )}
        </section>

        {/* Sale Categories */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Fitness Equipment', discount: '30-45%', image: '/src/assets/fitness-gear.jpg' },
              { name: 'Outdoor Gear', discount: '25-40%', image: '/src/assets/outdoor-gear.jpg' },
              { name: 'Team Sports', discount: '20-35%', image: '/src/assets/hero-sports.jpg' },
              { name: 'Apparel', discount: '15-50%', image: '/src/assets/fitness-gear.jpg' }
            ].map((category) => (
              <Card key={category.name} className="group cursor-pointer overflow-hidden hover:shadow-sport transition-all duration-300">
                <div className="relative">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                    <Badge className="bg-accent text-accent-foreground">
                      {category.discount} OFF
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sale;