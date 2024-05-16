module.exports = [
    {
      mode: 'development',
      entry: './src/main.ts',
      target: 'electron-main',
      module: {
        rules: [
          {
            test: /\.ts$/,
            include: /src/,
            use: [{ loader: 'ts-loader' }]
          }
        ]
      },
      resolve: {
        extensions: ['.ts', '.js']
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
      }
    },
    {
      mode: 'development',
      entry: './src/renderer/index.tsx',
      target: 'electron-renderer',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            include: /src/,
            use: [{ loader: 'ts-loader' }]
          }
        ]
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js']
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'renderer.js'
      },
      devtool: 'source-map',
      devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000
      }
    }
  ];