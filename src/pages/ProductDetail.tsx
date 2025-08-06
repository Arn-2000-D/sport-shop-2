import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Star, 
  Shield, 
  Truck, 
  RotateCcw,
  Plus,
  Minus,
  Share,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = {
    id: "1",
    name: "Professional Yoga Mat - Extra Thick Premium",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviews: 324,
    category: "Yoga",
    brand: "SportFlow Pro",
    sku: "YM-001-PRO",
    inStock: true,
    stock: 15,
    images: [
      "/placeholder.svg",
      "/placeholder.svg", 
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    colors: [
      { name: "Ocean Blue", value: "#0066CC", available: true },
      { name: "Forest Green", value: "#00AA44", available: true },
      { name: "Sunset Orange", value: "#FF6600", available: false },
      { name: "Deep Purple", value: "#6600CC", available: true }
    ],
    sizes: [
      { name: "Small (24\"x68\")", available: true },
      { name: "Medium (26\"x72\")", available: true },
      { name: "Large (28\"x78\")", available: false }
    ],
    features: [
      "Extra thick 8mm cushioning for superior comfort",
      "Non-slip surface with excellent grip",
      "Eco-friendly TPE material",
      "Lightweight and portable design",
      "Easy to clean and maintain",
      "Free carrying strap included"
    ],
    specifications: {
      "Material": "TPE (Thermoplastic Elastomer)",
      "Thickness": "8mm",
      "Dimensions": "72\" x 24\"",
      "Weight": "2.2 lbs",
      "Care": "Machine washable",
      "Warranty": "1 year manufacturer warranty"
    }
  };

  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      comment: "Amazing quality! The thickness provides excellent cushioning for my joints. Definitely worth the investment.",
      helpful: 23
    },
    {
      id: 2,
      name: "Mike R.", 
      rating: 4,
      date: "1 month ago",
      verified: true,
      comment: "Great yoga mat overall. Good grip and comfortable. Only wish it came in more color options.",
      helpful: 15
    },
    {
      id: 3,
      name: "Lisa K.",
      rating: 5,
      date: "6 weeks ago", 
      verified: true,
      comment: "Perfect for hot yoga sessions. The grip is incredible even when wet. Highly recommend!",
      helpful: 31
    }
  ];

  const relatedProducts = [
    {
      id: "2",
      name: "Yoga Block Set - Cork Material",
      price: 24.99,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 156,
      category: "Yoga"
    },
    {
      id: "3", 
      name: "Yoga Strap - Cotton Blend",
      price: 12.99,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 89,
      category: "Yoga"
    },
    {
      id: "4",
      name: "Meditation Cushion - Organic",
      price: 39.99,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 203,
      category: "Yoga"
    },
    {
      id: "5",
      name: "Yoga Towel - Quick Dry",
      price: 19.99,
      image: "/placeholder.svg", 
      rating: 4.5,
      reviews: 127,
      category: "Yoga"
    }
  ];

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic
    console.log('Added to cart:', { ...product, quantity, selectedSize, selectedColor });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                disabled={selectedImage === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={() => setSelectedImage(Math.min(product.images.length - 1, selectedImage + 1))}
                disabled={selectedImage === product.images.length - 1}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-primary shadow-md' 
                      : 'border-transparent hover:border-border'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge className="bg-accent text-accent-foreground">28% OFF</Badge>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-muted-foreground mb-4">
                By <span className="text-foreground font-medium">{product.brand}</span> • SKU: {product.sku}
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-current text-yellow-400' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                  ))}
                  <span className="text-lg font-medium text-foreground ml-2">
                    {product.rating}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <Badge className="bg-secondary text-secondary-foreground">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </Badge>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-secondary' : 'bg-destructive'}`} />
              <span className={`font-medium ${product.inStock ? 'text-secondary' : 'text-destructive'}`}>
                {product.inStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            <Separator />

            {/* Color Selection */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => color.available && setSelectedColor(color.name)}
                    disabled={!color.available}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.name 
                        ? 'border-primary shadow-md scale-110' 
                        : 'border-border hover:border-border/60'
                    } ${!color.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Size: {selectedSize}</h3>
              <div className="grid grid-cols-1 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => size.available && setSelectedSize(size.name)}
                    disabled={!size.available}
                    className={`p-3 text-left border rounded-md transition-all ${
                      selectedSize === size.name
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-border/60'
                    } ${!size.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span className="text-sm font-medium">
                      {size.name}
                      {!size.available && ' (Out of Stock)'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-r-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-center min-w-[60px] border-x border-border">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="h-10 w-10 rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock} available
                </span>
              </div>

              <div className="flex gap-4">
                <Button 
                  className="flex-1" 
                  variant="sport"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || !selectedSize || !selectedColor}
                >
                  Add to Cart • ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center">
                <Shield className="h-8 w-8 text-secondary mb-2" />
                <span className="text-xs text-muted-foreground">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="h-8 w-8 text-primary mb-2" />
                <span className="text-xs text-muted-foreground">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="h-8 w-8 text-accent mb-2" />
                <span className="text-xs text-muted-foreground">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Product Description</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Experience the ultimate in yoga comfort with our Professional Yoga Mat. Designed for serious practitioners, 
                  this premium mat features an extra-thick 8mm cushioning that provides superior support for your joints 
                  while maintaining the stability you need for challenging poses.
                </p>
                <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Technical Specifications</h3>
                <div className="grid gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-border last:border-b-0">
                      <span className="font-medium text-foreground">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">Customer Reviews</h3>
                  <Button variant="outline">Write a Review</Button>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-foreground">{review.name}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < review.rating 
                                ? 'fill-current text-yellow-400' 
                                : 'text-muted-foreground'
                            }`} 
                          />
                        ))}
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{review.comment}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          Helpful ({review.helpful})
                        </button>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Shipping & Returns</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Shipping Information</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Free standard shipping on orders over $50</li>
                      <li>• Express shipping available (2-3 business days)</li>
                      <li>• International shipping available</li>
                      <li>• Orders processed within 1-2 business days</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Return Policy</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• 30-day return window from delivery date</li>
                      <li>• Items must be in original condition</li>
                      <li>• Free return shipping for defective items</li>
                      <li>• Refunds processed within 5-7 business days</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Warranty</h4>
                    <p className="text-muted-foreground">
                      This product comes with a 1-year manufacturer warranty covering defects in materials and workmanship.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;