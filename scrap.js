function genCodes(){
for(var i = 0; i < 10; i++){
  randomNum = Math.floor(1000 + Math.random() * 9000);
  genCode = "50Off" + randomNum;
  console.log(genCode);

};
};
genCodes();
