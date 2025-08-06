import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  subcategory: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  description: string;
  features: string[];
  inStock: boolean;
  stockCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: CartItem[];
}

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  wishlist: string[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  getProductsByCategory: (category: string, subcategory?: string) => Product[];
  getSaleProducts: () => Product[];
  getFeaturedProducts: () => Product[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock Data
const mockProducts: Product[] = [
  // Fitness
  {
    id: '1',
    name: 'Professional Dumbbells Set',
    price: 199.99,
    originalPrice: 249.99,
    image: '/src/assets/fitness-gear.jpg',
    rating: 4.8,
    reviews: 156,
    category: 'Fitness',
    subcategory: 'Weights',
    isSale: true,
    discount: 20,
    description: 'Premium adjustable dumbbells perfect for home workouts',
    features: ['Adjustable weight', 'Durable coating', 'Comfortable grip'],
    inStock: true,
    stockCount: 25
  },
  {
    id: '2',
    name: 'Premium Yoga Mat',
    price: 49.99,
    image: '/src/assets/fitness-gear.jpg',
    rating: 4.9,
    reviews: 203,
    category: 'Fitness',
    subcategory: 'Yoga',
    isNew: true,
    description: 'Eco-friendly non-slip yoga mat for all skill levels',
    features: ['Non-slip surface', 'Eco-friendly', 'Extra thick'],
    inStock: true,
    stockCount: 50
  },
  {
    id: '3',
    name: 'Resistance Bands Set',
    price: 29.99,
    image: '/src/assets/fitness-gear.jpg',
    rating: 4.7,
    reviews: 89,
    category: 'Fitness',
    subcategory: 'Accessories',
    description: 'Complete resistance training system',
    features: ['Multiple resistance levels', 'Portable', 'Door anchor included'],
    inStock: true,
    stockCount: 100
  },
  // Outdoor Sports
  {
    id: '4',
    name: 'Mountain Hiking Backpack',
    price: 129.99,
    originalPrice: 159.99,
    image: '/src/assets/outdoor-gear.jpg',
    rating: 4.6,
    reviews: 74,
    category: 'Outdoor Sports',
    subcategory: 'Hiking',
    isSale: true,
    discount: 19,
    description: 'Durable 40L hiking backpack for outdoor adventures',
    features: ['40L capacity', 'Weather resistant', 'Multiple compartments'],
    inStock: true,
    stockCount: 15
  },
  {
    id: '5',
    name: 'Professional Cycling Helmet',
    price: 79.99,
    image: '/src/assets/outdoor-gear.jpg',
    rating: 4.8,
    reviews: 124,
    category: 'Outdoor Sports',
    subcategory: 'Cycling',
    description: 'Lightweight and aerodynamic cycling helmet',
    features: ['Lightweight design', 'Adjustable fit', 'Ventilation system'],
    inStock: true,
    stockCount: 30
  },
  // Team Sports
  {
    id: '6',
    name: 'Professional Basketball',
    price: 34.99,
    image: '/src/assets/hero-sports.jpg',
    rating: 4.7,
    reviews: 92,
    category: 'Team Sports',
    subcategory: 'Basketball',
    description: 'Official size and weight basketball',
    features: ['Official size', 'Composite leather', 'Indoor/outdoor use'],
    inStock: true,
    stockCount: 60
  },
  {
    id: '7',
    name: 'Soccer Ball - World Cup Edition',
    price: 45.99,
    originalPrice: 59.99,
    image: '/src/assets/hero-sports.jpg',
    rating: 4.9,
    reviews: 167,
    category: 'Team Sports',
    subcategory: 'Soccer',
    isSale: true,
    discount: 23,
    description: 'FIFA approved soccer ball with World Cup design',
    features: ['FIFA approved', 'Hand-stitched', 'Premium quality'],
    inStock: true,
    stockCount: 40
  },
  // Apparel
  {
    id: '8',
    name: 'Athletic Running Shoes',
    price: 149.99,
    image: '/src/assets/fitness-gear.jpg',
    rating: 4.8,
    reviews: 234,
    category: 'Apparel',
    subcategory: 'Footwear',
    isNew: true,
    description: 'High-performance running shoes for athletes',
    features: ['Breathable mesh', 'Cushioned sole', 'Lightweight'],
    inStock: true,
    stockCount: 75
  },
  {
    id: '9',
    name: 'Men\'s Performance T-Shirt',
    price: 24.99,
    originalPrice: 34.99,
    image: '/src/assets/fitness-gear.jpg',
    rating: 4.5,
    reviews: 156,
    category: 'Apparel',
    subcategory: 'Men',
    isSale: true,
    discount: 29,
    description: 'Moisture-wicking performance t-shirt',
    features: ['Moisture-wicking', 'Quick-dry', 'Anti-odor'],
    inStock: true,
    stockCount: 120
  }
];

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/src/assets/fitness-gear.jpg',
  orders: [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 199.99,
      items: [
        { ...mockProducts[0], quantity: 1 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 79.98,
      items: [
        { ...mockProducts[1], quantity: 1 },
        { ...mockProducts[2], quantity: 1 }
      ]
    }
  ]
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [products] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const login = (email: string, password: string) => {
    // Mock login
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const getProductsByCategory = (category: string, subcategory?: string) => {
    return products.filter(product => {
      const matchesCategory = product.category.toLowerCase() === category.toLowerCase();
      if (subcategory) {
        return matchesCategory && product.subcategory.toLowerCase() === subcategory.toLowerCase();
      }
      return matchesCategory;
    });
  };

  const getSaleProducts = () => {
    return products.filter(product => product.isSale);
  };

  const getFeaturedProducts = () => {
    return products.slice(0, 6);
  };

  return (
    <AppContext.Provider value={{
      products,
      cart,
      user,
      wishlist,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      toggleWishlist,
      login,
      logout,
      getProductsByCategory,
      getSaleProducts,
      getFeaturedProducts
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}