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
        text: 'Notice me, senpai!'
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
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

},500))