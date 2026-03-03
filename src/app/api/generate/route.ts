import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

interface GenerateRequestBody {
  image: string;
  color: string;
  finish: string;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(request: NextRequest) {
  console.log('🚀 API called');
  
  try {
    const body: GenerateRequestBody = await request.json();
    const { image, color, finish } = body;

    if (!image || !color || !finish) {
      return NextResponse.json({ success: false, error: 'Missing data' }, { status: 400 });
    }

    const apiKey = process.env.FAL_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'FAL_KEY mungon' }, { status: 500 });
    }

    let imageUrl = image;
    if (!image.startsWith('data:')) {
      imageUrl = `data:image/jpeg;base64,${image}`;
    }

    const prompt = `Change this car's body color to ${color} with ${finish} finish. Keep wheels, windows, lights, and background exactly the same. Photorealistic.`;

    console.log('📝 Color:', color, '| Finish:', finish);
    console.log('🌐 Calling fal.ai...');

    // Përdor image_urls (array) jo image_url
    const response = await fetch('https://queue.fal.run/fal-ai/nano-banana/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        image_urls: [imageUrl],  // Array!
      }),
    });

    console.log('📡 Status:', response.status);
    const data = await response.json();
    console.log('📋 Response:', JSON.stringify(data).substring(0, 400));

    if (!response.ok) {
      return NextResponse.json({ success: false, error: `Error ${response.status}` });
    }

    // Rezultat direkt
    if (data.images?.[0]?.url) {
      console.log('✅ Direct result!');
      return NextResponse.json({ success: true, result: data.images[0].url });
    }

    // Queue mode
    if (data.request_id && data.status_url && data.response_url) {
      console.log('⏳ Polling...');

      for (let i = 0; i < 90; i++) {
        await sleep(2000);

        try {
          const statusRes = await fetch(data.status_url, {
            headers: { 'Authorization': `Key ${apiKey}` }
          });

          if (!statusRes.ok) continue;

          const statusData = await statusRes.json();
          console.log(`🔄 (${i + 1}/90):`, statusData.status);

          if (statusData.status === 'COMPLETED') {
            const resultRes = await fetch(data.response_url, {
              headers: { 'Authorization': `Key ${apiKey}` }
            });

            const resultData = await resultRes.json();
            console.log('📦 Result:', JSON.stringify(resultData).substring(0, 400));

            // Kërko URL në përgjigje
            if (resultData.images?.[0]?.url) {
              console.log('✅ Success!');
              return NextResponse.json({ success: true, result: resultData.images[0].url });
            }
            if (resultData.image?.url) {
              return NextResponse.json({ success: true, result: resultData.image.url });
            }
            if (resultData.output?.url) {
              return NextResponse.json({ success: true, result: resultData.output.url });
            }
            
            // Kërko çdo URL
            const str = JSON.stringify(resultData);
            const match = str.match(/"url"\s*:\s*"(https:\/\/[^"]+)"/);
            if (match) {
              return NextResponse.json({ success: true, result: match[1] });
            }

            console.log('⚠️ No URL found in result');
          }

          if (statusData.status === 'FAILED') {
            return NextResponse.json({ success: false, error: 'Generation failed' });
          }

        } catch (e) {
          console.log('Poll error:', e);
        }
      }

      return NextResponse.json({ success: false, error: 'Timeout' });
    }

    return NextResponse.json({ success: false, error: 'Unexpected response' });

  } catch (error) {
    console.error('❌ ERROR:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}