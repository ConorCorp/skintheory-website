const _getQuizResultsFromGSheets = (urlParamsFromQuizPairs, setGSheetResults, setResultsQueried, setError) => {
    // Get Answers For Quiz Results From Our Google Sheet
  
    const body = {
      quiz_answers: urlParamsFromQuizPairs.map(paramPair => {
        return _getUrlParamInGSheetKeyFormat(paramPair)
      })
    };
    const quizResults = [
          {
              "Skin Trait": "qr_acne_type:papular/pustular00000",
              "Advice 1": "Benzoyl Peroxide start at 3% will want to avoid the higher percentage BPs with sensative skin.",
              "Advice 2": "",
              "Advice 3": "",
              "Advice 4": "",
              "Advice 5": ""
          },
          {
              "Skin Trait": "qr_skin_type:sensitive skin",
              "Advice 1": "Wash your face every morning, evening, and after exercising.",
              "Advice 2": "Keep baths/showers short, avoid using very hot water.",
              "Advice 3": "Be gentle with your skin, try and avoid vigorous scrubbing as this will irritate the skin and potentially make it worse.",
              "Advice 4": "Avoid harsh facial washes/scrubs. Many people with oily skin believe they need something \"strong\" to cut through the oil. In fact, gentle washes (and gentle washing!) will be better for your skin. Irritated skin can actually produce more oils and exacerbate the issue!",
              "Advice 5": "Wear sunscreen! Avoid sunscreens with fragrances or oils. The AADA recommends looking for sunscreens that contain zinc oxide and titanium dioxide."
          },
          {
              "Skin Trait": "qr_skin_conditions:acne",
              "Advice 1": "",
              "Advice 2": "",
              "Advice 3": "",
              "Advice 4": "",
              "Advice 5": ""
          }
        ]
    const quizResultsMap = new Map(quizResults.map(i => [i[skinTraitGSheetsKey], i]));
    setGSheetResults(quizResultsMap)
    setResultsQueried(true)
}
