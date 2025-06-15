
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Star, 
  Heart, 
  Search, 
  User, 
  Truck, 
  Shield, 
  RotateCcw,
  Zap,
  Award,
  TrendingUp,
  Users,
  Filter,
  Grid,
  List,
  ChevronRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface AdvancedEcommerceTemplateProps {
  customization: any;
}

const AdvancedEcommerceTemplate = ({ customization }: AdvancedEcommerceTemplateProps) => {
  const { fields, colorScheme, companyData } = customization;
  
  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Header with Search and Cart */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="py-2 border-b border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4 text-gray-600">
                <span className="flex items-center space-x-1">
                  <Phone className="h-3 w-3" />
                  <span>+1 (555) 123-4567</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Mail className="h-3 w-3" />
                  <span>support@{companyData.name?.toLowerCase() || 'store'}.com</span>
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">Track Order</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Help</a>
                <span className="text-green-600">Free shipping on orders $75+</span>
              </div>
            </div>
          </div>
          
          {/* Main Header */}
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">{companyData.name?.charAt(0) || 'S'}</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">{companyData.name || 'StyleStore'}</h1>
                    <p className="text-xs text-gray-500">Premium Fashion</p>
                  </div>
                </div>
                
                <nav className="hidden lg:flex items-center space-x-8">
                  <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">New Arrivals</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Women</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Men</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Accessories</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Sale</a>
                </nav>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-purple-600">
                    2
                  </Badge>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Product Showcase */}
      <section className="relative bg-gradient-to-r from-purple-50 to-pink-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  <Award className="h-3 w-3 mr-1" />
                  New Collection 2024
                </Badge>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {fields.heroTitle || 'Discover Your'}
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Perfect Style
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  {fields.heroSubtitle || 'Curated collection of premium fashion for the modern individual. Quality craftsmanship meets contemporary design.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Shop Collection
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4">
                  View Lookbook
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.8★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24h</div>
                  <div className="text-sm text-gray-600">Fast Delivery</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">Featured Product 1</span>
                  </div>
                  <div className="h-32 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center">
                    <span className="text-pink-600 font-semibold">Featured Product 2</span>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="h-32 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center">
                    <span className="text-indigo-600 font-semibold">Featured Product 3</span>
                  </div>
                  <div className="h-48 bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl flex items-center justify-center">
                    <span className="text-rose-600 font-semibold">Featured Product 4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Discover our curated collections</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Women\'s Fashion', items: '250+ items', color: 'purple' },
              { name: 'Men\'s Fashion', items: '180+ items', color: 'blue' },
              { name: 'Accessories', items: '120+ items', color: 'pink' },
              { name: 'Footwear', items: '90+ items', color: 'indigo' }
            ].map((category, index) => (
              <Card key={index} className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className={`h-48 bg-gradient-to-br from-${category.color}-100 to-${category.color}-200 rounded-t-lg flex items-center justify-center`}>
                    <span className={`text-${category.color}-600 font-semibold`}>{category.name}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.items}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Hand-picked favorites just for you</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <div className="flex border border-gray-200 rounded-lg">
                <Button variant="ghost" size="sm" className="rounded-r-none">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-l-none border-l">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Product {index + 1}</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="secondary" className="rounded-full w-8 h-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500">Sale</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Premium Product {index + 1}</h3>
                    <p className="text-sm text-gray-600 mb-2">High-quality material</p>
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">(127)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">${(index + 1) * 25}</span>
                        <span className="text-sm text-gray-500 line-through">${(index + 1) * 35}</span>
                      </div>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: 'Free Shipping',
                description: 'Free shipping on orders over $75',
                color: 'green'
              },
              {
                icon: RotateCcw,
                title: 'Easy Returns',
                description: '30-day hassle-free returns',
                color: 'blue'
              },
              {
                icon: Shield,
                title: 'Secure Payment',
                description: 'SSL encrypted secure checkout',
                color: 'purple'
              },
              {
                icon: Zap,
                title: 'Fast Delivery',
                description: '24-48 hour delivery available',
                color: 'orange'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in Style</h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest trends and exclusive offers delivered to your inbox
          </p>
          <div className="flex justify-center">
            <div className="flex w-full max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
              />
              <Button className="bg-white text-purple-600 hover:bg-gray-100 rounded-l-none px-6">
                Subscribe
              </Button>
            </div>
          </div>
          <p className="text-sm mt-4 opacity-75">
            No spam, unsubscribe at any time
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">{companyData.name?.charAt(0) || 'S'}</span>
                </div>
                <span className="text-xl font-bold">{companyData.name || 'StyleStore'}</span>
              </div>
              <p className="text-gray-400 mb-6">
                Premium fashion for the modern individual. Quality, style, and sustainability in every piece.
              </p>
              <div className="flex space-x-4">
                {['Instagram', 'Facebook', 'Twitter', 'Pinterest'].map((social) => (
                  <div key={social} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                    <span className="text-sm">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {[
              {
                title: 'Shop',
                links: ['New Arrivals', 'Women', 'Men', 'Accessories', 'Sale', 'Gift Cards']
              },
              {
                title: 'Customer Care',
                links: ['Contact Us', 'Size Guide', 'Shipping Info', 'Returns', 'Track Order', 'FAQ']
              },
              {
                title: 'Company',
                links: ['About Us', 'Careers', 'Press', 'Sustainability', 'Terms', 'Privacy']
              }
            ].map((column) => (
              <div key={column.title}>
                <h3 className="font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 {companyData.name || 'StyleStore'}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <img src="/api/placeholder/40/24" alt="Visa" className="h-6" />
              <img src="/api/placeholder/40/24" alt="Mastercard" className="h-6" />
              <img src="/api/placeholder/40/24" alt="PayPal" className="h-6" />
              <img src="/api/placeholder/40/24" alt="Apple Pay" className="h-6" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdvancedEcommerceTemplate;
