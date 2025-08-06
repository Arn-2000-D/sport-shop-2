import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const categories = [
    { 
      name: 'Fitness', 
      subcategories: ['Weights', 'Cardio', 'Yoga', 'Accessories'] 
    },
    { 
      name: 'Outdoor Sports', 
      subcategories: ['Hiking', 'Cycling', 'Camping', 'Water Sports'] 
    },
    { 
      name: 'Team Sports', 
      subcategories: ['Football', 'Basketball', 'Soccer', 'Baseball'] 
    },
    { 
      name: 'Apparel', 
      subcategories: ['Men', 'Women', 'Kids', 'Footwear'] 
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-border/50">
          <div className="hidden md:flex items-center gap-4 text-muted-foreground">
            <span>Free shipping on orders over $50</span>
            <span>•</span>
            <span>30-day returns</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-8 w-8"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
              Sign In
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link to="/signup" className="text-muted-foreground hover:text-primary transition-colors">
              Register
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SF</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                SportFlow
              </h1>
              <p className="text-xs text-muted-foreground">Your Sports Store</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for sports equipment, apparel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-12 bg-muted/50 border-border focus:border-primary"
              />
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md mt-1 shadow-lg z-10">
                  <div className="p-2 space-y-1">
                    <div className="px-3 py-2 text-sm text-muted-foreground">Suggestions</div>
                    <div className="px-3 py-2 hover:bg-muted rounded text-sm cursor-pointer">Yoga mats</div>
                    <div className="px-3 py-2 hover:bg-muted rounded text-sm cursor-pointer">Running shoes</div>
                    <div className="px-3 py-2 hover:bg-muted rounded text-sm cursor-pointer">Dumbbells</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-accent">
                3
              </Badge>
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-accent">
                  2
                </Badge>
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:block py-4 border-t border-border/50">
          <div className="flex items-center justify-center gap-8">
            {categories.map((category) => (
              <div key={category.name} className="relative group">
                <Link 
                  to={`/category/${category.name.toLowerCase()}`}
                  className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium"
                >
                  {category.name}
                  <ChevronDown className="h-4 w-4" />
                </Link>
                
                {/* Mega Menu */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-background border border-border rounded-lg shadow-lg p-6 w-64">
                    <h3 className="font-semibold text-foreground mb-3">{category.name}</h3>
                    <div className="grid gap-2">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          to={`/category/${category.name.toLowerCase()}/${sub.toLowerCase()}`}
                          className="text-muted-foreground hover:text-primary transition-colors py-1"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Link to="/sale" className="text-accent font-semibold hover:text-accent-light transition-colors">
              Sale
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border/50 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 pr-4 bg-muted/50"
              />
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.name} className="space-y-1">
                  <Link 
                    to={`/category/${category.name.toLowerCase()}`}
                    className="block font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    {category.name}
                  </Link>
                  <div className="pl-4 space-y-1">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        to={`/category/${category.name.toLowerCase()}/${sub.toLowerCase()}`}
                        className="block text-muted-foreground hover:text-primary transition-colors py-1"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link to="/sale" className="block text-accent font-semibold py-2">
                Sale
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;