const HtmlWebPackPlugin    = require('html-webpack-plugin');
const MiniCssExtract       = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");

module.exports = {

  mode: "development",

  output: {
    clean: true,
  },

  module: {
    rules: [
      //Sirven para decirle que hacer con los distintos tipos de archivo
      {
        //Es la condición que debe cumplir, se usan expresiones regulares
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: false,
          minimize: false,
        },
      },
      {
        test: /\.css$/i,
        exclude: /styles.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles.css$/i,
        use: [MiniCssExtract.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  //Aquí se ejecuta la instancia que hemos creado antes para que copie el index html de la carpeta src a dist para cuando se suba a producción
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtract({
      //filename: '[name].[fullhash].css',
      filename: "[name].css",
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets/", to: "assets/" },
      ],
    }),
  ],
};