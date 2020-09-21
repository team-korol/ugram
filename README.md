# Ugram
<img width="200" src="https://user-images.githubusercontent.com/45055030/93709558-18ddea80-fb7a-11ea-8c8e-43a6ca6c59e7.png">

## Ugramについて🙌
### モチベージョン🔥
関連動画が表示されることで、気がついたら無限に時間が消費される
↓
関連動画の表示されないyoutube playerがあればHAPPYなのでは？
### 特徴😎
自分のサブスクライブしているチャンネルの動画だけを表示することにフォーカスすることで、ほんとにみたいものだけを見れるようにしました
### 機能🥳
- 自分のサブスクライブしているチャンネルの最新50件の表示
- 自分のサブスクライブしているチャンネルのplaylistの表示
- 検索(urlに共有用のリンクを貼ることで、その動画を一件だけ検索することもできます)


# for korol developer💻
## 資料📓
基本的な資料は[こちら](https://docs.google.com/presentation/d/1UJl2CFMmurC_wt9SLFuVZiBxP_5TB-rRGzrfhM0_4gQ/edit#slide=id.g53564326cf_0_55)にあります。  
権限がない場合は、slack等でご連絡ください

## 構成について📌
create-react-app(以後CRA)の構成で動くように作っています。

## ルール📝
- pages配下にはなるべくpathにしたがって、フォルダを作成していきます！  
`:id`と言ったページの場合は`_id`としてください。  
理由としては、CRAで使えるcss-modulesの設定では、  
`[fileName]_[className]__[Hash]`となってしまい、  
`:`をつけたfile名ではcssのclass名としては不適説になるためです。
`eject`して`localIdentName`を変更したり、  
`react-app-rewire`を用いて上書きすることもできますが  
reactのアップデート等で問題が発生した時のリスクを鑑みて`_`とすることにしました.
- そのほかは、現在の構成に合わせて作成していただけると幸いです🙇‍♂️

# 以下CRAした際のreadmeをそのまま載せてます

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
