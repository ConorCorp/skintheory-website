'use strict';

const skinQuizKeyPrefix = "qr_"
const qrSkinTypeKey = "qr_skin_type"
const qrSkinConditionsKey = "qr_skin_conditions"
const skinTraitGSheetsKey = "Skin Trait"
const adviceKey = "Advice "
const gSheetLambdaUrl = 'https://nqn3mai071.execute-api.us-east-1.amazonaws.com/prod/skin-quiz-results'

const _get_valid_quiz_url_params_dict = (urlParams) => {
  const quiz_result_params = {};
  for(let entry of urlParams.entries()) {
    if (entry[0].startsWith(skinQuizKeyPrefix) && entry[1] !== "") {
      quiz_result_params[entry[0]] = entry[1]
    } 
  }
  return quiz_result_params
}

const _getSkinQuizUrlParams = (queryString) => {
  // Get qr_ params from url and return [[qr_key, value], ...]
  const urlParams = new URLSearchParams(queryString);
  const quizResultParams = _get_valid_quiz_url_params_dict(urlParams);
  return quizResultParams
}

const SkincareResult = (props) => {
  const mainId = props.mainHeading ? "main-bubble" : "";

  return (
    <section className="features-extended section" id={mainId}>
      <div className="features-extended-inner section-inner">
        <div className="features-extended-wrap">
          <div className="container">
            <div className="feature-extended feature-extended-bubble">
              <div className="hero-paragraph">  {/*is-revealing*/}
                {props.mainHeading
                  ? <h2 className="mt-0 mb-16">{props.title}</h2>
                  : <h3 className="mt-0 mb-16">{props.title}</h3>
                }
                <p>{props.subText}</p>
                {props.bottomContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const _getSkincareResultsHeading = (urlParamsFromQuizObj) => {
  // Introduce main skintypes of person in heading bubble
  // qr_skin_type, qr_skin_conditions
  let title = ""
  let subText = ""
  const skincareResultsHeadings = []
  if (qrSkinTypeKey in urlParamsFromQuizObj && qrSkinConditionsKey in urlParamsFromQuizObj) {
    title = <React.Fragment><span style={{fontSize: "75%"}}>You're skin type:</span> <br/><span className="text-primary">{urlParamsFromQuizObj[qrSkinTypeKey]}</span> with <span className="text-primary">{urlParamsFromQuizObj[qrSkinConditionsKey]}</span>.</React.Fragment>
    subText = <React.Fragment>Here are some tips to help you start<br/>your skin journey right.</React.Fragment>
    let loadingText = "Loading results..."
    skincareResultsHeadings.push(<SkincareResult title={loadingText} key={loadingText}/>)
  } else {
    title = <React.Fragment>Please take the skin quiz below.</React.Fragment>
    subText = <React.Fragment>Here's the link: <a href="https://tripetto.app/run/EHWPX9R8UN">Skin Recommendation Quiz</a></React.Fragment>
  }
  let arrayKey = title.props.children[0].props.children
  skincareResultsHeadings.unshift(<SkincareResult title={title} subText={subText} mainHeading={true} key={arrayKey}/>)
  return skincareResultsHeadings
}

const _getUrlParamInGSheetKeyFormat = (paramPair) => {
  return String(paramPair[0]+":"+paramPair[1]).toLowerCase()
}

const _getQuizResultsFromGSheets = (urlParamsFromQuizPairs, setGSheetResults, setResultsQueried, setError) => {
  // Get Answers For Quiz Results From Our Google Sheet

  const body = {
    quiz_answers: urlParamsFromQuizPairs.map(paramPair => {
      return _getUrlParamInGSheetKeyFormat(paramPair)
    })
  };
  //TODO: Remove before production
  // const quizResults = [
  //       {
  //           "Skin Trait": "qr_acne_type:papular/pustular00000",
  //           "Advice 1": "Benzoyl Peroxide start at 3% will want to avoid the higher percentage BPs with sensative skin.",
  //           "Advice 2": "",
  //           "Advice 3": "",
  //           "Advice 4": "",
  //           "Advice 5": ""
  //       },
  //       {
  //           "Skin Trait": "qr_skin_type:sensitive skin",
  //           "Advice 1": "Wash your face every morning, evening, and after exercising.",
  //           "Advice 2": "Keep baths/showers short, avoid using very hot water.",
  //           "Advice 3": "Be gentle with your skin, try and avoid vigorous scrubbing as this will irritate the skin and potentially make it worse.",
  //           "Advice 4": "Avoid harsh facial washes/scrubs. Many people with oily skin believe they need something \"strong\" to cut through the oil. In fact, gentle washes (and gentle washing!) will be better for your skin. Irritated skin can actually produce more oils and exacerbate the issue!",
  //           "Advice 5": "Wear sunscreen! Avoid sunscreens with fragrances or oils. The AADA recommends looking for sunscreens that contain zinc oxide and titanium dioxide."
  //       },
  //       {
  //           "Skin Trait": "qr_skin_conditions:acne",
  //           "Advice 1": "",
  //           "Advice 2": "",
  //           "Advice 3": "",
  //           "Advice 4": "",
  //           "Advice 5": ""
  //       }
  //     ]
  // const quizResultsMap = new Map(quizResults.map(i => [i[skinTraitGSheetsKey], i]));
  // setGSheetResults(quizResultsMap)
  // setResultsQueried(true)
  // Forced to use promises due to babel's shitty transpiling (hrs of work put in this OOF)
  axios.post(gSheetLambdaUrl, body)
      .then(response => {
        const quizResults = response.data.quiz_results
        const quizResultsMap = new Map(quizResults.map(i => [i[skinTraitGSheetsKey], i]));
        setGSheetResults(quizResultsMap)
      })
      .catch(error => {
        setError({ errorMessage: JSON.stringify(error.message) });
      })
      .finally(response => {
        setResultsQueried(true)
      });
}

const _printAdvices = (gSheetResults, bubbleParamPair) => {
  const thisBubblesAdvice = gSheetResults.get(_getUrlParamInGSheetKeyFormat(bubbleParamPair))
  const advices = Object.entries(thisBubblesAdvice).filter(paramPair => {
    return paramPair[0].startsWith(adviceKey) && paramPair[1] !== "";
  })
  const formattedAdviceComponents = advices.map(paramPair => {
    return <li key={paramPair[0]}><span className="advice">{paramPair[0]}:</span> {paramPair[1]}</li>
  })
  return <ul className="skin-advice-list">{formattedAdviceComponents}</ul>
}

const _getSkincareResultsBubbles = (urlParamsFromQuizPairs, gSheetResults) => {
  // Get skin quiz results and display them as components
  const skincareResults = urlParamsFromQuizPairs.map(paramPair => {
    const gSheetKey = _getUrlParamInGSheetKeyFormat(paramPair)
    if (gSheetResults.has(gSheetKey) &&
        gSheetResults.get(gSheetKey)[adviceKey+"1"] !== "") {
      let title = <React.Fragment>For <span className="text-primary">{paramPair[1]}</span></React.Fragment>;
      let bottomContent = <React.Fragment>{_printAdvices(gSheetResults, paramPair)}</React.Fragment>;
      return <SkincareResult title={title} bottomContent={bottomContent} mainHeading={false} key={paramPair[1]}/>;
    }
  })
  return skincareResults
}

const SkincareResults = (props) => {
  const [error, setError] = React.useState(null);
  const [resultsQueried, setResultsQueried] = React.useState(false);
  const [gSheetResults, setGSheetResults] = React.useState(new Map());

  const urlParamsFromQuizObj = _getSkinQuizUrlParams(window.location.search);
  const urlParamsFromQuizPairs = Object.entries(urlParamsFromQuizObj)
  const skincareResultsHeadings = _getSkincareResultsHeading(urlParamsFromQuizObj)

  const [skincareResults, setSkincareResults] = React.useState(skincareResultsHeadings);

  React.useEffect(() => {
    if (resultsQueried === false) {
      _getQuizResultsFromGSheets(urlParamsFromQuizPairs, setGSheetResults, setResultsQueried, setError)
    } else {
      let retrievedSkincareResults;
      if (error) {
        let loadingErrorText = "Loading results...Error"
        let loadingErrorSubText = <React.Fragment>Please retake the quiz, try again later, or email <a>support@skintheory.app.</a><br/><i>{error.errorMessage}</i></React.Fragment>
        retrievedSkincareResults = <SkincareResult title={loadingErrorText} subText={loadingErrorSubText} key={loadingErrorText}/>
      } else {
        retrievedSkincareResults = _getSkincareResultsBubbles(urlParamsFromQuizPairs, gSheetResults)
      }
      const newSkincareResults = [skincareResults.slice(0, 1)].concat(retrievedSkincareResults) // Remove first "Loading..." bubble
      setSkincareResults(newSkincareResults)
    }
  }, [resultsQueried])

  // Can't use new fragment syntax yet, babel 7 is in beta.
  return <React.Fragment>{skincareResults}</React.Fragment>;
}

const SkincareResultsViewed = <SkincareResults />

const domContainer = document.querySelector('#skincare-results');
ReactDOM.render(SkincareResultsViewed, domContainer);