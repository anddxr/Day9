var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    //..
    context: path.resolve(__dirname, 'src'),
    entry: './main.js',
    resolve:{
        alias:{
            vue:'vue/dist/vue.js'
        }
    },
    devServer:{
        contentBase: path.join(__dirname,'src'),
        compress: true,
        port: 9000
    },
    module: {
      rules: [
        {
        
             test: /\.vue$/,
             loader: 'vue-loader'
        },
         {   
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          }
      ],
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
      ]
  };