import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useToast } from './ui/Toast';
import { motion } from 'motion/react';
import { Loader2, Mail, Lock, ArrowRight, Leaf, Sparkles } from 'lucide-react';

export function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { addToast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        if (data.session) {
          addToast('Account created successfully!', 'success');
        } else {
          addToast('Please check your email to verify your account.', 'info');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        addToast('Successfully signed in!', 'success');
      }
    } catch (error: any) {
      addToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0FDF4] p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            rotate: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-3xl"
        />
        
        {/* Floating Leaves */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              rotate: Math.random() * 360,
              opacity: 0.1
            }}
            animate={{ 
              y: ["-10%", "110%"],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 15 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute text-emerald-600/20"
          >
            <Leaf size={24 + Math.random() * 24} />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-emerald-100/50 relative overflow-hidden">
          {/* Top Leaf Accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400" />
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-6 shadow-sm">
              <Leaf className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="flex flex-col mb-2">
              <span className="text-2xl font-black tracking-tighter text-emerald-600 leading-none">Calculated</span>
              <span className="text-[8px] font-black text-emerald-600/30 uppercase tracking-[0.2em] mt-1">BY BUSSIN INDUSTRIES</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              {isSignUp ? 'Join the Forest' : 'Welcome Back'}
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              {isSignUp ? 'Start your prediction journey today' : 'Sign in to manage your green portfolio'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-black text-emerald-700 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-600 transition-colors w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none text-gray-900 font-medium placeholder:text-emerald-200"
                  placeholder="name@forest.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-emerald-700 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-600 transition-colors w-5 h-5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none text-gray-900 font-medium placeholder:text-emerald-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-400 text-white font-black rounded-2xl shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isSignUp ? 'Grow Account' : 'Enter Arena'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="group text-sm font-black text-emerald-600 hover:text-emerald-700 transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              {isSignUp ? 'Already a member? Sign in' : "New here? Create an account"}
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
        
        <p className="text-center mt-8 text-[10px] text-emerald-800/40 font-black uppercase tracking-[0.2em]">
          &copy; 2026 Calculated Prediction Markets
        </p>
      </motion.div>
    </div>
  );
}
