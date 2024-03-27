# openai-request-express

이 프로젝트는 Express.js를 사용하여 서버를 생성하고, OpenAI API를 호출하여 정보를 받아오는 기능을 제공합니다. 학습용으로 만들어진 프로젝트입니다.

## 프로젝트 구성

- `app.js`: Express.js 애플리케이션의 메인 파일입니다. 서버 설정, 라우팅, OpenAI API 호출 등의 기능을 담당합니다.
- `logger.js`: 로그 메시지를 파일에 기록하는 Logger 클래스를 정의합니다.

## 설치 및 실행

1. 프로젝트를 clone 받습니다.

```bash
git clone https://github.com/wisedoseong/openai-request-express.git
```

2. 프로젝트 디렉토리로 이동합니다.

```bash
cd openai-request-express
```

3. 필요한 패키지를 설치합니다.

```bash
npm install
```

4. `.env` 파일을 생성하고, 필요한 환경 변수를 설정합니다.

```
OPENAI_API_KEY=your_openai_api_key
LLM_PROMPT=your_llm_prompt
PORT=3000
```

5. 애플리케이션을 실행합니다.

```bash
npm start
```

애플리케이션이 지정된 포트(기본값: 3000)에서 실행됩니다.

## API 호출 예시

다음은 OpenAI API를 호출하는 예시 코드입니다.

```javascript
const headersList = {
  "Content-Type": "application/json"
}

const bodyContent = JSON.stringify({
  "message": "GTP에게 전달할 프롬프트"
});

const response = await fetch("http://localhost:3000/content", {
  method: "POST",
  body: bodyContent,
  headers: headersList
});

const data = await response.text();
console.log(data);
```

위 코드에서 `message` 필드에 GPT에게 전달할 프롬프트를 입력하고, `http://localhost:3000/content` 엔드포인트로 POST 요청을 보내면 OpenAI API를 통해 응답을 받을 수 있습니다.

## 로깅

`logger.js` 파일에 정의된 Logger 클래스를 사용하여 요청과 응답, 오류 등의 로그 메시지를 파일에 기록할 수 있습니다. 로그 파일은 `./log` 디렉토리에 년/월/일/시간.log 형식으로 저장됩니다.

## 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE)를 따릅니다.

## 기여

버그 리포트, 기능 요청, 코드 기여 등 모든 형태의 기여를 환영합니다.
