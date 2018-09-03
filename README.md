# Chevre Jobs Application

[![CircleCI](https://circleci.com/gh/toei-jp/chevre-jobs.svg?style=svg)](https://circleci.com/gh/toei-jp/chevre-jobs)

## Table of contents

* [Usage](#usage)
* [License](#license)

## Usage

### Environment variables

| Name                                         | Required              | Value         | Purpose                |
|----------------------------------------------|-----------------------|---------------|------------------------|
| `DEBUG`                                      | false                 | chevre-jobs:* | Debug                  |
| `NODE_ENV`                                   | true                  |               | Environment name       |
| `MONGOLAB_URI`                               | true                  |               | MongoDB Connection URI |
| `REDIS_PORT`                                 | true                  |               | Redis Cache Connection |
| `REDIS_HOST`                                 | true                  |               | Redis Cache Connection |
| `REDIS_KEY`                                  | true                  |               | Redis Cache Connection |
| `SENDGRID_API_KEY`                           | true                  |               | SendGrid API Key       |
| `DEVELOPER_EMAIL`                            | true                  |               | 開発者通知用メールアドレス          |
| `DEVELOPER_LINE_NOTIFY_ACCESS_TOKEN`         | true                  |               | 開発者LINE通知アクセストークン      |
| `AGGREGATE_SCREENING_EVENTS_PERIOD_IN_WEEKS` | true                  |               | 上映イベント集計期間             |
| `WEBJOBS_ROOT_PATH`                          | only on Azure WebApps | dst/jobs      |                        |

## License

ISC
