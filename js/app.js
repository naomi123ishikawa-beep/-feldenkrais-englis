// フェルデンクライス英会話トレーナー - アプリロジック

const CLAUDE_MODEL = "claude-sonnet-5";
const API_KEY_STORAGE_KEY = "feldenkrais_claude_api_key";

// ---------- APIキー管理 ----------

function getApiKey() {
  return (
    localStorage.getItem(API_KEY_STORAGE_KEY) ||
    (typeof window.DEFAULT_API_KEY === "string" && window.DEFAULT_API_KEY !== "YOUR_API_KEY_HERE"
      ? window.DEFAULT_API_KEY
      : null)
  );
}

function setupSettingsModal() {
  const modal = document.getElementById("settingsModal");
  const input = document.getElementById("apiKeyInput");
  const status = document.getElementById("apiKeyStatus");

  function open() {
    input.value = localStorage.getItem(API_KEY_STORAGE_KEY) || "";
    status.textContent = "";
    modal.classList.remove("hidden");
  }
  function close() {
    modal.classList.add("hidden");
  }

  document.getElementById("settingsBtn").addEventListener("click", open);
  document.getElementById("apiKeyCancel").addEventListener("click", close);

  document.getElementById("apiKeySave").addEventListener("click", () => {
    const value = input.value.trim();
    if (!value) {
      status.textContent = "キーを入力してください。";
      return;
    }
    localStorage.setItem(API_KEY_STORAGE_KEY, value);
    status.textContent = "保存しました。";
  });

  document.getElementById("apiKeyClear").addEventListener("click", () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    input.value = "";
    status.textContent = "削除しました。自動評価はオフになります。";
  });
}

// ---------- 音声合成 (TTS) ----------

function speak(text, rate = 0.85) {
  if (!("speechSynthesis" in window)) {
    alert("このブラウザは音声合成に対応していません。");
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = rate;
  window.speechSynthesis.speak(utter);
}

// ---------- モード1: 講師に質問する ----------

function setupQuestionMode() {
  let index = 0;

  function render() {
    const item = QUESTION_ITEMS[index];
    document.getElementById("q-progress").textContent = `${index + 1} / ${QUESTION_ITEMS.length}`;
    document.getElementById("q-jp").textContent = item.jp;
    document.getElementById("q-en").textContent = item.en;
    document.getElementById("q-answer").classList.add("hidden");
  }

  document.getElementById("q-reveal").addEventListener("click", () => {
    document.getElementById("q-answer").classList.remove("hidden");
  });

  document.getElementById("q-speak").addEventListener("click", () => {
    speak(QUESTION_ITEMS[index].en);
  });

  document.getElementById("q-next").addEventListener("click", () => {
    index = (index + 1) % QUESTION_ITEMS.length;
    render();
  });

  render();
}

// ---------- モード3: 語彙 ----------

function setupVocabMode() {
  let index = 0;

  function render() {
    const item = VOCAB_ITEMS[index];
    document.getElementById("v-progress").textContent = `${index + 1} / ${VOCAB_ITEMS.length}`;
    document.getElementById("v-jp").textContent = item.jp;
    document.getElementById("v-en").textContent = item.en;
    document.getElementById("v-answer").classList.add("hidden");
  }

  document.getElementById("v-reveal").addEventListener("click", () => {
    document.getElementById("v-answer").classList.remove("hidden");
  });

  document.getElementById("v-speak").addEventListener("click", () => {
    speak(VOCAB_ITEMS[index].en);
  });

  document.getElementById("v-next").addEventListener("click", () => {
    index = (index + 1) % VOCAB_ITEMS.length;
    render();
  });

  render();
}

// ---------- モード2・4: 対話形式（感覚を伝える／日常会話） ----------

function setupConversationMode(items, prefix) {
  let index = 0;
  let recognition = null;
  let recognizing = false;

  const micBtn = document.getElementById(`${prefix}-mic`);
  const micStatus = document.getElementById(`${prefix}-mic-status`);
  const transcriptEl = document.getElementById(`${prefix}-transcript`);
  const feedbackBlock = document.getElementById(`${prefix}-feedback`);
  const feedbackLoading = document.getElementById(`${prefix}-feedback-loading`);
  const feedbackContent = document.getElementById(`${prefix}-feedback-content`);

  const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;

  function render() {
    const item = items[index];
    document.getElementById(`${prefix}-progress`).textContent = `${index + 1} / ${items.length}`;
    document.getElementById(`${prefix}-question-en`).textContent = item.questionEn;
    document.getElementById(`${prefix}-intent-jp`).textContent = item.intentJp;
    transcriptEl.textContent = "";
    micStatus.textContent = "";
    feedbackBlock.classList.add("hidden");
    feedbackContent.innerHTML = "";
    speak(item.questionEn);
  }

  document.getElementById(`${prefix}-speak-question`).addEventListener("click", () => {
    speak(items[index].questionEn);
  });

  document.getElementById(`${prefix}-next`).addEventListener("click", () => {
    index = (index + 1) % items.length;
    render();
  });

  document.getElementById(`${prefix}-retry`).addEventListener("click", () => {
    transcriptEl.textContent = "";
    micStatus.textContent = "";
    feedbackBlock.classList.add("hidden");
    feedbackContent.innerHTML = "";
  });

  if (!SpeechRecognitionCtor) {
    micStatus.textContent = "このブラウザは音声認識に対応していません（Chrome を推奨します）。";
    micBtn.disabled = true;
  } else {
    recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      recognizing = true;
      micBtn.classList.add("recording");
      micBtn.textContent = "⏹ 停止";
      micStatus.textContent = "聞いています…";
    };

    recognition.onerror = (event) => {
      micStatus.textContent = `音声認識エラー: ${event.error}`;
    };

    recognition.onend = () => {
      recognizing = false;
      micBtn.classList.remove("recording");
      micBtn.textContent = "🎤 話す";
      const finalText = transcriptEl.textContent.trim();
      if (finalText) {
        micStatus.textContent = "";
        handleAnswer(index, finalText);
      } else {
        micStatus.textContent = "うまく聞き取れませんでした。もう一度お試しください。";
      }
    };

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      transcriptEl.textContent = text;
    };

    micBtn.addEventListener("click", () => {
      if (recognizing) {
        recognition.stop();
        return;
      }
      transcriptEl.textContent = "";
      feedbackBlock.classList.add("hidden");
      feedbackContent.innerHTML = "";
      try {
        recognition.start();
      } catch (e) {
        micStatus.textContent = "音声認識を開始できませんでした。";
      }
    });
  }

  const feedbackLabel = document.getElementById(`${prefix}-feedback-label`);

  async function handleAnswer(itemIndex, transcript) {
    const apiKey = getApiKey();
    const item = items[itemIndex];

    if (!apiKey) {
      showComparison(item, transcript);
      return;
    }

    feedbackLabel.textContent = "Claude からのフィードバック";
    feedbackBlock.classList.remove("hidden");
    feedbackLoading.classList.remove("hidden");
    feedbackContent.innerHTML = "";

    try {
      const result = await callClaudeEvaluation(apiKey, {
        questionEn: item.questionEn,
        intentJp: item.intentJp,
        modelAnswerEn: item.modelAnswerEn,
        transcript,
      });
      renderFeedback(result);
    } catch (err) {
      feedbackContent.innerHTML = `<p>評価中にエラーが発生しました: ${escapeHtml(err.message)}</p>`;
    } finally {
      feedbackLoading.classList.add("hidden");
    }
  }

  // APIキー未設定時: 自分の発話と模範解答を並べて見比べるだけの表示（API呼び出しなし・無料）
  function showComparison(item, transcript) {
    feedbackLabel.textContent = "自分の発話と模範解答を見比べてみましょう";
    feedbackBlock.classList.remove("hidden");
    feedbackContent.innerHTML = `
      <div class="feedback-item">
        <div class="fi-title">あなたの発話</div>
        <div>${escapeHtml(transcript)}</div>
      </div>
      <div class="feedback-item">
        <div class="fi-title">模範解答（一例）</div>
        <div>${escapeHtml(item.modelAnswerEn)}</div>
      </div>
      <p class="modal-note">⚙ でAPIキーを設定すると、Claudeによる自動評価（意図の一致・不自然な点・自然な提案）が使えるようになります。</p>
    `;
  }

  function renderFeedback(result) {
    feedbackContent.innerHTML = `
      <div class="feedback-item">
        <div class="fi-title">① 意図に合っているか</div>
        <div>${escapeHtml(result.intent_match)}</div>
      </div>
      <div class="feedback-item">
        <div class="fi-title">② 通じるけれど不自然な点</div>
        <div>${escapeHtml(result.unnatural_points)}</div>
      </div>
      <div class="feedback-item">
        <div class="fi-title">③ より自然な言い方の提案</div>
        <div>${escapeHtml(result.suggestions)}</div>
      </div>
    `;
  }

  render();
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

