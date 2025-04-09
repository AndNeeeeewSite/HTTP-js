//                       pnotify
import { alert, notice, info, success, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});
//               Code 
input = document.querySelector('#search')
input.addEventListener('input',_.debounce(function(){
    console.log(input.value)
    if(input.value == " " || input.value == undefined){
      PNotify.alert({
        text: 'Print name of country!'
      });
    }
    else{
      fetch('https://restcountries.com/v2/name/' + input.value )
      .then(response => {
        if (!response.ok) {
          throw new Error('Offline');
        }
        return response.json();
      })
      .then(data => {
        if(data.length > 10){
          PNotify.error({
            text: 'Too many matches found. Please enter a more specific query!'
          });
          
        }
        else{
          console.log(data)
          
          document.querySelector('.main-out').remove()
          div = document.createElement('div')
          div.classList.add('main-out')
          document.querySelector('main').append(div)
          if(data.length === 1){
            console.log(data.length)
            country = data[0]
            //       Main Div
            divMain = document.createElement('div')
            divMain.classList.add('divMain')
            //     Country name
            item = document.createElement('h2')
            item.textContent = country.name
            item.style.textAlign = 'center'
            divMain.append(item)
            //       Main Info Div
            mainInfoDiv = document.createElement('div')
            mainInfoDiv.classList.add('mainInfoDiv')
            divMain.append(mainInfoDiv  )
            //     Info Div
            infoDiv = document.createElement('div')
            infoDiv.classList.add('infoDiv')
            mainInfoDiv.append(infoDiv)

            //        County capital
            capital = document.createElement('h2')
            capital.innerHTML = '<span>Capital: </span> ' + country.capital
            infoDiv.append(capital)
            //        County population
            population = document.createElement('h2')
            population.innerHTML = '<span>Population: </span> ' + country.population
            infoDiv.append(population)
            //        County language
            languages = document.createElement('h2')
            languages.innerHTML = '<span>Languages: </span> '
            infoDiv.append(languages)
            langUl = document.createElement('ul')
            languages = country.languages
            for(lang of languages){
              langName = lang.name
              langLi = document.createElement('li')
              langTitle = document.createElement('h2')
              langTitle.textContent = langName
              langLi.append(langTitle)
              langUl.append(langLi)
            }
            infoDiv.append(langUl)
            console.log(languages)
            //   Country flag
            image = document.createElement('img')
            image.src = country.flags.png
            mainInfoDiv.append(image)

            console.log(divMain)
            // Final add
            document.querySelector('.main-out').append(divMain)
          }
          else{
            for(country of data){
              item = document.createElement('h2')
              item.textContent = country.name
              document.querySelector('.main-out').append(item)
  
            }
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

},500))