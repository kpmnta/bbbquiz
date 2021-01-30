import React from 'react';
import styled from 'styled-components';
import QuizContainer from '../../components/QuizContainer';
import QuizBackground from '../../components/QuizBackground';
import QuizLogo from '../../components/QuizLogo';
import Widget from '../../components/Widget';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';

function ResultWidget({ results }) {
    return(
        <Widget>
            <Widget.Header>
                Seu resultado
            </Widget.Header>
            <Widget.Content>
                <p>Você acertou {' '}
                    {results.filter((result) => result).length} perguntas</p>
                <ul>
                    { results.map((result, index) => (
                        <li>
                         #0{index + 1} Resultado:
                         { result === true ? 'Acertou' : 'Errou'} 
                         </li>
                    )) }
                </ul>
            </Widget.Content>
        </Widget>
    );
}

function Loading() {
    return(
        <Widget>
            <Widget.Header>
                Você está pronte?
            </Widget.Header>
        </Widget>
    );
}

function QuestionWidget({ question, totalQuestions, questionIndex, onSubmit, addResult }) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState(false);
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;

    return(
        <Widget>
            <Widget.Header>
                <h3>{`Pergunta ${ questionIndex + 1 } de ${totalQuestions}`}</h3>
            </Widget.Header>
            <img
                alt="descrição"
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                }} 
                src={ question.image }
            />
            <Widget.Content>
                <h2>{ question.title }</h2>
                <p>{ question.description }</p>
                <AlternativesForm onSubmit={(event) =>{
                    event.preventDefault();
                    setIsQuestionSubmitted(true);
                    setTimeout(() => {
                        addResult(isCorrect);
                        onSubmit();
                        setIsQuestionSubmitted(false);
                        setSelectedAlternative(undefined);
                    },2 * 1000);
                }}
                >
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`;
                        const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                        const isSelected = selectedAlternative === alternativeIndex;
                        return (
                            <Widget.Topic 
                                as="label"
                                key={ alternativeId }
                                htmlFor={ alternativeId }
                                data-selected={ isSelected }
                                data-status={ isQuestionSubmitted && alternativeStatus }
                            >
                                <input 
                                    style={{ display: 'none'}}
                                    id={ alternativeId }
                                    type="radio"
                                    name={ questionId }
                                    onClick={() => setSelectedAlternative(alternativeIndex)}
                                />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}
                    <Button type="submit" disabled={ !hasAlternativeSelected }>Confirmar</Button>
                    {isQuestionSubmitted && isCorrect && <p>Você acertou!</p>}
                    {isQuestionSubmitted && !isCorrect && <p>Você errou!</p>}
                </AlternativesForm>
            </Widget.Content>    
        </Widget>
    );    
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING', 
    RESULT: 'RESULT',
}

export default function QuizPage({ externalQuestions, externalBg }) {
    const [screenState, setScreenState] = React.useState(screenStates.QUIZ);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [results, setResults] = React.useState([]);
    const totalQuestions = externalQuestions.length;
    const questionIndex = currentQuestion;
    const question = externalQuestions[questionIndex];
    const bg = externalBg;

    function addResult(result) {
        setResults([
            ...results,
            result,
        ]);
    }

    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ)
        }, 1 * 1000);
    }, []);

    function handleSubmit() {
        const nextQuestion = questionIndex + 1;
        if (nextQuestion < totalQuestions) {
            setCurrentQuestion(questionIndex + 1);
        } else {
            setScreenState(screenStates.RESULT);
        }
    }

    return(
        <QuizBackground backgroundImage={ bg }>
            <QuizContainer>
                <QuizLogo />
                
                {screenState === screenStates.QUIZ && (
                    <QuestionWidget 
                    question={ question }
                    questionIndex={ questionIndex }
                    totalQuestions={ totalQuestions }
                    onSubmit={ handleSubmit }
                    addResult={ addResult }
                />
                )}
                {screenState === screenStates.LOADING && <Loading />}
                {screenState === screenStates.RESULT && <ResultWidget results={ results }/>}
            </QuizContainer>
        </QuizBackground>
    );
}