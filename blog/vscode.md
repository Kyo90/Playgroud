### 解决vscode下默认node版本不对的问题，以及使用avn设置某个项目默认node版本

>>> Apparently the default shellArgs for osx are set to bash while I’m using zsh. I solved the problem by setting the shellArgs in my user settings to an empty array:

"terminal.integrated.shellArgs.osx": []

意思就是，你们都没解决我的问题，我用的zsh，在vscode的settings里加一句"terminal.integrated.shellArgs.osx": []就好了
