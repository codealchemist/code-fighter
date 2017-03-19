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

    body {
      background: black;
      color: #444;
      overflow: hidden;
      font: 16px Raleway;
      margin: 0;
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
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0.8;
      z-index: 200;
    }

    .page-content {
      margin: 100px 40px;
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
      color: #555;
      z-index: 100;
    }

    footer p {
      text-align: center;
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
  `}</style>
)