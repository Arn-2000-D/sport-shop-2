import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Truck, 
  Shield, 
  Lock,
  MapPin,
  User,
  Mail,
  Phone,
  ArrowLeft,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const cartItems = [
    {
      id: '1',
      name: 'Professional Yoga Mat - Extra Thick',
      price: 49.99,
      quantity: 2,
      color: 'Ocean Blue',
      size: 'Medium',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Adjustable Dumbbell Set - 50lbs',
      price: 199.99,
      quantity: 1,
      image: '/placeholder.svg'
    }
  ];

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: '5-7 business days',
      price: 0,
      icon: Truck
    },
    {
      id: 'express',
      name: 'Express Shipping', 
      description: '2-3 business days',
      price: 15.99,
      icon: Truck
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next business day',
      price: 29.99,
      icon: Truck
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod === 'standard' ? 0 : shippingOptions.find(opt => opt.id === shippingMethod)?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const steps = [
    { id: 1, name: 'Shipping', icon: Truck },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Review', icon: Check }
  ];

  const handleStepChange = (step: number) => {
    if (step <= currentStep + 1) {
      setCurrentStep(step);
    }
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process order
    alert('Order placed successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your order securely</p>
          </div>
          <Link to="/cart">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => handleStepChange(step.id)}
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    step.id <= currentStep
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </button>
                <span className={`ml-3 font-medium ${
                  step.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-6 ${
                    step.id < currentStep ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          required
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          required
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        required
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          required
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select value={shippingInfo.state} onValueChange={(value) => setShippingInfo({...shippingInfo, state: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          required
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Shipping Options */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Shipping Method</h3>
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        {shippingOptions.map((option) => (
                          <div key={option.id} className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <div className="flex items-center gap-3 flex-1">
                              <option.icon className="h-5 w-5 text-primary" />
                              <div className="flex-1">
                                <label htmlFor={option.id} className="font-medium text-foreground cursor-pointer">
                                  {option.name}
                                </label>
                                <p className="text-sm text-muted-foreground">{option.description}</p>
                              </div>
                              <span className="font-semibold text-foreground">
                                {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                              </span>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <Button type="submit" className="w-full" variant="sport" size="lg">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    {/* Payment Method Selection */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Payment Method</h3>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                          <RadioGroupItem value="card" id="card" />
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5 text-primary" />
                            <label htmlFor="card" className="font-medium text-foreground cursor-pointer">
                              Credit/Debit Card
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg opacity-75">
                          <RadioGroupItem value="paypal" id="paypal" disabled />
                          <div className="flex items-center gap-3">
                            <div className="h-5 w-5 bg-blue-600 rounded" />
                            <label htmlFor="paypal" className="font-medium text-muted-foreground cursor-not-allowed">
                              PayPal (Coming Soon)
                            </label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Card Details */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date *</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="cardName">Name on Card *</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {/* Billing Address */}
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <Checkbox
                          id="sameAsBilling"
                          checked={sameAsBilling}
                          onCheckedChange={(checked) => setSameAsBilling(checked === true)}
                        />
                        <Label htmlFor="sameAsBilling">
                          Billing address same as shipping address
                        </Label>
                      </div>
                      
                      {!sameAsBilling && (
                        <div className="space-y-4 p-4 border border-border rounded-lg">
                          <h4 className="font-medium text-foreground">Billing Address</h4>
                          {/* Add billing address fields here */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input placeholder="First Name" />
                            <Input placeholder="Last Name" />
                          </div>
                          <Input placeholder="Street Address" />
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input placeholder="City" />
                            <Input placeholder="State" />
                            <Input placeholder="ZIP Code" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setCurrentStep(1)}
                        className="w-full"
                      >
                        Back to Shipping
                      </Button>
                      <Button type="submit" className="w-full" variant="sport" size="lg">
                        Review Order
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    Review Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleOrderSubmit} className="space-y-6">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4">Order Items</h3>
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md bg-muted"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{item.name}</h4>
                              <div className="text-sm text-muted-foreground space-y-1">
                                {item.color && <p>Color: {item.color}</p>}
                                {item.size && <p>Size: {item.size}</p>}
                                <p>Quantity: {item.quantity}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Info Summary */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Shipping Address</h3>
                      <div className="p-4 bg-muted/30 rounded-lg text-sm">
                        <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                        <p>{shippingInfo.email}</p>
                      </div>
                    </div>

                    {/* Payment Method Summary */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Payment Method</h3>
                      <div className="p-4 bg-muted/30 rounded-lg text-sm">
                        <p>Credit/Debit Card ending in ****</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setCurrentStep(2)}
                        className="w-full"
                      >
                        Back to Payment
                      </Button>
                      <Button type="submit" className="w-full" variant="sport" size="lg">
                        Place Order
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
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
                </div>

                {/* Security Badges */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      <span>Protected</span>
                    </div>
                  </div>
                  <p className="text-center text-xs text-muted-foreground mt-2">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;