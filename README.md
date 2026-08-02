# pg-leaptrail

街機風**躍階旅人**：短關平台跳躍、撿星踩敵、抵達旗幟。純前端，無建置步驟。

名稱、關卡與角色為原創小品，致敬「平台跳躍」玩法類型，非任一商業作品復刻。

也可當作 [Playgrounds（遊樂場）](https://samkuo.me/playgrounds/) 的 **SAM**（`index.html` 入口）。手感或關卡想再磨？開進來玩，再叫 AI 幫你改一版。

## 一鍵開 SAM 小

**[一鍵開 SAM 小](https://samkuo.me/playgrounds/?open=sampot%2Fpg-leaptrail&name=%E8%BA%8D%E9%9A%8E%E6%97%85%E4%BA%BA)**

```
https://samkuo.me/playgrounds/?open=sampot/pg-leaptrail&name=躍階旅人
```

同源會重用本機已匯入的沙盒；要強制新建可加 `&fresh=1`。

## 試玩（本機）

```bash
npx --yes serve .
# 或
python3 -m http.server 8080
```

點一下頁面後音效才會出聲。

## 操作

| 操作 | 說明 |
| --- | --- |
| ← →／A D | 移動 |
| 空白／↑／W | 跳躍 |
| 觸控左半／右半 | 移動／跳躍 |
| 出發 | 開始／下一關／再來 |
| 音效開／關 | 靜音 |
| 重來 | 分數與關卡歸零 |

## 檔案

| 檔案 | 說明 |
| --- | --- |
| `index.html` | 結構 |
| `styles.css` | 亮／暗色主題 |
| `app.js` | 迴圈、輸入、場景 |
| `game.js` | 物理、關卡、碰撞 |
| `sprites.js` | 角色與場景繪製 |
| `audio.js` | Web Audio 合成音效 |
| `functions.js` | Playgrounds 可選 stub |

## License

MIT
