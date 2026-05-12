import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Apple, Search, Zap, Activity, Info, AlertCircle, Loader2, Sparkles, Scale, Utensils } from 'lucide-react';
import { analyzeNutrition, NutritionData } from '@/src/services/nutritionService';
import { cn } from '@/src/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const NutritionAnalysis: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NutritionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await analyzeNutrition(query);
      setResult(data);
    } catch (err) {
      setError('System calibration failed. Please try a more specific food description.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const macroData = result ? [
    { name: 'Protein', value: result.macros.protein, color: '#0d9488' },
    { name: 'Carbs', value: result.macros.carbs, color: '#f59e0b' },
    { name: 'Fats', value: result.macros.fats, color: '#e11d48' },
  ] : [];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 pb-24 lg:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-teal-600 mb-4 font-bold text-[10px] uppercase tracking-[0.2em]">
            <Utensils className="w-3.5 h-3.5" />
            <span>Biological Fuel Optimization</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-slate-900 mb-1 tracking-tight">AI Nutritionist</h2>
          <p className="text-slate-500 text-xs lg:text-sm max-w-md">Real-time molecular analysis of your dietary inputs for absolute performance.</p>
        </div>
      </div>

      <section className="bg-white/80 backdrop-blur-xl p-6 lg:p-8 rounded-[2rem] border border-white shadow-xl shadow-slate-200/40">
        <form onSubmit={handleAnalyze} className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            placeholder="Describe your meal (e.g., 'A bowl of Greek yogurt with blueberries and almonds')"
            className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-5 lg:py-6 pl-14 pr-32 lg:pr-40 text-sm lg:text-base focus:bg-white focus:border-teal-100 focus:ring-4 focus:ring-teal-500/5 outline-none transition-all font-medium placeholder:text-slate-300"
          />
          <Apple className={cn(
            "absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors",
            loading ? "text-teal-500 animate-pulse" : "text-slate-300 group-focus-within:text-teal-500"
          )} />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white rounded-xl py-3 px-6 text-xs lg:text-sm font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-teal-400" /> : <Sparkles className="w-4 h-4 text-teal-400" />}
            Analyze
          </button>
        </form>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 text-rose-500 text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-rose-50 rounded-lg"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {error}
          </motion.div>
        )}
      </section>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 space-y-4"
          >
            <div className="relative">
              <div className="w-20 h-20 border-4 border-slate-100 rounded-full" />
              <div className="w-20 h-20 border-4 border-teal-500 border-t-transparent rounded-full animate-spin absolute top-0" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] animate-pulse">Scanning Molecular Composition...</p>
          </motion.div>
        ) : result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Summary Card */}
            <div className="lg:col-span-12">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 text-white relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
                  <div>
                    <span className="text-teal-400 text-[10px] font-bold uppercase tracking-widest mb-4 block">Identity Confirmation</span>
                    <h3 className="text-3xl lg:text-5xl font-sans font-bold leading-none mb-1">{result.foodName}</h3>
                    <p className="text-slate-400 text-sm font-medium">Portion: {result.servingSize}</p>
                  </div>
                  <div className="flex gap-12">
                    <div className="text-center md:text-left">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-2">Total Energy</span>
                      <div className="text-4xl lg:text-6xl font-serif font-bold text-white tracking-tight">{result.calories}<span className="text-xl text-teal-400 ml-1">kcal</span></div>
                    </div>
                    <div className="text-center md:text-left">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-2">Health Index</span>
                      <div className="text-4xl lg:text-6xl font-serif font-bold text-teal-400 tracking-tight">{result.healthScore}<span className="text-xl text-slate-500 ml-1">/100</span></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-12 -right-12 w-96 h-96 bg-teal-500/10 blur-[100px] rounded-full" />
              </div>
            </div>

            {/* Macros Section */}
            <div className="lg:col-span-5">
              <div className="bg-white/60 backdrop-blur-md p-8 lg:p-10 rounded-[2.5rem] border border-white h-full flex flex-col">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                  <div className="w-4 h-px bg-slate-300" />
                  Macro Distribution
                </h4>
                
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-full h-48 relative mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={macroData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {macroData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <Zap className="w-6 h-6 text-slate-200" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 w-full">
                    {macroData.map((macro) => (
                      <div key={macro.name} className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{macro.name}</p>
                        <p className="text-xl font-sans font-bold text-slate-900">{macro.value}g</p>
                        <div className="w-8 h-1 mx-auto mt-2 rounded-full" style={{ backgroundColor: macro.color }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Micros Section */}
            <div className="lg:col-span-7">
              <div className="bg-white/60 backdrop-blur-md p-8 lg:p-10 rounded-[2.5rem] border border-white h-full">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                  <div className="w-4 h-px bg-slate-300" />
                  Micro-Nutrient Density
                </h4>
                
                <div className="space-y-6">
                  {result.micros.map((micro) => (
                    <div key={micro.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-slate-800">{micro.name}</span>
                        <span className="text-xs font-medium text-slate-400">{micro.amount} • <span className="text-teal-600">{micro.percentage}% DV</span></span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(micro.percentage, 100)}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-teal-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insights Section */}
            <div className="lg:col-span-12">
              <div className="bg-teal-50/50 p-8 lg:p-10 rounded-[2.5rem] border border-teal-100/50">
                <h4 className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <Info className="w-4 h-4" />
                  Strategic Insights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {result.insights.map((insight, idx) => (
                    <div key={idx} className="flex gap-4 p-4 lg:p-5 bg-white rounded-2xl border border-teal-100/30">
                      <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                        <Activity className="w-4 h-4 text-teal-600" />
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 text-slate-200">
              <Scale className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-serif italic text-slate-400 mb-2">Awaiting your biological data...</h3>
            <p className="text-sm text-slate-300 max-w-xs">Scan any food or meal to receive a comprehensive nutritional breakdown.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
