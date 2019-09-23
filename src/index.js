module.exports = function check(str, config) {

  let stack = [];
  
  let actions = config.reduce((actions, pair) => {

    let [opening, closing] = pair;

    if (opening === closing){

      actions[opening] = () => {
        
        if (stack.length === 0){
          stack.push(opening);
          
        } else {
          let last = stack.pop();
          
          if (last !== opening){
            stack.push(last);
            stack.push(opening);
          }
        }
      }
      
    } else if (opening !== closing){
    
      actions[opening] = () => {
        stack.push(opening);
      }
      
      actions[closing] = () => {
        if ( stack.length === 0
          || stack.pop() !== opening
        ){
          throw new Error('last !== opening');
        }
      }
    }
    
    return actions;
  }, {});

  try {
    
    str
      .split('')
      .forEach((symbol) => {
        actions[symbol]();
      });
      
    if (stack.length !== 0){
      throw new Error('length !== 0')
    }
    
  } catch (e){
    return false;
  }
  
  return true;
}