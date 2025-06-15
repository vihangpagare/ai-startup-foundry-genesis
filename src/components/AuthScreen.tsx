
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Zap, Shield, Users, BarChart3 } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (email: string, password: string) => void;
  companyName: string;
}

const AuthScreen = ({ onLogin, companyName }: AuthScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    company: '' 
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(loginForm.email, loginForm.password);
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(signupForm.email, signupForm.password);
      setIsLoading(false);
    }, 1000);
  };

  const features = [
    {
      icon: BarChart3,
      title: 'Feature Analytics',
      description: 'Track feature usage and user engagement across your platform'
    },
    {
      icon: Zap,
      title: 'Smart Automation',
      description: 'Automate workflows and processes to boost productivity'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with role-based access controls'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Powerful tools for seamless team communication and collaboration'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{companyName}</h1>
          <p className="text-xl text-gray-600">Powerful features for modern teams</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Features Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Transform your workflow with intelligent features
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of teams who have revolutionized their productivity with our feature-rich platform.
              </p>
            </div>

            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-white shadow-sm border border-gray-100">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center text-white font-semibold">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">2,000+ teams already using our platform</p>
                  <p className="text-sm text-gray-600">Join the growing community</p>
                </div>
              </div>
            </div>
          </div>

          {/* Authentication Form */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md bg-white shadow-lg border border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Get Started</CardTitle>
                <CardDescription className="text-gray-600">
                  Sign in to your account or create a new one
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-gray-700">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-gray-700">Password</Label>
                        <div className="relative">
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                            required
                            className="border-gray-300 focus:border-blue-500 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-gray-700">Full Name</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={signupForm.name}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-gray-700">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-company" className="text-gray-700">Company</Label>
                        <Input
                          id="signup-company"
                          type="text"
                          placeholder="Enter your company name"
                          value={signupForm.company}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, company: e.target.value }))}
                          required
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-gray-700">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create a password"
                          value={signupForm.password}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                          required
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm" className="text-gray-700">Confirm Password</Label>
                        <Input
                          id="signup-confirm"
                          type="password"
                          placeholder="Confirm your password"
                          value={signupForm.confirmPassword}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
