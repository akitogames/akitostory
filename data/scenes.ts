export interface Choice {
  text: string;
  nextScene: string;
}

export interface SceneData {
  id: string;
  image: string;
  lines: string[];
  choices?: Choice[];
  autoNext?: string;
  isEnd?: boolean;
}

export const scenes: Record<string, SceneData> = {
  scene1: {
    id: 'scene1',
    image: 'scene1',
    lines: [
      '午前2時。アキトはまた画面を見つめていた。',
      '今月の課金額——312,000円。',
      '「あと1回だけ……あと1回だけ引けば、きっと来る」',
      'その言い訳を、一体何百回繰り返しただろう。',
      'カードの残高通知が届いた。無視した。',
    ],
    choices: [
      { text: 'もう1回課金する', nextScene: 'scene1_yes' },
      { text: 'やめる', nextScene: 'scene1_no' },
    ],
  },

  scene1_yes: {
    id: 'scene1_yes',
    image: 'scene1',
    lines: [
      'アキトは迷わずボタンを押した。',
      '画面に光が弾ける。',
      '——またハズレだった。',
    ],
    autoNext: 'scene2',
  },

  scene1_no: {
    id: 'scene1_no',
    image: 'scene1',
    lines: [
      'やめようとした。本当に、やめようとした。',
      'しかし眠れなかった。',
      '朝になっても昼になっても——指は止まらなかった。',
    ],
    autoNext: 'scene2',
  },

  scene2: {
    id: 'scene2',
    image: 'scene2',
    lines: [
      '3ヶ月後。アキトの総借金額は1,000万円を超えた。',
      '家賃を半年滞納し、アパートを追い出された。',
      '食費は1日500円。友人からの連絡は、もう来なくなった。',
      'それでも、課金は止まらなかった。',
    ],
    choices: [
      { text: '誰かに相談する', nextScene: 'scene2_yes' },
      { text: '一人で抱えるしかない', nextScene: 'scene2_no' },
    ],
  },

  scene2_yes: {
    id: 'scene2_yes',
    image: 'scene2',
    lines: [
      '「最近、ちょっと金欠で……」',
      'アキトは笑って誤魔化した。',
      '1,000万円の借金を、正直に話せるはずがなかった。',
    ],
    autoNext: 'scene3',
  },

  scene2_no: {
    id: 'scene2_no',
    image: 'scene2',
    lines: [
      'そうだ。これは自分の問題だ。',
      '自分で何とかするしかない。',
      '……でも、どうやって？',
    ],
    autoNext: 'scene3',
  },

  scene3: {
    id: 'scene3',
    image: 'scene3',
    lines: [
      '督促状が毎日届くようになった。',
      'クレジットカードは全て使用停止。',
      '消費者金融からも、もう借りられない。',
      '会社には借金取りから電話がかかってきた。',
      '1週間後、アキトは解雇された。',
      '所持金：0円。行き場所：なし。',
      '追い詰められたアキトは、ある噂を思い出した。',
      '——金さえ払えば、誰でも戦えるリングがある、と。',
    ],
    autoNext: 'scene4',
  },

  scene4: {
    id: 'scene4',
    image: 'scene4',
    lines: [
      '地下に続く薄暗い階段。',
      '饐えた空気。群衆の怒号。',
      '「勝てば10万円。負ければ——分かってるな？」',
      '差し出された契約書に、アキトはサインした。',
      'リングの中央に立つ。',
      '対戦相手の男は、明らかに鍛え抜かれていた。',
    ],
    choices: [
      { text: '戦う', nextScene: 'scene4_fight' },
      { text: '逃げる', nextScene: 'scene4_run' },
    ],
  },

  scene4_fight: {
    id: 'scene4_fight',
    image: 'scene4',
    lines: [
      'アキトは震える手で拳を構えた。',
      '——もう、これしかない。',
    ],
    autoNext: 'scene5',
  },

  scene4_run: {
    id: 'scene4_run',
    image: 'scene4',
    lines: [
      '逃げようとした。',
      'しかし出口は、大男によって塞がれていた。',
      '「逃げ場はないぞ」',
    ],
    autoNext: 'scene5',
  },

  scene5: {
    id: 'scene5',
    image: 'scene5',
    lines: [
      '最初の一撃で、視界が歪んだ。',
      '二撃目で膝が崩れた。',
      '三撃目——床に叩きつけられた。',
      '起き上がれなかった。',
      '群衆の声が遠くなっていく。',
      '息ができない。',
      '痛みさえも、消えていく。',
      '……',
      '……',
      '……',
    ],
    autoNext: 'scene6',
  },

  scene6: {
    id: 'scene6',
    image: 'scene6',
    lines: [
      '「あきと！　あきと！！」',
      '母親の声。',
      '目が開いた。天井がある。自分の部屋だ。',
      '汗でシャツがびっしょりと濡れている。',
      '夢……だったのか。',
      'スマホが光った。',
      '【今月の課金額：312,000円】',
      'まだ、終わっていない。',
      'このまま続ければ——あの夢は、現実になる。',
    ],
    autoNext: 'scene7',
  },

  scene7: {
    id: 'scene7',
    image: 'scene7',
    lines: [
      'アキトはスマホを見つめた。',
      '課金アプリを開こうとした、その時。',
      '一件の通知が届いた。',
      '「アキト更生BOT：毎週の課金額を記録して、月末に振り返りましょう。あなたのお金は、もっと大切なことに使えます」',
    ],
    choices: [
      { text: 'アキト更生BOTを使う', nextScene: 'scene_good' },
      { text: '通知を閉じる', nextScene: 'scene_bad' },
    ],
  },

  scene_good: {
    id: 'scene_good',
    image: 'scene_good',
    lines: [
      'アキトはアプリを開いた。',
      '使い方はシンプルだった。',
      '毎週、課金した金額を入力する——それだけ。',
      '月末になると、1ヶ月の合計額が表示される。',
      'そして——その金額で、何ができたかを教えてくれる。',
      '「今月の課金額312,000円は、半年間の食費に相当します」',
      '「312,000円あれば、国内旅行に10回以上行けました」',
      'アキトは画面を見つめたまま、長い時間が過ぎた。',
      '翌週、初めて課金額を入力した。',
      '先月より、少し少ない数字だった。',
      '小さな一歩。',
      'でも——確かな一歩だった。',
    ],
    autoNext: 'end_good',
  },

  end_good: {
    id: 'end_good',
    image: 'scene_good',
    lines: [
      '―― GOOD END ――\n\nアキトの更生は、始まったばかりだ。',
    ],
    isEnd: true,
  },

  scene_bad: {
    id: 'scene_bad',
    image: 'scene_bad',
    lines: [
      'アキトは通知を閉じた。',
      'そして、いつものアプリを開いた。',
      '「あと1回だけ……」',
      'また、同じ言葉が浮かぶ。',
      'あの夢の続きを、また見るかもしれない。',
      '——今度は、夢じゃないかもしれない。',
    ],
    autoNext: 'end_bad',
  },

  end_bad: {
    id: 'end_bad',
    image: 'scene_bad',
    lines: [
      '―― BAD END ――\n\n気づいた時には、もう遅いかもしれない。',
    ],
    isEnd: true,
  },
};
