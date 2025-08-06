import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';

const CategoryPage = () => {
  const { category, subcategory } = useParams();
  const { getProductsByCategory } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const products = getProductsByCategory(category || '', subcategory);
  
  const categoryTitles: Record<string, string> = {
    'fitness': 'Fitness Equipment',
    'outdoor-sports': 'Outdoor Sports',
    'team-sports': 'Team Sports',
    'apparel': 'Sports Apparel'
  };

  const subcategoryFilters = {
    'fitness': ['Weights', 'Cardio', 'Yoga', 'Accessories'],
    'outdoor-sports': ['Hiking', 'Cycling', 'Camping', 'Water Sports'],
    'team-sports': ['Football', 'Basketball', 'Soccer', 'Baseball'],
    'apparel': ['Men', 'Women', 'Kids', 'Footwear']
  };

  const brands = ['Nike', 'Adidas', 'Under Armour', 'Reebok', 'Puma'];
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span>/</span>
          <span className="text-foreground font-medium">
            {categoryTitles[category || ''] || category}
          </span>
          {subcategory && (
            <>
              <span>/</span>
              <span className="text-foreground font-medium capitalize">{subcategory}</span>
            </>
          )}
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {categoryTitles[category || ''] || category}
            </h1>
            <p className="text-muted-foreground">
              {products.length} products found
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center border border-border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            {/* Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`w-80 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
            {/* Price Range */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Price Range</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            {category && subcategoryFilters[category as keyof typeof subcategoryFilters] && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {subcategoryFilters[category as keyof typeof subcategoryFilters].map((sub) => (
                    <div key={sub} className="flex items-center space-x-2">
                      <Checkbox id={sub} />
                      <label htmlFor={sub} className="text-sm font-medium">
                        {sub}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Brands */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Brands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox id={brand} />
                    <label htmlFor={brand} className="text-sm font-medium">
                      {brand}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Rating */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rating</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {ratings.map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox id={`rating-${rating}`} />
                    <label htmlFor={`rating-${rating}`} className="flex items-center text-sm font-medium">
                      {rating} stars & up
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    className={viewMode === 'list' ? 'flex-row' : ''}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;