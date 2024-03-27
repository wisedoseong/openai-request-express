import express from 'express'; // Express.js 라이브러리를 가져옵니다. 이 라이브러리는 웹 서버를 구축하는 데 사용됩니다.
import dotenv from 'dotenv'; // dotenv 라이브러리를 가져옵니다. 이 라이브러리는 환경 변수를 .env 파일에서 로드하는 데 사용됩니다.
import OpenAI from "openai"; // OpenAI 라이브러리를 가져옵니다. 이 라이브러리는 OpenAI API를 사용하는 데 사용됩니다.
import bodyParser from 'body-parser'; // bodyParser 라이브러리를 가져옵니다. 이 라이브러리는 요청 본문을 파싱하는 데 사용됩니다.
import cors from 'cors'; // cors 라이브러리를 가져옵니다. 이 라이브러리는 Cross-Origin Resource Sharing을 설정하는 데 사용됩니다.
import Logger from './logger.js'; // Logger 클래스를 가져옵니다. 이 클래스는 로그 메시지를 파일에 기록하는 데 사용됩니다.

dotenv.config(); // .env 파일에서 환경 변수를 로드합니다.

// OpenAIService 클래스를 정의합니다. 이 클래스는 OpenAI API를 사용하여 사용자 메시지에 대한 응답을 생성하는 역할을 합니다.
class OpenAiService {
  constructor() {
    this.app = express(); // Express.js 애플리케이션을 생성합니다.
    this.app.use(bodyParser.json()); // 요청 본문을 JSON으로 파싱하는 미들웨어를 추가합니다.
    this.app.use(cors()); // CORS를 설정하는 미들웨어를 추가합니다.
    this.openai = new OpenAI({ // OpenAI 객체를 생성합니다.
      apiKey: process.env.OPENAI_API_KEY, // 환경 변수에서 OpenAI API 키를 가져옵니다.
    });
    this.logger = new Logger(); // Logger 객체를 생성합니다.
  }

  // OpenAI API를 호출하여 사용자 메시지에 대한 응답을 생성하는 메서드입니다.
  async callOpenAIAPI(userMessage) {
    try {
      const startTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }); // 요청 시작 시간을 기록합니다.
      this.logger.log(`Request: ${userMessage}`); // 사용자 메시지를 로그에 기록합니다.

      // OpenAI API를 호출하여 응답을 생성합니다.
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4-turbo-preview", // 사용할 모델을 설정합니다.
        response_format: { "type": "json_object" }, // 응답 형식을 json_object로 설정합니다.
        messages: [ // 메시지를 설정합니다.
          {
            role: "system", // 시스템 역할을 지정합니다.
            content: `${process.env.LLM_PROMPT} output JSON.` // 시스템 메시지 내용을 설정합니다.
          },
          {
            role: "user", // 사용자 역할을 지정합니다.
            content: userMessage  // 사용자가 지정한 메시지를 설정합니다.
          }
        ],
      });

      const response = completion.choices[0].message.content; // 응답 내용을 가져옵니다.
      const endTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }); // 요청 종료 시간을 기록합니다.
      this.logger.log(`Response: ${response}`); // 응답 내용을 로그에 기록합니다.
      this.logger.log(`Request Start Time: ${startTime}`); // 요청 시작 시간을 로그에 기록합니다.
      this.logger.log(`Request End Time: ${endTime}`); // 요청 종료 시간을 로그에 기록합니다.
      this.logger.log(`\n -------------------------------- \n`); // 요청 종료 시간을 로그에 기록합니다.

      return response; // 응답 내용을 반환합니다.
    } catch (error) {
      console.error(error); // 오류를 콘솔에 기록합니다.
      this.logger.log(`Error: ${error.message}`); // 오류 메시지를 로그에 기록합니다.
      throw new Error("An error occurred while processing your request."); // 오류를 던집니다.
    }
  }

  // 라우트를 초기화하는 메서드입니다.
  initRoutes() {
    // POST /content 라우트를 추가합니다. 이 라우트는 사용자 메시지를 받아 OpenAI API를 호출하고 응답을 반환합니다.
    this.app.post('/content', async (req, res) => {
      try {
        const userMessage = req.body.message; // 요청 본문에서 사용자 메시지를 가져옵니다.
        const answer = await this.callOpenAIAPI(userMessage); // OpenAI API를 호출하여 응답을 생성합니다.
        res.send(answer); // 응답을 반환합니다.
      } catch (error) {
        res.status(500).send(error.message); // 오류가 발생하면 500 상태 코드와 오류 메시지를 반환합니다.
      }
    });
  }

  // 애플리케이션을 시작하는 메서드입니다.
  start(port) {
    this.initRoutes(); // 라우트를 초기화합니다.
    // 애플리케이션을 지정된 포트에서 시작합니다.
    this.app.listen(port, () => {
      console.log(`Application is listening on port ${port}...`); // 애플리케이션이 시작되었음을 콘솔에 기록합니다.
    });
  }
}

const port = process.env.PORT || 3000; // 환경 변수에서 포트를 가져오거나 기본값으로 3000을 사용합니다.
const openAiService = new OpenAiService(); // OpenAiService 객체를 생성합니다.
openAiService.start(port); // 애플리케이션을 시작합니다.