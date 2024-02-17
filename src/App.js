import React, {useEffect, useRef, useState} from 'react';

import './App.css';

function App() {

  const [count, setCount] = useState(1);
  const renderCount = useRef(1);

  //ref 는 리 렌더링을 발생시키지 않음. 무한루프 방지! - 
  useEffect (() => {
    renderCount.current = renderCount.current + 1;
    console.log('렌더링 수 :', renderCount.current);
  });

  // 무한 루프 걸림 count 버튼 누르면 렌더링을 한다. 그러나 밑에 또 set 함수를 줘 렌더링을 함.  
  
  /* 
    1) -> 2) -> 3) 순으로 반복, useEffect 로 최초 렌더, 1) 실행, 2) setCount로 렌더, 3) useEffect 시켜 또 렌더...
    3) 
    useEffect (()=> {  
      console.log('렌더링'); -> 1) 
      setCount(count +1); -> 2) 
     });
  */ 

  return (
    <div>
      <p>count : {count}</p>
      <button onClick ={() => setCount(count+1)}>count Up!</button>
    </div>
  )
};

export default App;


/* 
  useRef - 변수관리
  const ref = useRef(value); {current : value}

  Component 가 Unmount 되기 전까지는 값 유지 가능. 

  변화는 감지해야 하지만, 그 변화가 렌더링을 발생시키면 안되는 어떤 값을 다룰 때


  1) 저장관리 - ref 값은 아무리 변경해도 '렌더링' 이 안됨! - 변수 값 유지 , state 값 변화가 있어도 ref 값은 그대로임
                (state는 변화 시 렌더링 되면서 컴포넌트 내부 변수들이 초기화 됨)
                변경 시 렌더링을 발생시키지 말아야 할 값을 다룰때 용이

                state 변경 = 재 렌더링! (함수형 컴포넌트 - 함수가 재 소환!)

            Ex)   function App() {

                  const [count , setCount] = useState(0);
                  const countRef = useRef(0);

                  console.log(countRef); 
                  // ★ Object 형태로 노출, {current : 0} 최신 값을 꺼내려면 선언한 변수.current를 가져와야 함. 밑의 case처럼...

                  const increaseCount = () => {
                    setCount(count+1);
                  };
                
                  ref는 아무리 버튼을 눌러도 값이 바로 안 올라가는데... 증가는 맞으나 렌더링을 안 하기 떄메 그대로 보이는 것 
                  const increaseRefCount = () => {
                    countRef.current = countRef.current + 1;
                    console.log(countRef.current);
                  };
                
                  return (    
                    <div>
                      <p>Ref : {countRef.current}</p>
                      <p>state : {count}</p>
                      <button onClick = {increaseCount}> State Up! </button>
                      <button onClick = {increaseRefCount}> Ref Up! </button>      
                    </div>
                  );                                                
                };

                export default App;
                
            ※ ref 와 var의 차이점 정리! 
                          
            Ex) 
              const [render , setRender] = useState(0);
                          
              // ref 와 var(변수) 둘다 클릭시 렌더링이 안 일어나므로 console 만 변하고 화면은 안 바뀜!
              const countRef = useRef(0); // ref는 아무리 초기화 해도 값을 유지
              let countVar = 0;
                          
              const increaseRef = () => {
                countRef.current = countRef.current + 1;
                console.log ('ref :', countRef.current);
              };
            
              const increaseVar = () => {
                countVar = countVar + 1;
                console.log ('var : ', countVar);
              };
            
              const doRender = () => {
                setRender(render + 1); // 그냥 처리 하면 ref는 올라가지만, var(변수) 는 안 올라감. 
              };
            
                렌더 - 함수가 다시 불리는 것! 
                'var'는 불릴때 마다 값이 0으로 '초기화' 가 된다
                'ref'는 아무리 Component 가 렌더링을 해도 값이 유지 된다. Mount ~ UnMount 될 때까지
              
            
              const printResult = () => {
                console.log(`ref : ${countRef.current} , var : ${countVar}`);
              };
            
              return (    
                <div>
                  <p>Ref : {countRef.current}</p>
                  <p>Var : {countVar}</p>
                  <button onClick = {doRender}>Render 하기</button>
                  <button onClick = {increaseRef}>Ref up!</button>
                  <button onClick = {increaseVar}>Var up! </button>
                  <button onClick = {printResult}>Ref, Var Print</button>
                </div>
              );
                
            Ex2) 

              const [count, setCount] = useState(1);
              const renderCount = useRef(1);

              //ref 는 리 렌더링을 발생시키지 않음. 무한루프 방지! - 
              useEffect (() => {
                renderCount.current = renderCount.current + 1;
                console.log('렌더링 수 :', renderCount.current);
              });
            
              // 무한 루프 걸림 count 버튼 누르면 렌더링을 한다. 그러나 밑에 또 set 함수를 줘 렌더링을 함.  
                1) -> 2) -> 3) 순으로 반복, useEffect 로 최초 렌더, 1) 실행, 2) setCount로 렌더, 3) useEffect 시켜 또 렌더...
                3) 
                useEffect (()=> {  
                  console.log('렌더링'); -> 1) 
                  setCount(count +1); -> 2) 
                 });
               
              return (
                <div>
                  <p>count : {count}</p>
                  <button onClick ={() => setCount(count+1)}>count Up!</button>
                </div>
              )

  2) DOM 요소 접근 - Document.querySelector 의 기능
     const ref = useRef(value);  ->   <input ref = {ref}/>

*/