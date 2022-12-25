const container = document.querySelector('#d-day-container');
const messageContainer = document.querySelector('.d-day-message');
const intervalIdArr = [];
container.style.display='none';
messageContainer.textContent='D-day를 입력해 주세요.';

const dateFormMaker = function(){
    const inputYear = document.querySelector('#target-year-input').value;
    const inputMonth = document.querySelector('#target-month-input').value;
    const inputDate = document.querySelector('#target-date-input').value;

    const dateFormat =`${inputYear}-${inputMonth}-${inputDate}`
    return dateFormat;

};
    

const countMaker = function(){
    console.log('반복실행중');
    const targetDateInput = dateFormMaker();
    const nowDate = new Date();
    const targetDate = new Date(targetDateInput).setHours(0,0,0,0);
    const remaining = (targetDate - nowDate)/ 1000;
    if(remaining <= 0){
        container.style.display='none';
        messageContainer.innerHTML = '<h3>타이머가 종료되었습니다.</h3>'
        messageContainer.style.display='flex';
        setClearInterval();
        return;
    }else if(isNaN(remaining)){
        container.style.display='none';
        messageContainer.innerHTML = '<h3>유효한 시간대가 아닙니다.</h3>'
        messageContainer.style.display='flex';
        setClearInterval();
        return;
    }



    const remainingObj ={
        remainingDate : Math.floor(remaining /3600 /24 ),
        remainingHours : Math.floor(remaining /3600)%24,
        remainingMin :  Math.floor(remaining /60) %60,
        remainingSec : Math.floor(remaining)%60
    };

    // const documentObj ={
    //     days : document.getElementById('days'),
    //     hours : document.getElementById('hours'),
    //     min : document.getElementById('min'),
    //     sec : document.getElementById('sec')
    // }

    // if(container.style.display == 'none'){
    //     container.style.display='flex'
    // }
    
    const documentArr= ['days','hours','min','sec'];
    const timeKeys = Object.keys(remainingObj);
    let a =0;
    for(let tag of documentArr){
        document.getElementById(tag).textContent=remainingObj[timeKeys[a]];
        a++;
    }
    
    
    // const docKeys = Object.keys(documentObj);
   
    // let i =0
    // for(let key in documentObj){
    //     documentObj[key].textContent = remainingObj[timeKeys[i]];
    //     i++;
    // }
}
const starter = function(){
    container.style.display ='flex';
    messageContainer.style.display='none';
    countMaker();
    const intervalId = setInterval(countMaker,1000);
    intervalIdArr.push(intervalId);
};

const setClearInterval =function(){
    container.style.display='none';
    messageContainer.style.display='flex';
    messageContainer.textContent='D-day를 입력해 주세요.';
    for(let i =0; i<intervalIdArr.length;i++){
        clearInterval(intervalIdArr[i])
    }
}