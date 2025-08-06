import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Filter, 
  Grid3X3, 
  List, 
  Search,
  SlidersHorizontal,
  Star
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    {
      id: "1",
      name: "Professional Yoga Mat - Extra Thick",
      price: 49.99,
      originalPrice: 69.99,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 324,
      category: "Yoga",
      isSale: true,
      discount: 28
    },
    {
      id: "2",
      name: "Adjustable Dumbbell Set - 50lbs",
      price: 199.99,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 156,
      category: "Weights",
      isNew: true
    },
    {
      id: "3",
      name: "Running Shoes - Marathon Pro",
      price: 129.99,
      originalPrice: 159.99,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 892,
      category: "Footwear",
      isSale: true,
      discount: 19
    },
    {
      id: "4",
      name: "Resistance Band Set - Complete Kit",
      price: 34.99,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 243,
      category: "Accessories",
      isNew: true
    },
    {
      id: "5",
      name: "Premium Exercise Bike",
      price: 599.99,
      originalPrice: 799.99,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 128,
      category: "Cardio",
      isSale: true,
      discount: 25
    },
    {
      id: "6",
      name: "Boxing Gloves - Pro Fighter",
      price: 89.99,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 267,
      category: "Boxing"
    }
  ];

  const categories = [
    { name: "Fitness Equipment", count: 45 },
    { name: "Cardio", count: 23 },
    { name: "Weights", count: 31 },
    { name: "Yoga", count: 18 },
    { name: "Accessories", count: 56 },
    { name: "Footwear", count: 34 },
    { name: "Apparel", count: 78 }
  ];

  const brands = [
    { name: "SportFlow Pro", count: 23 },
    { name: "FitnessMaster", count: 19 },
    { name: "ActiveGear", count: 15 },
    { name: "PowerFit", count: 12 },
    { name: "FlexZone", count: 8 }
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 500]);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Sports Equipment & Gear
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our complete collection of premium sports equipment and fitness gear
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-80 hidden lg:block">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear All
                    </Button>
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-foreground mb-3 block">
                      Search Products
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3">Categories</h4>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category.name} className="flex items-center space-x-2">
                          <Checkbox
                            id={category.name}
                            checked={selectedCategories.includes(category.name)}
                            onCheckedChange={() => toggleCategory(category.name)}
                          />
                          <label 
                            htmlFor={category.name}
                            className="text-sm text-muted-foreground cursor-pointer flex-1"
                          >
                            {category.name}
                          </label>
                          <span className="text-xs text-muted-foreground">
                            ({category.count})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Brands */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3">Brands</h4>
                    <div className="space-y-3">
                      {brands.map((brand) => (
                        <div key={brand.name} className="flex items-center space-x-2">
                          <Checkbox
                            id={brand.name}
                            checked={selectedBrands.includes(brand.name)}
                            onCheckedChange={() => toggleBrand(brand.name)}
                          />
                          <label 
                            htmlFor={brand.name}
                            className="text-sm text-muted-foreground cursor-pointer flex-1"
                          >
                            {brand.name}
                          </label>
                          <span className="text-xs text-muted-foreground">
                            ({brand.count})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3">Price Range</h4>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                          className="w-20"
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500])}
                          className="w-20"
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ${priceRange[0]} - ${priceRange[1]}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Rating Filter */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Rating</h4>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox id={`rating-${rating}`} />
                          <label 
                            htmlFor={`rating-${rating}`}
                            className="text-sm text-muted-foreground cursor-pointer flex items-center gap-1"
                          >
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${
                                  i < rating ? 'fill-current text-yellow-400' : 'text-muted-foreground'
                                }`} 
                              />
                            ))}
                            <span>& Up</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Showing {products.length} products
                  </span>
                  {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
                    <Badge variant="secondary">
                      Filtered
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Select defaultValue="featured">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="flex">
                      <div className="w-48 h-48">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                              {product.category}
                            </p>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${
                                      i < Math.floor(product.rating) 
                                        ? 'fill-current text-yellow-400' 
                                        : 'text-muted-foreground'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                ({product.reviews} reviews)
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary mb-2">
                              ${product.price.toFixed(2)}
                            </div>
                            {product.originalPrice && (
                              <div className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice.toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button className="flex-1" variant="sport">
                            Add to Cart
                          </Button>
                          <Button variant="outline">
                            Quick View
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center mt-12 gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="default">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">
                Next
              </Button>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;