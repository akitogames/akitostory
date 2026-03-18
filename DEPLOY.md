# 公開手順

このゲームは静的サイトとして出力できるようにしてあるので、`GitHub Pages` で無料公開できます。

## いちばん簡単な公開方法

1. GitHub で空の新規リポジトリを作る
2. このフォルダで `git init` を実行する
3. `git branch -M main` を実行する
4. `git remote add origin <作成したリポジトリURL>` を実行する
5. `git add .` を実行する
6. `git commit -m "Prepare public release"` を実行する
7. `git push -u origin main` を実行する
8. GitHub の `Settings > Pages` を開く
9. `Build and deployment` を `GitHub Actions` にする
10. Actions の `Deploy GitHub Pages` が完了したら公開URLにアクセスする

公開URLは通常 `https://<GitHubユーザー名>.github.io/<リポジトリ名>/` になります。

## ローカル確認

```bash
npm run build
```

成功すると `out` フォルダに公開用ファイルが生成されます。

## 補足

- GitHub Pages ではサーバー処理がない静的ゲームが無料で配信できます
- このプロジェクトは Pages のサブパス配信でも画像が壊れないようにしてあります
- 独自ドメインを使う場合は `NEXT_PUBLIC_BASE_PATH` を空にして運用できます
