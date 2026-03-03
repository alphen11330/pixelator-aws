# Pixelator AWS - ドット絵変換アプリ × AWSサーバーレス構成

## 概要

画像をドット絵に変換するWebアプリケーションをAWSのサーバーレスアーキテクチャで構築・運用したポートフォリオです。フロントエンドの開発からAWSインフラの設計・構築・監視設定まで一人で実施しました。

**公開URL**: https://d38jm9ln3gkebu.cloudfront.net

---

## 使用AWSサービス（8サービス）

| サービス | 用途 |
|---|---|
| Amazon S3 | 静的ファイルホスティング・変換済み画像保存 |
| Amazon CloudFront | HTTPS配信・CDNによる高速化 |
| Amazon API Gateway | REST APIの公開（/save・/history） |
| AWS Lambda | サーバーレスバックエンド（Python 3.12） |
| Amazon DynamoDB | 変換履歴のメタデータ保存（オンデマンドモード） |
| AWS IAM | Lambda実行ロール・最小権限設計 |
| Amazon CloudWatch | Lambdaエラー監視・アラーム設定 |
| Amazon SNS | エラー発生時のメール通知 |

---

## システム構成
```
ユーザー
  ↓ HTTPS
CloudFront（CDN・HTTPS配信）
  ↓
S3（pixelator-frontend-001）
  Next.js静的エクスポート

ユーザー（ダウンロードボタン押下）
  ↓ POST /save
API Gateway
  ↓ トリガー
Lambda（pixelator-history-handler）
  ↓              ↓
S3            DynamoDB
（画像・パレット保存） （履歴メタデータ記録）

CloudWatch（Lambdaエラー監視）
  ↓ アラーム発火
SNS → メール通知
```

---

## フロントエンド技術スタック

| 技術 | バージョン |
|---|---|
| Next.js | 15 |
| React | 19 |
| TypeScript | 最新 |
| OpenCV.js | 最新 |
| Tailwind CSS | v4 |

---

## 主な機能

### フロントエンド
- 画像アップロード・リアルタイムドット絵変換
- ピクセルサイズ調整
- 14種類のディザリングアルゴリズム
- カラーパレット編集（メディアンカット法）
- プリセット17種類
- 日英切替

### バックエンド（AWS）
- ダウンロード時に変換済み画像・パレットをS3に自動保存
- DynamoDBに変換履歴を記録
- GET /history で履歴一覧を取得可能
- Lambdaエラー発生時にCloudWatch→SNS→メール通知

---

## AWSインフラ設計のポイント

### コスト最適化
- Lambdaのサーバーレス構成により、リクエストがない時間は課金なし
- DynamoDBはオンデマンドモードで使った分だけ課金
- CloudFrontの無料枠（1TB/月・1000万リクエスト/月）を活用
- リージョンはus-east-1（最安値）を選択

### セキュリティ
- S3バケットはCloudFrontからのアクセスのみ許可
- IAMロールは最小権限の原則に従い必要な権限のみ付与
- API GatewayでHTTPS通信を強制

### 監視・運用
- CloudWatchアラームでLambdaエラーを即時検知
- SNSによるメール通知で障害対応を自動化
- DynamoDBでデータ永続化・履歴管理

---

## AWSへのデプロイ手順
```bash
# ビルド
npm run build

# S3にアップロード
aws s3 sync out/ s3://pixelator-frontend-001 --delete

# CloudFrontキャッシュ削除
aws cloudfront create-invalidation --distribution-id EMD5F8CBB91WB --paths "/*"
```

---

## API仕様

### POST /save
```json
// リクエスト
{ "image": "base64データ", "palette": "#1a2b3c,#ff0000" }

// レスポンス
{ "id": "uuid", "timestamp": "2026-03-03T14:10:32", "imageKey": "images/uuid.png", "paletteKey": "palettes/uuid.pal" }
```

### GET /history
```json
// レスポンス
{ "items": [{ "id": "uuid", "timestamp": "...", "imageKey": "...", "paletteKey": "..." }] }
```
