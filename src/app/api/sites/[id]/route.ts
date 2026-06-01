import { NextResponse } from 'next/server';

const mockDetails: Record<string, any> = {
  '1': {
    id: '1',
    confidence: 0.92,
    status: 'Suspected Illegal',
    coordinates: [87.52, 23.05],
    metrics: {
      ndvi: 0.12, 
      bsi: 0.65,  
      mndwi: 0.05 
    },
    images: {
      '1987': 'https://images.unsplash.com/photo-1610423188559-0f0e0bc872f1?auto=format&fit=crop&q=80&w=800&h=600',
      '2026': 'https://images.unsplash.com/photo-1620888126757-0a98f1f4ce62?auto=format&fit=crop&q=80&w=800&h=600'
    }
  },
  '2': {
    id: '2',
    confidence: 0.85,
    status: 'Under Review',
    coordinates: [87.48, 22.98],
    metrics: {
      ndvi: 0.25,
      bsi: 0.50,
      mndwi: 0.10
    },
    images: {
      '1987': 'https://images.unsplash.com/photo-1540866160395-5345a5563968?auto=format&fit=crop&q=80&w=800&h=600',
      '2026': 'https://images.unsplash.com/photo-1579294285117-640a349887cd?auto=format&fit=crop&q=80&w=800&h=600'
    }
  },
  '3': {
    id: '3',
    confidence: 0.98,
    status: 'Confirmed Illegal',
    coordinates: [87.55, 23.1],
    metrics: {
      ndvi: 0.05,
      bsi: 0.80,
      mndwi: 0.02
    },
    images: {
      '1987': 'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?auto=format&fit=crop&q=80&w=800&h=600',
      '2026': 'https://images.unsplash.com/photo-1463130456064-2db24b61b3cd?auto=format&fit=crop&q=80&w=800&h=600'
    }
  }
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const site = mockDetails[resolvedParams.id];
  
  if (!site) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(site);
}
