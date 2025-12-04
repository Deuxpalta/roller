import React, { useState } from 'react';
import { supabase } from '../../supabase/client';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await supabase.auth.signInWithOtp({ email });
      if (onSuccess) onSuccess(result);
    } catch (error) {
      console.error('Error signing in:', error?.message ?? error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ponga su email, wachito"
        name="email"
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Login'}
      </Button>
    </form>
  );
}

export default LoginForm;
