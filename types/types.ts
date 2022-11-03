export interface BuildEnv {
  mode: "production" | "development";
  port: number;
}

export interface Config {
  mode: "production" | "development";
  entry: string;
  output: {
    filename: string;
    path: string;
    clean: boolean;
    publicPath: string;
    pathinfo: boolean;
  };
  devtool: string | undefined;
  devServer:
    | {
        static: string;
        open: boolean;
        hot: boolean;
        port: number;
        proxy: [
          {
            context: string;
            target: string;
          }
        ];
      }
    | undefined;
  plugins: unknown[];
  optimization: {
    moduleIds: string;
    runtimeChunk: string;
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: unknown;
          name: string;
          chunks: string;
        };
      };
    };
  };
  module: { rules: unknown[] };
  resolve: {
    extensions: string[];
    preferAbsolute: boolean;
    modules: string[];
    mainFiles: string[];
    alias: {};
  };
}
