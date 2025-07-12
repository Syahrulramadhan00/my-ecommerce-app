'use client';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PokemonData {
  [key: string]: any;
}

export default function PokeListPage() {
  const [data, setData] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading Pokémon data...</div>;
  if (!data) return <div>No data found.</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pokémon: Ditto (Raw Data)</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(data).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{key}</TableCell>
              <TableCell>{JSON.stringify(value, null, 2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}