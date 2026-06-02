import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:8000' 
    : 'https://amanxar-sand-matters-backend.hf.space')) + '/api';

export function useSites() {
  const { data: sites, isLoading: loading, error, refetch } = useQuery({
    queryKey: ['sites'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/sites`);
      if (!response.ok) throw new Error('Failed to fetch sites');
      return response.json();
    }
  });

  return { 
    sites, 
    loading, 
    error: error instanceof Error ? error.message : null,
    refetch
  };
}

export function useSiteDetails(id: string | null) {
  const { data: details, isLoading: loading, error } = useQuery({
    queryKey: ['site', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await fetch(`${API_BASE_URL}/sites/${id}`);
      if (!response.ok) throw new Error('Failed to fetch site details');
      return response.json();
    },
    enabled: !!id
  });

  return { 
    details, 
    loading, 
    error: error instanceof Error ? error.message : null 
  };
}
