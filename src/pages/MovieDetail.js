import { Lightning, Router, Utils } from "@lightningjs/sdk";

export class MovieDetail extends Lightning.Component {
  static _template() {
    const fontSizeHeading = 32;
    const fontSizeInfo = 38;

    return {
      Background: {
        w: 1920,
        h: 1080,
        src: Utils.asset("images/background-orange.jpg"),

        BackArrow: {
          x: 10,
          y: 10,

          w: 100,
          h: 100,

          src: Utils.asset("images/arrow-back.png"),
        },

        Shadow: {
          zIndex: 1,
          color: 0x66000000,
          texture: lng.Tools.getShadowRect(560, 800, 1, 10, 15),

          mountY: 0.5,
          x: 100,
          y: 540,

          Poster: {
            w: 560,
            h: 800,
            src: "",
          },
        },

        Title: {
          x: 960,
          y: 50,
          mount: 0.5,

          text: {
            text: "",
            fontFace: "Regular",
            fontSize: 58,
            textColor: 0xffffffff,
          },
        },

        DetailsContainer: {
          w: 1100,
          h: 800,

          x: 700,
          y: 140,

          flex: {
            direction: "column",
          },

          PlotContainer: {
            flexItem: {
              grow: 2,
            },

            flex: {
              direction: "column",
            },

            PlotLabel: {
              text: {
                text: "PLOT",
                fontFace: "Regular",
                fontSize: fontSizeHeading,
                textColor: 0xff000000,
              },
            },

            Plot: {
              w: 1100,

              text: {
                text: "",
                fontFace: "Light",
                fontStyle: "Italic",
                fontSize: fontSizeInfo,
                paddingLeft: 20,
                textColor: 0xff000000,
              },
            },
          },

          ReleaseDateContainer: {
            flex: {
              direction: "column",
            },

            ReleaseDateLabel: {
              text: {
                text: "RELEASE",
                fontFace: "Regular",
                fontSize: fontSizeHeading,
                textColor: 0xff000000,
              },
            },

            ReleaseDate: {
              w: 1100,
              text: {
                text: "",
                fontFace: "Light",
                fontSize: fontSizeInfo,
                paddingLeft: 20,
                textColor: 0xff000000,
              },
            },
          },

          SimilarContainer: {
            flexItem: {
              grow: 1,
            },

            flex: {
              direction: "column",
              justifyContent: "flex-end",
            },

            SimilarLabel: {
              text: {
                text: "SIMILAR MOVIES",
                fontFace: "Regular",
                fontSize: fontSizeHeading,
                textColor: 0xff000000,
              },
            },

            SimilarImages: {
              flex: {
                direction: "row",
              },
            },
          },
        },
      },
    };
  }

  _init() {
    this._movie = null;
  }

  pageTransition() {
    return "crossFade";
  }

  set movieDetail(movieDetail) {
    this._movie = movieDetail;

    this.tag("Title").patch({
      text: {
        text: this._movie.title,
      },
    });

    this.tag("PlotContainer").patch({
      Plot: {
        text: {
          text: this._movie.overview,
        },
      },
    });

    this.tag("ReleaseDateContainer").patch({
      ReleaseDate: {
        text: {
          text: this._movie.release_date,
        },
      },
    });

    this.tag("Shadow").patch({
      Poster: {
        src: `https://image.tmdb.org/t/p/w500/${this._movie.poster_path}`,
      },
    });

    const similarMovies = this._movie.similar.results
      .splice(0, 5)
      .map((similarMovie) => {
        return {
          flexItem: {
            margin: 20,
          },

          w: 185,
          h: 278,
          src: `https://image.tmdb.org/t/p/w185/${similarMovie.poster_path}`,
          shader: { type: Lightning.shaders.Perspective, rx: Math.PI * 0.15 },
        };
      });

    this.tag("SimilarContainer").patch({
      SimilarImages: {
        children: similarMovies,
      },
    });
  }
}