// ---------- Claude API 呼び出し ----------

async function callClaudeEvaluation(apiKey, { questionEn, intentJp, modelAnswerEn, transcript }) {
  const prompt = `あなたはフェルデンクライスのレッスンを英語で受けている日本語話者の生徒を助ける、やさしい英会話コーチです。
以下の情報をもとに、生徒の発話を評価してください。

- 講師の質問（英語）: ${questionEn}
- 生徒が伝えたかった意図（日本語）: ${intentJp}
- 参考となる自然な模範解答（英語、あくまで一例）: ${modelAnswerEn}
- 生徒の実際の発話（音声認識結果、英語）: ${transcript}

評価の方針:
- 完全一致では判定しない。意味が通じていれば正解とみなす、柔らかい評価にする。
- 通じるが不自然な箇所があれば具体的に指摘する。なければ「特にありません」と書く。
- より自然な言い方を1〜2案、簡潔に提示する。
- フィードバックは日本語で、励ますトーンで書く。

必ず次のJSON形式のみを出力してください。前置きや説明文、コードブロックの記号は一切付けないでください。

{"intent_match": "...", "unnatural_points": "...", "suggestions": "..."}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API呼び出しに失敗しました (${response.status}): ${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  const rawText = data.content && data.content[0] && data.content[0].text ? data.content[0].text : "";

  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("応答を解析できませんでした。");
  }
  return JSON.parse(jsonMatch[0]);
}

// ---------- モード切り替え ----------

function setupModeNav() {
  const tabs = document.querySelectorAll(".mode-tab");
  const panels = document.querySelectorAll(".mode-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const mode = tab.dataset.mode;
      tabs.forEach((t) => t.classList.toggle("active", t === tab));
      panels.forEach((p) => p.classList.toggle("active", p.id === `mode-${mode}`));
      window.speechSynthesis.cancel();
    });
  });
}

// ---------- 初期化 ----------

document.addEventListener("DOMContentLoaded", () => {
  setupSettingsModal();
  setupModeNav();
  setupQuestionMode();
  setupConversationMode(DIALOGUE_ITEMS, "d");
  setupConversationMode(DAILY_ITEMS, "n");
  setupVocabMode();
});
