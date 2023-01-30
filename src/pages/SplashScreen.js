import { Lightning, Router, Utils } from "@lightningjs/sdk";

export class SplashScreen extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        src: Utils.asset("images/theatre.jpg"),
      },
      Title: {
        x: 960,
        y: 250,
        mount: 0.5,
        text: {
          text: "Upcoming Movies Database",
          fontSize: 64,
          fontFace: "Light",
        },
      },
      Label: {
        x: 960,
        y: 1000,
        mount: 0.5,
        text: {
          fontFace: "Regular",
          fontSize: 28,
          textColor: 0xff767676,
          text: "[ Press enter to continue ]",
        },
      },
    };
  }

  async _handleEnter() {
    Router.navigate("catalogue");
  }
}
