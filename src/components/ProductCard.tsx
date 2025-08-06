import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  ShoppingCart, 
  Eye, 
  Star,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  className?: string;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviews, 
  category,
  isNew,
  isSale,
  discount,
  className = ""
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick view logic
  };

  return (
    <Card 
      className={`group relative overflow-hidden border-border hover:shadow-sport transition-all duration-300 hover:-translate-y-1 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`}>
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="aspect-square relative bg-muted/30">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {isNew && (
                <Badge className="bg-secondary text-secondary-foreground">
                  <Zap className="h-3 w-3 mr-1" />
                  New
                </Badge>
              )}
              {isSale && discount && (
                <Badge className="bg-accent text-accent-foreground">
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}>
              <Button
                variant="secondary"
                size="icon"
                className="h-9 w-9 shadow-sm"
                onClick={handleWishlist}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-9 w-9 shadow-sm"
                onClick={handleQuickView}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Add to Cart */}
            <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Button 
                className="w-full shadow-sm"
                variant="sport"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>

          <CardContent className="p-4">
            {/* Category */}
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              {category}
            </p>

            {/* Product Name */}
            <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3 w-3 ${
                      i < Math.floor(rating) 
                        ? 'fill-current text-yellow-400' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                ${price.toFixed(2)}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;