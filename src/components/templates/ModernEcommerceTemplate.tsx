
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Star, 
  Filter, 
  Grid3X3, 
  List,
  Plus,
  Minus,
  Package,
  Truck,
  Shield,
  CreditCard
} from 'lucide-react';
import { AppCustomization } from '@/types/appTemplate';

interface ModernEcommerceTemplateProps {
  customization: AppCustomization;
}

const ModernEcommerceTemplate = ({ customization }: ModernEcommerceTemplateProps) => {
  const [activeTab, setActiveTab] = useState('products');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { companyData, mockData, colorScheme } = customization;

  const categories = ['All Products', 'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];
  
  const products = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 1247,
      image: '🎧',
      category: 'Electronics',
      inStock: true,
      tags: ['Wireless', 'Premium', 'Noise Cancelling']
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 199.99,
      rating: 4.6,
      reviews: 892,
      image: '⌚',
      category: 'Electronics',
      inStock: true,
      tags: ['Smart', 'Fitness', 'Waterproof']
    },
    {
      id: 3,
      name: 'Organic Cotton T-Shirt',
      price: 29.99,
      rating: 4.4,
      reviews: 543,
      image: '👕',
      category: 'Clothing',
      inStock: true,
      tags: ['Organic', 'Cotton', 'Sustainable']
    },
    {
      id: 4,
      name: 'Professional Camera Lens',
      price: 899.99,
      rating: 4.9,
      reviews: 234,
      image: '📷',
      category: 'Electronics',
      inStock: false,
      tags: ['Professional', 'Photography', 'Zoom']
    },
    {
      id: 5,
      name: 'Bamboo Coffee Table',
      price: 149.99,
      rating: 4.3,
      reviews: 156,
      image: '🪑',
      category: 'Home & Garden',
      inStock: true,
      tags: ['Bamboo', 'Sustainable', 'Modern']
    },
    {
      id: 6,
      name: 'Yoga Mat Pro',
      price: 59.99,
      rating: 4.7,
      reviews: 789,
      image: '🧘',
      category: 'Sports',
      inStock: true,
      tags: ['Yoga', 'Non-slip', 'Eco-friendly']
    }
  ];

  const orders = [
    { id: 'ORD-001', date: '2024-01-15', status: 'Delivered', total: 299.99, items: 2 },
    { id: 'ORD-002', date: '2024-01-12', status: 'Shipped', total: 149.99, items: 1 },
    { id: 'ORD-003', date: '2024-01-08', status: 'Processing', total: 89.98, items: 3 }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">{companyData.name}</h1>
              <nav className="hidden md:flex space-x-6">
                {['products', 'orders', 'wishlist', 'account'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 text-xs p-0 flex items-center justify-center">
                    {cartItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Filters and View Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Categories</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{filteredProducts.length} products</span>
                <div className="flex border border-gray-300 rounded-md">
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

            {/* Products Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow group">
                  {viewMode === 'grid' ? (
                    <div>
                      <div className="relative p-6 flex items-center justify-center bg-gray-50 h-48">
                        <span className="text-6xl">{product.image}</span>
                        {product.originalPrice && (
                          <Badge className="absolute top-2 left-2 bg-red-500">
                            Sale
                          </Badge>
                        )}
                        {!product.inStock && (
                          <Badge variant="secondary" className="absolute top-2 right-2">
                            Out of Stock
                          </Badge>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button size="sm" disabled={!product.inStock}>
                            Quick Add
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-600">({product.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-lg font-bold text-gray-900">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          className="w-full" 
                          disabled={!product.inStock}
                          onClick={() => setCartItems(cartItems + 1)}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      </CardContent>
                    </div>
                  ) : (
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center text-2xl">
                          {product.image}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-xs text-gray-600">({product.reviews} reviews)</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {product.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg font-bold text-gray-900">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          <Button 
                            disabled={!product.inStock}
                            onClick={() => setCartItems(cartItems + 1)}
                          >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
              <Button variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Track Package
              </Button>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{order.id}</h3>
                          <p className="text-sm text-gray-600">Placed on {order.date}</p>
                        </div>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${order.total}</p>
                        <p className="text-sm text-gray-600">{order.items} items</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status === 'Delivered' && (
                        <Button variant="outline" size="sm">
                          Buy Again
                        </Button>
                      )}
                      {order.status === 'Shipped' && (
                        <Button variant="outline" size="sm">
                          <Truck className="h-4 w-4 mr-2" />
                          Track Package
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">First Name</label>
                        <Input placeholder="John" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Last Name</label>
                        <Input placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input placeholder="john@example.com" type="email" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <Input placeholder="+1 (555) 123-4567" />
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your saved payment methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium">•••• •••• •••• 1234</p>
                            <p className="text-sm text-gray-600">Expires 12/25</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernEcommerceTemplate;
