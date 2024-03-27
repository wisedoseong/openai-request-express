import fs from 'fs'; // 파일 시스템 모듈을 가져옵니다. 이 모듈은 파일을 읽고 쓰는 등의 작업을 수행합니다.
import path from 'path'; // 경로 관련 유틸리티를 제공하는 모듈을 가져옵니다.

// Logger 클래스를 정의합니다. 이 클래스는 로그 메시지를 파일에 기록하는 역할을 합니다.
class Logger {
  constructor() {
    this.logDir = './log'; // 로그 파일이 저장될 디렉토리를 설정합니다.
  }

  // 현재 시간에 해당하는 로그 파일의 경로를 반환하는 메서드입니다.
  getLogFilePath() {
    const now = new Date(); // 현재 시간을 가져옵니다.
    const year = String(now.getFullYear()); // 현재 년도를 가져옵니다.
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 현재 월을 가져옵니다. 월은 0부터 시작하므로 1을 더해줍니다.
    const day = String(now.getDate()).padStart(2, '0'); // 현재 일을 가져옵니다.
    const hour = String(now.getHours()).padStart(2, '0'); // 현재 시간을 가져옵니다.

    // 로그 파일이 저장될 디렉토리 경로를 생성합니다.
    const logDir = path.join(this.logDir, year, month, day);
    // 해당 경로의 디렉토리가 존재하지 않으면 생성합니다.
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // 로그 파일의 전체 경로를 생성합니다.
    const logFilePath = path.join(logDir, `${hour}.log`);
    return logFilePath; // 로그 파일 경로를 반환합니다.
  }

  // 메시지를 로그 파일에 기록하는 메서드입니다.
  log(message) {
    const logFilePath = this.getLogFilePath(); // 로그 파일의 경로를 가져옵니다.
    const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });// 현재 시간의 타임스탬프를 가져옵니다.
    const logMessage = `[${timestamp}] ${message}\n`; // 로그 메시지를 생성합니다.

    // 로그 메시지를 파일에 추가합니다.
    fs.appendFileSync(logFilePath, logMessage);
  }
}

export default Logger; // Logger 클래스를 내보냅니다. 이 클래스는 다른 모듈에서 import하여 사용할 수 있습니다.