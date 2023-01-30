import { Lightning, Utils, Router } from "@lightningjs/sdk";

export class MovieCatalogue extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        src: Utils.asset("images/background-purple.jpg"),

        Title: {
          x: 50,
          y: 40,

          text: {
            text: "Upcoming Movies",
            fontFace: "Regular",
            fontSize: 58,
            textColor: 0xffffffff,
          },
        },

        Movie: {
          mount: 0.5,
          x: 960,
          y: 580,

          w: 1820,
          h: 900,

          Poster: {
            zIndex: 2,
            mountX: 0.5,
            x: 910,

            w: 560,
            h: 800,
            alpha: 1,
            src: "",
          },

          Title: {
            mountX: 0.5,
            x: 910,
            y: 820,

            text: {
              text: "",
              color: 0xff000000,
            },
          },
        },

        Counter: {
          x: 1310,
          y: 900,
          mount: 0.5,

          flex: {
            direction: "row",
          },

          Current: {
            text: {
              text: "",
              fontFace: "Regular",
              fontStyle: "Bold",
              fontSize: 32,
              textColor: 0xff000000,
            },
          },

          Total: {
            text: {
              text: "",
              fontFace: "Light",
              fontSize: 32,
              textColor: 0xff000000,
            },
          },
        },

        ArrowLeft: {
          mountY: 0.5,

          x: 500,
          y: 540,

          w: 100,
          h: 100,

          visible: false,
          src: Utils.asset("images/arrow-left.png"),
        },

        ArrowRight: {
          mountY: 0.5,

          x: 1320,
          y: 540,

          w: 100,
          h: 100,

          visible: true,
          src: Utils.asset("images/arrow-right.png"),
        },

        EnterText: {
          mountX: 0.5,
          x: 960,
          y: 1010,

          text: {
            text: "[ Enter for details ]",
            fontFace: "Light",
            fontSize: 28,
            textColor: 0xffd1a170,
          },
        },
      },
    };
  }

  _init() {
    this._movies = [];
    this._index = 0;

    this.tag("ArrowLeft")
      .animation({
        duration: 2,
        repeat: -1,
        actions: [
          {
            p: "alpha",
            v: {
              0: 0.01,
              0.5: 0.5,
              1: 0.01,
            },
          },
          {
            p: "x",
            v: {
              0: 500,
              0.5: 460,
              1: 500,
            },
          },
        ],
      })
      .start();

    this.tag("ArrowRight")
      .animation({
        duration: 2,
        repeat: -1,
        actions: [
          {
            p: "alpha",
            v: {
              0: 0.01,
              0.5: 0.5,
              1: 0.01,
            },
          },
          {
            p: "x",
            v: {
              0: 1320,
              0.5: 1360,
              1: 1320,
            },
          },
        ],
      })
      .start();
  }

  set movies(movies) {
    this._movies = movies.results;
    this.showMovie(this._movies[this._index]);
  }

  showMovie(movie) {
    this.tag("Movie").patch({
      alpha: 0.01,

      Poster: {
        src: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      },

      Title: {
        text: {
          text: movie.title,
        },
      },

      smooth: {
        alpha: [1, { duration: 2 }],
      },
    });

    this.tag("Counter").patch({
      Current: {
        text: {
          text: this._index + 1,
        },
      },
      Total: {
        text: {
          text: ` / ${this._movies.length}`,
        },
      },
    });
  }

  _handleRight() {
    if (this._index < this._movies.length - 1) {
      this._index = this._index + 1;
      const movie = this._movies[this._index];
      this.showMovie(movie);

      this.updateArrowVisibility();
    }
  }

  _handleLeft() {
    if (this._index > 0) {
      this._index = this._index - 1;
      const movie = this._movies[this._index];
      this.showMovie(movie);

      this.updateArrowVisibility();
    }
  }

  updateArrowVisibility() {
    if (this._index == 0) {
      this.tag("ArrowLeft").patch({
        visible: false,
      });
    } else if (this._index == this._movies.length - 1) {
      this.tag("ArrowRight").patch({
        visible: false,
      });
    } else {
      this.tag("ArrowLeft").patch({
        visible: true,
      });
      this.tag("ArrowRight").patch({
        visible: true,
      });
    }
  }

  _handleEnter() {
    Router.navigate(`details/${this._movies[this._index].id}`);
  }

  pageTransition() {
    return "crossFade";
  }
}
