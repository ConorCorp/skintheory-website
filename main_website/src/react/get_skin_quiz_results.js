'use strict';

const skinQuizKeyPrefix = "qr_"
const qrSkinTypeKey = "qr_skin_type"
const qrSkinConditionsKey = "qr_skin_conditions"
const skinTraitGSheetsKey = "Skin Trait"
const adviceKey = "Advice "

const _get_valid_quiz_url_params_dict = (urlParams) => {
  const quiz_result_params = {};
  for(let entry of urlParams.entries()) {
    if (entry[0].startsWith(skinQuizKeyPrefix)) quiz_result_params[entry[0]] = entry[1]
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
  return (
    <section className="features-extended section">
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
  if (qrSkinTypeKey in urlParamsFromQuizObj && qrSkinConditionsKey in urlParamsFromQuizObj) {
    title = <React.Fragment><span style={{fontSize: "75%"}}>You're skin type:</span> <br/><span className="text-primary">{urlParamsFromQuizObj[qrSkinTypeKey]}</span> with <span className="text-primary">{urlParamsFromQuizObj[qrSkinConditionsKey]}</span>.</React.Fragment>
    subText = <React.Fragment>Here are the tips we have for this skin type<br/> to help you get started on your journey.</React.Fragment>
  } else {
    title = <React.Fragment>Please take the skin quiz below.</React.Fragment>
    subText = <React.Fragment>Here's the link: <a href="https://tripetto.app/run/EHWPX9R8UN">Skin Recommendation Quiz</a></React.Fragment>
  }

  return <SkincareResult title={title} subText={subText} mainHeading={true}/>
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
  // Forced to use promises due to babel's shitty transpiling (hrs of work put in this OOF)
  axios.post('https://nqn3mai071.execute-api.us-east-1.amazonaws.com/prod/skin-quiz-results', body)
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

  console.log(thisBubblesAdvice)
  console.log(`thisBubblesAdvice`)
  console.log(gSheetResults)
  console.log(`gSheetResults`)
  
  //TODO: Error check: if we can't .get a key
  const advices = Object.entries(thisBubblesAdvice).filter(paramPair => {
    return paramPair[0].startsWith(adviceKey) && paramPair[1] !== "";
  })
  console.log(advices)
  console.log(`String(advices) ${String(advices)}`)

  return String(advices)
}

const _getSkincareResultsBubbles = (urlParamsFromQuizPairs, gSheetResults) => {
  // Get skin quiz results and display them as components
  console.log(urlParamsFromQuizPairs)

  const skincareResults = urlParamsFromQuizPairs.map(paramPair => {
    if (gSheetResults.has(_getUrlParamInGSheetKeyFormat(paramPair))) {
      let title = <React.Fragment>For <span className="text-primary">{paramPair[1]}</span></React.Fragment>;
      let subText = <React.Fragment>{_printAdvices(gSheetResults, paramPair)}</React.Fragment>;
      return <SkincareResult title={title} subText={subText} mainHeading={false}/>;
    }
  })
  return skincareResults
}

const SkincareResults = (props) => {
  const [error, setError] = React.useState(null);
  const [resultsQueried, setResultsQueried] = React.useState(false);
  const [gSheetResults, setGSheetResults] = React.useState(new Map());

  const urlParamsFromQuizObj = _getSkinQuizUrlParams(window.location.search);
  const skincareResultsHeading = _getSkincareResultsHeading(urlParamsFromQuizObj)
  const urlParamsFromQuizPairs = Object.entries(urlParamsFromQuizObj)

  const [skincareResults, setSkincareResults] = React.useState(
    [
      skincareResultsHeading,
      <SkincareResult title={"Loading results..."}/>
    ]
  );

  React.useEffect(() => {
    if (resultsQueried === false) {
      _getQuizResultsFromGSheets(urlParamsFromQuizPairs, setGSheetResults, setResultsQueried, setError)
    } else {
      let retrievedSkincareResults;
      if (error) {
        retrievedSkincareResults = <SkincareResult title={"Loading results...Error"} subTitle={error.errorMessage}/>
      } else {
        retrievedSkincareResults = _getSkincareResultsBubbles(urlParamsFromQuizPairs, gSheetResults)
      }
      const newSkincareResults = [skincareResultsHeading].concat(retrievedSkincareResults)
      setSkincareResults(newSkincareResults)
    }
  }, [resultsQueried])

  // Can't use new fragment syntax yet, babel 7 is in beta.
  return <React.Fragment>{skincareResults}</React.Fragment>;
}

const SkincareResultsViewed = <SkincareResults />

const domContainer = document.querySelector('#skincare-results');
ReactDOM.render(SkincareResultsViewed, domContainer);