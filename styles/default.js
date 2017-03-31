// import Head from 'next/head' // TODO: Remove unused code.

export default () => (
  <style>{`
    :focus {
      outline: none;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    a {
      color: #149BCC;
      text-decoration: none;
    }

    a:hover {
      opacity: 0.7;
    }

    html, body {
      background: black;
      color: #444;
      overflow: hidden;
      font: 16px Raleway;
      margin: 0;
      width: 100%;
      height: 100%;
    }

    h1 {
      font-family: Dancing Script, cursive;
      font-weight: 400;
      color: #555;
      margin: 0 20px 20px;
      text-align: center;
      font-size: 40px;
      position: absolute;
      left: 0;
      right: 0;
      top: 20px;
      z-index: 100;
    }

    b {
      color: #eee;
    }

    p {
      line-height: 18px;
    }

    pre {
      color: palevioletred;
      font-size: 12px;
    }

    textarea {
      width: calc(100% - 25px);
      height: calc(100% - 140px);
      resize: none;
    }

    input {
      border: 1px solid #111;
      padding: 5px;
      width: 140px;
      color: #444;
      font: 14px Raleway;
    }

    #main-container {
      color: #999;
    }

    #editor-container {
      display: none;
    }

    #players-list {
      display: none;
    }

    #editor { 
      position: absolute;
      top: 56px;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0.8;
      z-index: 300;
    }

    #editor * {
      font: 12px/normal Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace;
    }

    .code-editor-btn {
      z-index: 110;
    }

    .icon-button {
      min-width: 20px;
      padding: 6px 6px;
    }

    .tr-button {
      position: absolute;
      top: 30px;
      right: 30px;
    }

    .page-content {
      margin: 100px 40px;
      text-align: center;
    }

    .error-container {
      padding: 20px;
    }

    .bg1 {
      background-color: #111;
    }

    .bg2 {
      background-color: #222;
    }

    .profile-img {
      width: 55px;
    }

    .hidden {
      display: none;
    }

    .circle-picker {
      justify-content: center;
      align-items: center;
      margin: auto !important;
      padding-bottom: 20px
    }

    .circle-picker span {
      // margin: auto;
      align-self: center;
    }

    .center {
      margin: auto;
    }

    .abs-center {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }

    .abs-bottom-center {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }

    .abs-bottom-right {
      position: absolute;
      bottom: 10px;
      right: 10px;
      margin: auto;
    }

    .abs-top-right {
      position: absolute;
      top: 10px;
      right: 10px;
      margin: auto;
    }

    .rounded {
      border-radius: 5px;
    }

    .circle {
      border-radius: 50%;
    }

    .big-content {
      width: 50%;
      height: 120px;
      border: 0;
      padding: 10px;
    }

    .full-screen {
      width: 100%;
      height: 100%;
    }

    footer {
      z-index: 100;
    }

    footer p {
      text-align: center;
      color: #555;
    }

    .appear {
      transition: 1s;
      animation-duration: 5s;
      animation-name: appear;
    }

    @keyframes appear {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    .md-btn {
      margin-right: 10px;
    }
  `}</style>
)
