/**
* @fn : 要执行的函数
* @delay : 执行执行函数的时间间隔
* @immediate : 是否立即执行函数 true 表立即执行，false 表非立即执行
*/        

function debounce(fn,delay,immediate = false){
  let timer; 
  return function(...args){ // 形成闭包  外部执行的函数其实是这个return出去的函数。
      let context = this; // this 为函数执行时的this绑定。
      timer&&clearTimeout(timer); // 当函数再次执行时，清除定时器，让定时器重新开始计时
      // immediate为true 表示第一次触发就执行
      if(immediate){
          // 执行一次之后赋值为false  
          immediate = false;
          fn.apply(context, args)
      }
      // 利用定时器，让指定函数延迟执行。
      timer = setTimeout(function(){
          // immediate 赋值为true  下次输入时 还是会立即执行
          immediate = true;
          // 执行传入的指定函数，利用apply更改传入函数内部的this绑定，传入 args参数
          fn.apply(context,args);
      },delay)
  }
}


/**
* @fn : 要执行的函数
* @delay : 每次执行函数的时间间隔
*/  
function throttle(fn,delay){
  let timer; 
  let prevTime; // 记录上一次执行的时间
  return function(...args){
      let currTime = Date.now(); // 获取当前时间时间戳
      let context = this;
      if(!prevTime) prevTime = currTime; // 第一次执行时prevTime赋值为当前时间      
      timer&&clearTimeout(timer); // 每次都清除定时器，保证定时器只是在最后一次执行    
      if(currTime - prevTime > delay){ // 如果为true ，则表示两次执行函数的时间间隔为delay.
          prevTime = currTime;
          fn.apply(context,args);
           clearTimeout(timer); // 清除定时器。用来处理假如函数停止调用时刚好函数也停止执行，不需要获取后续的值。 详见下面定时器的介绍。
          return;
      }
  // 当上面执行currTime - prevTime > delay 为false时，执行定时器。
  // 用来处理：假如下次函数执行时间未到，函数不继续调用了，会造成最后一次函数执行 到 最后一次函数调用之间的值获取不到。
      timer = setTimeout(function(){
          prevTime = Date.now();
          timer = null;
          fn.apply(context,args);
      },delay);
  }
}

module.exports = {
  debounce: debounce,
  throttle:throttle 
}