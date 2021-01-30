import Head from 'next/head';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName ] = React.useState('');
  return (
    <>
    <Head>
      <title>BBB Quiz</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <QuizBackground backgroundImage={ db.bg }>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>O quanto você manja de BBB?</h1>
          </Widget.Header>  
          <Widget.Content>
            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`)
              console.log('fazendo submissão via react')
              }} 
            >
              <Input 
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="me diz seu nome :)" 
              />
              <Button 
                type="submit" 
                disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.')
                return(
                  <li key={linkExterno}>
                    <Widget.Topic 
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                )  
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/kpmnta" />
    </QuizBackground>
    </>
  );
}
