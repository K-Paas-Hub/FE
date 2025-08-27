// Vercel Serverless Function for Kakao Address API
export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // OPTIONS 요청 처리 (preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // GET 요청만 허용
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query, size = 15 } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    // 환경변수에서 카카오 API 키 가져오기
    let KAKAO_API_KEY = process.env.KAKAO_API_KEY;

    console.log("Environment check:", {
      hasApiKey: !!KAKAO_API_KEY,
      apiKeyLength: KAKAO_API_KEY ? KAKAO_API_KEY.length : 0,
      apiKeyPrefix: KAKAO_API_KEY
        ? KAKAO_API_KEY.substring(0, 10) + "..."
        : "none",
    });

    if (!KAKAO_API_KEY) {
      console.error("KAKAO_API_KEY environment variable is not set");
      return res.status(500).json({
        error: "API key not configured",
        message: "KAKAO_API_KEY environment variable is missing",
      });
    }

    // API 키 형식 정리 (KakaoAK 접두사 제거 또는 추가)
    if (KAKAO_API_KEY.startsWith("KakaoAK ")) {
      KAKAO_API_KEY = KAKAO_API_KEY.substring(8); // "KakaoAK " 제거
    }
    
    // Authorization 헤더에 KakaoAK 접두사 추가
    const authorizationHeader = `KakaoAK ${KAKAO_API_KEY}`;

    const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
      query
    )}&size=${size}`;

    console.log("Making request to:", apiUrl);
    console.log("Authorization header:", authorizationHeader.substring(0, 20) + "...");

    // 카카오 주소 검색 API 호출
    const kakaoResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: authorizationHeader,
        "Content-Type": "application/json",
      },
    });

    console.log("Kakao API response status:", kakaoResponse.status);

    if (!kakaoResponse.ok) {
      const errorText = await kakaoResponse.text();
      console.error("Kakao API error:", kakaoResponse.status, errorText);
      return res.status(kakaoResponse.status).json({
        error: "Kakao API error",
        status: kakaoResponse.status,
        details: errorText,
      });
    }

    const data = await kakaoResponse.json();
    console.log(
      "Kakao API success, results count:",
      data.documents?.length || 0
    );

    // 응답 반환
    res.status(200).json(data);
  } catch (error) {
    console.error("Kakao address API error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}
