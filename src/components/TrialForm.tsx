import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const TrialForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Trial signup:', { email, name });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="glass-card max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-mystical text-2xl mb-2">
            Begin Your Journey
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Join our free trial and discover inner peace with Echo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-muted/20 border-border/20 text-foreground"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted/20 border-border/20 text-foreground"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/80">
              Start Free Trial
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Ready to talk?
            </p>
            <Button variant="outline" className="border-mystical-teal text-mystical-teal hover:bg-mystical-teal hover:text-white">
              Chat with Echo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};