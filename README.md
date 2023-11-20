## 概要

Reactを使って作成したSPA形式のメモアプリです。

メモの作成・閲覧・編集・削除が可能です。

メモの保存には`localStorage`を使用しています。

## インストール

1. `git clone`を実行してローカルに複製。

```
$ git clone https://github.com/junohm410/react-practice-memoapp.git
```

2. `react-practice-memoapp`ディレクトリに移動。

```
$ cd react-practice-memoapp
```

3. `mpm install`を実行。

```
$ npm install
```

## 実行

1. `npm start`を実行。

```
$ npm start
```

2. `localhost:3000`がブラウザで開かれ、アプリが使える状態になります。

## 使い方

### ログイン / ログアウト状態の切り替え

画面上部のボタンでログイン/ログアウト状態を切り替えることができます。

- ログイン状態
  - メモの選択と、選択したメモの全文の閲覧が可能です。
- ログアウト状態
  - ログイン状態での機能に加え、メモの追加と、選択したメモの編集・削除が可能です。

### メモの追加

ログイン時に`+`ボタンをクリックすることで、メモの新規作成画面に移行します。

テキストエリアに入力し、追加ボタンを押すことでメモを保存できます。

追加されたメモの1行目が、メモ一覧でのタイトルとして使用されます。

![EiDfessXws](https://github.com/junohm410/react-practice-memoapp/assets/128765400/ec07efcb-78c2-4c5d-a147-e919010de053)

### メモの選択・編集

メモ一覧のタイトルをクリックすることで、任意のメモの全文を閲覧できます。

ログイン時はテキストエリアへの入力が可能になり、編集ボタンを押すことでメモを更新できます。

![PXPTAdVJA7](https://github.com/junohm410/react-practice-memoapp/assets/128765400/5ac7f0cf-3b08-49fe-b253-ba4bb61ada54)

### メモの削除

ログイン時は、メモ閲覧状態で削除ボタンをクリックすることで、そのメモを削除できます。

![m1wDKypgjy](https://github.com/junohm410/react-practice-memoapp/assets/128765400/8f3c6dbd-d98f-439f-9a85-344b38992897)
