import https from 'https';
import chalk from 'chalk';
import { log } from 'console';


const getJoke=()=>{
    const url='https://official-joke-api.appspot.com/random_joke';
    https.get(url,(response)=>{
        let data="";
        response.on('data',(chunk)=>{
            data+=chunk;
        });
        response.on('end', ()=>{
            const joke=JSON.parse(data);
    
            console.log(chalk.blue (joke.setup));
            console.log(chalk.red.bold (joke.punchline));
        })
    })
}
getJoke();
