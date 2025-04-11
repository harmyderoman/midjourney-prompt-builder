import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { MJPromptBuilder } from './package';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <textarea id="promptInput" placeholder="Enter your prompt here..." rows="4" style="width: 100%;"></textarea>
      <button id="processPrompt" type="button">Process Prompt</button>
      <pre id="result" class="pre-area" ></pre>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

document.querySelector<HTMLButtonElement>('#processPrompt')!.addEventListener('click', () => {
  const input = document.querySelector<HTMLTextAreaElement>('#promptInput')!.value;
  const resultElement = document.querySelector<HTMLPreElement>('#result')!;

  if (!input.trim()) {
    resultElement.textContent = 'Please enter a valid prompt.';
    return;
  }

  try {
    const builder = new MJPromptBuilder();
    builder.fromString(input);

    const promptObject = builder.toJSON();
    resultElement.textContent = JSON.stringify(promptObject, null, 3);
  } catch (error: any) {
    resultElement.textContent = `Error: ${error.message}`;
  }
});

