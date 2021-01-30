import React from 'react';
// import Router from 'next/router';
import Widget from '../Widget';
import TwitterIcon from '../TwitterIcon';
import { useRouter } from 'next/router';

export default function ResultWidget({ results }) {
    const router = useRouter();
    const { name } = router.query;
    const respostasCorretas = results.filter((respostas) => respostas).length;
    const share = `https://twitter.com/intent/tweet?text=Fiz%20o%20quiz%20do%20BBB%20e%20acertei%20${respostasCorretas}%20perguntas!%20Faça%20você%20também:%20https://BBBquiz.kpmnta.vercel.app%20:)%20@AluraOnline`;

    return(
        <Widget>
            <Widget.Header>
                {`Pronte para conferir seu resultado? ;)`}
            </Widget.Header>
            <Widget.Content>
                <p>{name}, você acertou {' '}
                    {results.filter((result) => result).length} perguntas!</p>
                <ul>
                    { results.map((result, index) => (
                        <li>
                         #0{index + 1} Resultado:
                         { result === true ? 'Acertou' : 'Errou'} 
                         </li>
                    )) }
                </ul>
                <p style={{textAlign: 'center'}}>Compartilhe seu resultado!</p>
                <TwitterIcon style={{margin: '0 auto'}} href={ share }/> 
            </Widget.Content>
        </Widget>
    );
}