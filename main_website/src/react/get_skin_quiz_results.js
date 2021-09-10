'use strict';

const SkincareResult = (props) => {
  return (
    <section className="features-extended section">
      <div className="features-extended-inner section-inner">
        <div className="features-extended-wrap">
          <div className="container">
            <div className="feature-extended feature-extended-bubble">
              <div className="hero-paragraph is-revealing">
                {props.mainHeading
                  ? <h2 className="mt-0 mb-16">{props.title}</h2>
                  : <h3 className="mt-0 mb-16">{props.title}</h3>
                }
                <p>
                  {props.subText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const skinQuizKeyPrefix = "qr_"
const qrSkinTypeKey = "qr_skin_type"
const qrSkinConditionsKey = "qr_skin_conditions"

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

const _getSkincareResultsHeading = (urlParamsFromQuizObj) => {
  // Introduce main skintypes of person in heading bubble
  // qr_skin_type, qr_skin_conditions
  let title = ""
  let subText = ""
  if (qrSkinTypeKey in urlParamsFromQuizObj && qrSkinConditionsKey in urlParamsFromQuizObj ) {
    title = <p>You've told us that you have <span className="text-primary">{urlParamsFromQuizObj[qrSkinTypeKey]} skin</span> with <span className="text-primary">{urlParamsFromQuizObj[qrSkinConditionsKey]}</span></p>
    subText = <p>Here are the tips we have for you...</p>
  } else {
    title = <p>Please take the skin quiz below.</p>
    subText = <p>Here's the link: <a href="https://tripetto.app/run/EHWPX9R8UN">Skin Recommendation Quiz</a></p>
  }

  return <SkincareResult title={title} subText={subText} mainHeading={true}/>
}

const _getQuizResultsFromGSheets = (urlParamsFromQuizObj, setGSheetResults, setResultsQueried, setError) => {
  //TODO: Just got the lambda working with this in the console, but
  // its not working within react to update state.
  const body = {
    quiz_answers: ["nodulocystic acne", "poopy"]
  };
  axios.post('https://nqn3mai071.execute-api.us-east-1.amazonaws.com/prod/skin-quiz-results', body)
      .then(response => {
        setGSheetResults(response.data.quiz_results)
      })
      .catch(error => {
        setError({ errorMessage: error.message });
        console.error('There was an error!', error);
      })
      .finally(response => {
        setResultsQueried(true)
      });
}

const _getSkincareResultsBubbles = (urlParamsFromQuizObj, gSheetResults) => {
  // Get skin quiz results and display them as components
  const urlParamsFromQuizPairs = Object.entries(urlParamsFromQuizObj)

  const skincareResults = urlParamsFromQuizPairs.map(paramPair => {
    let title = <p>It looks like you have <span className="text-primary">{paramPair[1]}</span></p>;
    let subText = <p>Try out this advice...{JSON.stringify(gSheetResults)}</p>;
    return <SkincareResult title={title} subText={subText} mainHeading={false}/>;
  })
  return skincareResults
}

const SkincareResults = (props) => {
  const [error, setError] = React.useState(null);
  const [resultsQueried, setResultsQueried] = React.useState(false);
  const [gSheetResults, setGSheetResults] = React.useState([]);

  const urlParamsFromQuizObj = _getSkinQuizUrlParams(window.location.search);
  const skincareResultsHeading = _getSkincareResultsHeading(urlParamsFromQuizObj)
  const [skincareResults, setSkincareResults] = React.useState(
    [
      skincareResultsHeading,
      <SkincareResult title={"Loading results..."}/>
    ]
  );

  React.useEffect(() => {

    if (resultsQueried === false) {
      _getQuizResultsFromGSheets("", setGSheetResults, setResultsQueried, setError)
    } else {
      let retrievedSkincareResults = _getSkincareResultsBubbles(urlParamsFromQuizObj, gSheetResults)
      let newSkincareResults = [skincareResultsHeading].concat(retrievedSkincareResults)
      setSkincareResults(newSkincareResults)
    }
    console.log(`useEffect ${JSON.stringify(gSheetResults)}`)
  }, [resultsQueried])

  
  // Can't use new fragment syntax yet, babel 7 is in beta.
  return <React.Fragment>{skincareResults}</React.Fragment>;
}

const SkincareResultsViewed = <SkincareResults />

const domContainer = document.querySelector('#skincare-results');
ReactDOM.render(SkincareResultsViewed, domContainer);