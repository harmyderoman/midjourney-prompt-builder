import './style.css';
// @ts-ignore
import typescriptLogo from './typescript.svg';
// @ts-ignore
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
      <pre id="result" class="pre-area"></pre>
      <hr />
      <div style="margin-top: 1em;">
        <label for="paramSelect">Parameter:</label>
        <select id="paramSelect">
          <option value="quality">quality</option>
          <option value="stylize">style</option>
          <option value="aspect">aspect</option>
          <option value="chaos">chaos</option>
          <option value="seed">seed</option>
          <option value="profile">profile</option>
          <option value="version">version</option>
        </select>
        <input id="paramValue" type="text" placeholder="Enter value" />
        <button id="validateParam" type="button">Validate Param</button>
        <div id="paramResult" style="margin-top: 0.5em; color: #333;"></div>
      </div>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

document.querySelector<HTMLButtonElement>('#validateParam')!.addEventListener('click', () => {
  const param = (document.querySelector<HTMLSelectElement>('#paramSelect')!.value);
  const value = (document.querySelector<HTMLInputElement>('#paramValue')!.value);
  const paramResult = document.querySelector<HTMLDivElement>('#paramResult')!;

  if (!value.trim()) {
    paramResult.textContent = 'Please enter a value for the parameter.';
    paramResult.style.color = 'red';
    return;
  }

  let valid = true;
  let message = 'Valid parameter!';

  const validator = new MJPromptBuilder();

  valid  = validator.validateOption(param, value.toLowerCase())
  message = valid ? 'Valid quality value.' : 'Invalid value';

  paramResult.textContent = message;
  paramResult.style.color = valid ? 'green' : 'red';
});

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

