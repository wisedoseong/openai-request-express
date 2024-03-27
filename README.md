# openai-request-express
openai 에 프롬프트를 전달 하는 express 코드

## Request
```
const headersList = {
 "Content-Type": "application/json"
}

const bodyContent = JSON.stringify({
  "message" : "GTP에게 전달할 프롬프트"
});

const response = await fetch("http://localhost:8080/content", { 
  method: "POST",
  body: bodyContent,
  headers: headersList
});

const data = await response.text();
console.log(data);
```
