
'use client';
import { useEffect, useState } from 'react';

interface EffectEntry {
  effect: string;
  language: { name: string; url: string; };
  short_effect: string;
}

export default function PokeAbilityPage() {
  const [effect, setEffect] = useState<string | null>(null);
  const [shortEffect, setShortEffect] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/ability/battle-armor/');
        const data = await response.json();
        
        const englishEntry = data.effect_entries.find(
          (entry: EffectEntry) => entry.language.name === 'en'
        );  
        
        if (englishEntry) {
          setEffect(englishEntry.effect);
          setShortEffect(englishEntry.short_effect);
        }
      } catch (error) {
        console.error('Failed to fetch ability data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading ability data...</div>;

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Ability: Battle Armor</h1>
      <div className="border p-4 rounded-lg lg:w-1/2">
        <h2 className="font-semibold text-lg">Short Effect</h2>
        <p>{shortEffect || 'Not found.'}</p>
      </div>
      <div className="border p-4 rounded-lg lg:w-1/2">
        <h2 className="font-semibold text-lg">Full Effect</h2>
        <p>{effect || 'Not found.'}</p>
      </div>
    </div>
  );
}
