// Vercel Serverless Function for Kakao Address API
export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // OPTIONS 요청 처리 (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GET 요청만 허용
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, size = 15 } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // 환경변수에서 카카오 API 키 가져오기
    const KAKAO_API_KEY = process.env.KAKAO_API_KEY;
    
    if (!KAKAO_API_KEY) {
      console.error('KAKAO_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // 카카오 주소 검색 API 호출
    const kakaoResponse = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}&size=${size}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!kakaoResponse.ok) {
      const errorText = await kakaoResponse.text();
      console.error('Kakao API error:', kakaoResponse.status, errorText);
      return res.status(kakaoResponse.status).json({ 
        error: 'Kakao API error', 
        details: errorText 
      });
    }

    const data = await kakaoResponse.json();
    
    // 응답 반환
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Kakao address API error:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
}
