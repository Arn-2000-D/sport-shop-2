import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Trash2, 
  Plus, 
  Minus, 
  Heart,
  ShoppingBag,
  Shield,
  Truck,
  ArrowRight,
  Tag,
  Gift
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Professional Yoga Mat - Extra Thick',
      price: 49.99,
      originalPrice: 69.99,
      quantity: 2,
      color: 'Ocean Blue',
      size: 'Medium (26"x72")',
      image: '/placeholder.svg',
      inStock: true,
      category: 'Yoga'
    },
    {
      id: '2',
      name: 'Adjustable Dumbbell Set - 50lbs',
      price: 199.99,
      quantity: 1,
      image: '/placeholder.svg',
      inStock: true,
      category: 'Weights'
    },
    {
      id: '3',
      name: 'Running Shoes - Marathon Pro',
      price: 129.99,
      originalPrice: 159.99,
      quantity: 1,
      color: 'Black/White',
      size: 'US 10',
      image: '/placeholder.svg',
      inStock: false,
      category: 'Footwear'
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const moveToWishlist = (id: string) => {
    // Move to wishlist logic
    removeItem(id);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setAppliedPromo('SAVE10');
      setPromoCode('');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => {
    const itemSavings = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;
    return sum + itemSavings;
  }, 0);
  
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  const recommendedProducts = [
    {
      id: '4',
      name: 'Yoga Block Set - Cork',
      price: 24.99,
      image: '/placeholder.svg',
      rating: 4.7
    },
    {
      id: '5',
      name: 'Resistance Band Set',
      price: 34.99,
      image: '/placeholder.svg',
      rating: 4.6
    },
    {
      id: '6',
      name: 'Water Bottle - Insulated',
      price: 19.99,
      image: '/placeholder.svg',
      rating: 4.8
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link to="/products">
              <Button variant="sport" size="lg">
                Start Shopping
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className={`${!item.inStock ? 'opacity-75' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Link 
                              to={`/product/${item.id}`}
                              className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Variants */}
                        {(item.color || item.size) && (
                          <div className="flex gap-4 mb-3 text-sm text-muted-foreground">
                            {item.color && <span>Color: {item.color}</span>}
                            {item.size && <span>Size: {item.size}</span>}
                          </div>
                        )}

                        {/* Stock Status */}
                        {!item.inStock && (
                          <Badge variant="destructive" className="mb-3">
                            Out of Stock
                          </Badge>
                        )}

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-primary">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-border rounded-md">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1 || !item.inStock}
                                className="h-8 w-8 p-0 rounded-r-none"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="px-3 py-1 text-center min-w-[40px] border-x border-border">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={!item.inStock}
                                className="h-8 w-8 p-0 rounded-l-none"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Move to Wishlist */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveToWishlist(item.id)}
                              className="text-muted-foreground hover:text-primary"
                            >
                              <Heart className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Recommended Products */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-accent" />
                    Frequently Bought Together
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {recommendedProducts.map((product) => (
                      <div key={product.id} className="text-center group">
                        <div className="aspect-square bg-muted rounded-md mb-3 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h4 className="font-medium text-foreground mb-1 text-sm">
                          {product.name}
                        </h4>
                        <p className="text-primary font-semibold mb-2">
                          ${product.price.toFixed(2)}
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Add to Cart
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-accent" />
                    Promo Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-md">
                      <span className="font-medium text-secondary">
                        {appliedPromo} Applied
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAppliedPromo(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={applyPromoCode} disabled={!promoCode}>
                        Apply
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Try code "SAVE10" for 10% off
                  </p>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex justify-between text-secondary">
                      <span>You Save</span>
                      <span>-${savings.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {appliedPromo && (
                    <div className="flex justify-between text-secondary">
                      <span>Promo Discount ({appliedPromo})</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>

                  <Link to="/checkout">
                    <Button className="w-full" variant="sport" size="lg">
                      Proceed to Checkout
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-3">
                      {shipping > 0 && `Add $${(50 - subtotal).toFixed(2)} more for free shipping`}
                    </p>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-secondary" />
                      <span className="text-xs text-muted-foreground">Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Fast Delivery</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Free Shipping Progress */}
              {subtotal < 50 && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Free Shipping</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Add ${(50 - subtotal).toFixed(2)} more to qualify for free shipping
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;