// フェルデンクライス英会話トレーナー - 教材データ
// すべてオリジナルで作成。IFF Amherst Year トランスクリプトの文章は複製していません。
// （語彙・構文の「傾向」を掴む参照としてのみ使用し、本文は独自に書き下ろしています）

// ---- モード1: 講師に質問する ----
// jp: 伝えたい意図（日本語） / en: 模範解答となる英語の質問
const QUESTION_ITEMS = [
  {
    jp: "この動きは椅子に座ったままやるのか、床でやるのか確認したい。",
    en: "Should we do this movement sitting in the chair, or on the floor?",
  },
  {
    jp: "もう一度、もっとゆっくり見せてもらえるか頼みたい。",
    en: "Could you show that again, more slowly?",
  },
  {
    jp: "これは仰向けでやるのか、うつ伏せでやるのか聞きたい。",
    en: "Is this done lying on the back, or on the stomach?",
  },
  {
    jp: "途中で痛みを感じたらどうすればいいか聞きたい。",
    en: "What should I do if I feel pain during this movement?",
  },
  {
    jp: "利き手側だけやるのか、両方やるべきか確認したい。",
    en: "Should I do this on my dominant side only, or both sides?",
  },
  {
    jp: "このパートは何回くらい繰り返すのか聞きたい。",
    en: "About how many times should we repeat this part?",
  },
  {
    jp: "膝を曲げる角度はどのくらいが良いか聞きたい。",
    en: "How much should I bend my knees for this?",
  },
  {
    jp: "目を閉じてやった方がいいか聞きたい。",
    en: "Is it better to do this with my eyes closed?",
  },
];

// ---- モード2: 感覚を伝える（対話形式） ----
// questionEn: 講師の英語の問いかけ / intentJp: 答えの意図（日本語） / modelAnswerEn: 自然な英語の模範解答
const DIALOGUE_ITEMS = [
  {
    questionEn: "Do you notice any difference between the right side and the left side?",
    intentJp: "はい、右側の方が重く感じる、と伝えたい。",
    modelAnswerEn: "Yes, the right side feels heavier than the left.",
  },
  {
    questionEn: "Which side moves more easily for you right now?",
    intentJp: "左側の方が動かしやすいと伝えたい。",
    modelAnswerEn: "The left side moves more easily right now.",
  },
  {
    questionEn: "Where do you feel the most contact with the floor?",
    intentJp: "肩甲骨のあたりが一番床に触れていると伝えたい。",
    modelAnswerEn: "I feel the most contact around my shoulder blades.",
  },
  {
    questionEn: "Has anything changed since we started?",
    intentJp: "呼吸が最初より楽になったと伝えたい。",
    modelAnswerEn: "Yes, my breathing feels easier than when we started.",
  },
  {
    questionEn: "Are you able to let go of any effort in your neck?",
    intentJp: "はい、少し力が抜けた気がすると伝えたい。",
    modelAnswerEn: "Yes, I feel like I can let go a little more in my neck.",
  },
  {
    questionEn: "How is your breathing right now — easy, or a little held?",
    intentJp: "少し息を止めてしまっている気がすると伝えたい。",
    modelAnswerEn: "I think I'm holding my breath a little.",
  },
  {
    questionEn: "Does your head feel heavier on one side than the other?",
    intentJp: "右側の方が頭が重く感じると伝えたい。",
    modelAnswerEn: "My head feels heavier on the right side.",
  },
  {
    questionEn: "Is it easier to roll to the right, or to the left?",
    intentJp: "右に転がる方が簡単だと伝えたい。",
    modelAnswerEn: "It's easier for me to roll to the right.",
  },
  {
    questionEn: "Do you feel more length on one side of your body?",
    intentJp: "左側の方が長く伸びている感じがすると伝えたい。",
    modelAnswerEn: "I feel more length on my left side.",
  },
  {
    questionEn: "Is your lower back touching the floor, or is there a gap?",
    intentJp: "少し隙間があると伝えたい。",
    modelAnswerEn: "There's a small gap under my lower back.",
  },
];

// ---- モード4: 日常会話（挨拶など） ----
// questionEn: 講師の英語での声かけ / intentJp: 答えの意図（日本語） / modelAnswerEn: 自然な英語の模範解答
const DAILY_ITEMS = [
  {
    questionEn: "Hi! How are you doing today?",
    intentJp: "元気です、ありがとう、と伝えたい。",
    modelAnswerEn: "I'm doing well, thank you. How about you?",
  },
  {
    questionEn: "Did you find the studio okay?",
    intentJp: "はい、迷わずに来られました、と伝えたい。",
    modelAnswerEn: "Yes, I found it without any trouble.",
  },
  {
    questionEn: "Sorry I'm running a few minutes late.",
    intentJp: "大丈夫です、気にしないでください、と伝えたい。",
    modelAnswerEn: "No problem at all, don't worry about it.",
  },
  {
    questionEn: "Would you like some water before we start?",
    intentJp: "はい、お願いします、と伝えたい。",
    modelAnswerEn: "Yes, please, that would be great.",
  },
  {
    questionEn: "How was your week?",
    intentJp: "忙しかったけれど良い一週間でした、と伝えたい。",
    modelAnswerEn: "It was busy, but a good week overall.",
  },
  {
    questionEn: "Does the same time next week work for you?",
    intentJp: "はい、大丈夫です、と伝えたい。",
    modelAnswerEn: "Yes, that works for me.",
  },
  {
    questionEn: "Thanks for coming in today.",
    intentJp: "こちらこそ、ありがとうございました、と伝えたい。",
    modelAnswerEn: "Thank you, I really enjoyed it.",
  },
  {
    questionEn: "Do you have any questions before we finish?",
    intentJp: "いいえ、特にありません、と伝えたい。",
    modelAnswerEn: "No, I don't have any questions right now.",
  },
  {
    questionEn: "Is the room temperature okay for you?",
    intentJp: "はい、ちょうどいいです、と伝えたい。",
    modelAnswerEn: "Yes, it's just right, thank you.",
  },
  {
    questionEn: "Take care, see you next time.",
    intentJp: "はい、また次回よろしくお願いします、と伝えたい。",
    modelAnswerEn: "You too, see you next time.",
  },
];

// ---- モード3: 語彙 ----
const VOCAB_ITEMS = [
  { jp: "骨盤", en: "pelvis" },
  { jp: "肋骨", en: "rib cage" },
  { jp: "重心", en: "center of weight" },
  { jp: "呼吸", en: "breathing" },
  { jp: "力を抜く / 力を解放する", en: "to release effort" },
  { jp: "仰向け", en: "lying on your back" },
  { jp: "うつ伏せ", en: "lying on your stomach" },
  { jp: "横向き", en: "lying on your side" },
  { jp: "床に触れる・接触する", en: "to make contact with the floor" },
  { jp: "動かしやすさ", en: "ease of movement" },
  { jp: "左右差", en: "difference between right and left" },
  { jp: "ゆっくり", en: "slowly" },
  { jp: "もう一度", en: "one more time" },
  { jp: "変化", en: "change" },
  { jp: "心地よい", en: "comfortable / pleasant" },
  { jp: "肩甲骨", en: "shoulder blade" },
  { jp: "頭を転がす", en: "to roll the head" },
  { jp: "膝を曲げる", en: "to bend the knee" },
  { jp: "隙間（床との）", en: "a gap (from the floor)" },
  { jp: "軽さ", en: "lightness" },
];
