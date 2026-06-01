import { NextResponse } from 'next/server';

const mockSites = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: '1',
      geometry: {
        type: 'Point',
        coordinates: [87.52, 23.05]
      },
      properties: {
        id: '1',
        confidence: 0.92,
        status: 'Suspected Illegal'
      }
    },
    {
      type: 'Feature',
      id: '2',
      geometry: {
        type: 'Point',
        coordinates: [87.48, 22.98]
      },
      properties: {
        id: '2',
        confidence: 0.85,
        status: 'Under Review'
      }
    },
    {
      type: 'Feature',
      id: '3',
      geometry: {
        type: 'Point',
        coordinates: [87.55, 23.1]
      },
      properties: {
        id: '3',
        confidence: 0.98,
        status: 'Confirmed Illegal'
      }
    }
  ]
};

export async function GET() {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json(mockSites);
}
